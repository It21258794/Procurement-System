import nodemailer from 'nodemailer';
import orderModel from '../models/order/order.model';
import siteModel from '../models/site/site.model';
import { OrderStatus } from '../models/order/OrderStatus';

const sendOrderByEmail = (order_id: string, email: string) => {
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
      subject: `Order No :${order_id}`,
      text: 'You have recied an Order From Codex Cunstruction Company',
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

const createOrder = async (orderDetails: any) => {
  try {
    const newOrder = await orderDetails.save();
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
    const site = await siteModel.findById(id);
    if (!site) {
      throw 'Site not Found';
    }
    const orderDetail = await orderModel.find({
      items: { $elemMatch: { siteId: id } },
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

//http://localhost:8000/api/order/approveOrder
async function approveOrder(orderId: string): Promise<boolean> {
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
      approved: true,
    });
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return true;
  } catch (err) {
    throw err;
  }
}

//http://localhost:8000/api/order/getAllApprovedOrders
async function getAllApprovedOrders(): Promise<any[]> {
  try {
    const approvedOrders = await orderModel.find({ approved: true });
    return approvedOrders;
  } catch (err) {
    throw err;
  }
}

//http://localhost:8000/api/order/rejectOrder
async function rejectOrder(orderId: string): Promise<boolean> {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new Error('Order not found');
    }
    return true;
  } catch (err) {
    throw err;
  }
}

const changeOrderStatus = async (orderId: string, status: OrderStatus) => {
  try {
    const order = await orderModel.updateOne(
      { _id: orderId },
      { status: status },
    );
    return { res: 'Updated' };
  } catch (err: any) {
    throw err;
  }
};

export default {
  sendOrderByEmail,
  createOrder,
  getOrderId,
  getOrderBySite,
  getOrderById,
  rejectOrder,
  approveOrder,
  getAllApprovedOrders,
  changeOrderStatus,
};
