import nodemailer from 'nodemailer';
import orderModel from '../models/order/order.model';
import siteModel from '../models/site/site.model';
import { OrderStatus } from '../models/order/OrderStatus';
import { ISite } from '../models/site/ISite';
import cartController from '../controller/cart.controller';

const sendOrderByEmail = (order_id: string, email: string, pdf: string) => {
  let msg = `Your payment receipt on ${order_id}`;
  if (pdf == null) {
    msg = 'You have recieved an Order From Codex Cunstruction Company';
  }
  try {
    console.log(process.env.EMAIL_PASS);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: `Order No : ${order_id}`,
      text: msg,
      attachments: [
        {
          filename: 'attachment.pdf',
          content: pdf,
          contentType: 'application/pdf',
          encoding: 'base64',
        },
      ],
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent : ', info.response);
      }
    });
  } catch (err: any) {
    console.log(err);
  }
};

//create order
const createOrder = async (orderDetails: any) => {
  try {
    const newOrder = await orderDetails.save();
    cartController.clearCart;
    return newOrder;
  } catch (err) {
    throw err;
  }
};

const getOrderId = async () => {
  try {
    const count = await orderModel.count();
    return count + 1;
  } catch (err) {
    throw err;
  }
};

const getOrderBySite = async (id: string) => {
  try {
    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();
    const year_month = currMonth + '_' + currYear;

    const site = await siteModel.findById(id);

    if (!site) {
      throw 'Site not Found';
    }
    const orderDetail = await orderModel.find({
      siteId: id,
      month_year: year_month,
    });

    return orderDetail;
  } catch (err: any) {
    throw err;
  }
};

const getOrderById = async (id: string) => {
  try {
    const orderItem = await orderModel.findById(id);
    return orderItem;
  } catch (err: any) {
    throw err;
  }
};

const changeOrderStatus = async (orderId: string, status: OrderStatus) => {
  try {
    console.log('orderId', orderId);
    const order = await orderModel.updateOne(
      { _id: orderId },
      { status: status },
    );
    return { res: 'Updated' };
  } catch (err: any) {
    throw err;
  }
};

//get monthly budget for a single site
const getOrderAndBudget = async (id: string) => {
  try {
    const orderItem = await orderModel.findById(id);

    if (!orderItem) {
      throw 'order not Found';
    }
    const budget = await getBudgetByMonth(orderItem.siteId.toString()); // calling the budget calculate function
    return { orderItem, budget };
  } catch (err: any) {
    throw err;
  }
};

//function for calculate and filter budget by month

const getBudgetByMonth = async (id: string) => {
  try {
    let priceList = [];
    let totalPrice = 0;
    let remBudget = 0;
    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();
    const year_month = currMonth + '_' + currYear;

    const siteItem = await siteModel.findById(id);

    if (!siteItem) {
      throw 'Site Budget not Found';
    }

    const siteBudget = siteItem.budget as number;

    priceList = await orderModel.find({
      siteId: id,
      month_year: year_month,
      status: 'confirmed',
    });

    console.log(priceList);

    priceList.forEach((item) => {
      totalPrice = totalPrice + item.total_cost;
    });
    remBudget = siteBudget - totalPrice;

    return {
      siteBudget: siteBudget,
      totalPrice: totalPrice,
      remBudget: remBudget,
    };
  } catch (err: any) {
    throw err;
  }
};

const deleteOrder = async (id: string) => {
  try {
    const item = await orderModel.findByIdAndDelete(id);
    return { response: 'Deleted' };
  } catch (err: any) {
    throw err;
  }
};

const getOrderByMonth = async () => {
  try {
    const date = new Date();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();
    const year_month = currMonth + '_' + currYear;
    const item = await orderModel.find({ month_year: year_month });
    return item;
  } catch (err: any) {
    throw err;
  }
};

async function getAllOrders(): Promise<any[]> {
  try {
    const orderRequests = await orderModel.find();
    return orderRequests;
  } catch (err) {
    throw err;
  }
}

export default {
  getAllOrders,
  sendOrderByEmail,
  createOrder,
  getOrderId,
  getOrderBySite,
  getOrderById,
  changeOrderStatus,
  getOrderAndBudget,
  deleteOrder,
  getOrderByMonth,
};
