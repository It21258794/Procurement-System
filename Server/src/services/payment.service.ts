import Payment from '../models/payment/payment.model';
import Account from '../models/account/account.model';

async function insertPayment(dto: any): Promise<any>{
    try {

    const supplier = await Account.findById({ _id:dto.supplierid });
    const procumentstaff = await Account.findById({ _id:dto.supplierid });
    if(!supplier){
        throw new Error('Supplier does not exist');
    }
    if(!procumentstaff){
        throw new Error('Procument Staff does not exist');
    }

    const createdpayment = await Payment.create(dto); 
      return createdpayment;
    } catch (err) {
      throw err;
    }
}

async function getbySupplierid(supplierid: string): Promise<any[]> {
  try {
    
    const payments = await Payment.find({ supplierid: supplierid });
    return payments;
  } catch (err) {
    throw err;
  }
}

async function updatePayment(paymentId: string, updatedData: any): Promise<any> {
  try {
    console.log(paymentId);
    const updatedpayment = await Payment.findByIdAndUpdate(paymentId, updatedData, { new: true });
    console.log(updatedpayment);
    if (!updatedpayment) {
      throw new Error('payment is not found');
    }
    return updatedpayment;
  } catch (err) {
    throw err;
  }
}


export default { insertPayment,getbySupplierid,updatePayment};