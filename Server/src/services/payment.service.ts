import paymentModel from '../models/payment/payment.model';
import accountModel from '../models/account/account.model';
import orderModel from '../models/order/order.model';
import { IPaymentItem } from '../models/paymentItem/IPayemntItem';
import paymentItemModel from '../models/paymentItem/paymentItem.model';

async function insertPayment(dto: any): Promise<any> {
  try {
    const supplier = await accountModel.findById({ _id: dto.supplierId });
    const procumentstaff = await accountModel.findById({ _id: dto.supplierId });
    if (!supplier) {
      throw new Error('Supplier does not exist');
    }
    if (!procumentstaff) {
      throw new Error('Procument Staff does not exist');
    }

    const createdpayment = await paymentModel.create(dto);
    return createdpayment;
  } catch (err) {
    throw err;
  }
}

const getPayemtDetailsBySupplier = async (id: string) => {
  try {
    const supplier = await accountModel.findById({ _id: id });
    if (!supplier) {
      throw new Error('Supplier not found');
    }
    const paymentDetails = await paymentModel.findOne({ supplierId: id });
    return paymentDetails;
  } catch (err: any) {
    throw err;
  }
};

const createPayment = async (dto: IPaymentItem) => {
  try {
    const orderItem = await orderModel.findOne({ _id: dto.order_id });

    if (!orderItem) {
      throw 'Order not found';
    }

    const payItem = await paymentItemModel.create(dto);
    return payItem;
  } catch (err: any) {
    throw err;
  }
};

export default { insertPayment, getPayemtDetailsBySupplier, createPayment };
