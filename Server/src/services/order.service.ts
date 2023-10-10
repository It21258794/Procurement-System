import nodemailer from 'nodemailer';
import orderModel from '../models/order/order.model';

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
    const orderDetail = await orderModel.find({ items: {$elemMatch :{siteId:id} }});
    return orderDetail;
  } catch (err: any) {
    throw err;
  }
};

const getOrderById = async(id:string) =>{
  try{
    const orderItem = await orderModel.findById(id)
    return orderItem

  }catch(err:any){
    throw err
  }

}


//http://localhost:8000/api/order/approveOrder
async function approveOrder(siteId: string): Promise<boolean> {
  try {
      const updatedOrder = await orderModel.findByIdAndUpdate(siteId, { approved: true });
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
async function rejectOrder(siteId: string): Promise<boolean> {
  try {
      const deletedOrder = await orderModel.findByIdAndDelete(siteId);
      if (!deletedOrder) {
          throw new Error('Order not found');
      }
      return true;
  } catch (err) {
      throw err;
  }
}

export default { sendOrderByEmail, createOrder, getOrderId, getOrderBySite,getOrderById,rejectOrder, approveOrder,getAllApprovedOrders };
