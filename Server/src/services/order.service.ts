import nodemailer from 'nodemailer';
import orderModel from '../models/order/order.model';
import siteModel from '../models/site/site.model';

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
    if(!site){
      throw 'Site not Found'
    }
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

export default { sendOrderByEmail, createOrder, getOrderId, getOrderBySite,getOrderById };
