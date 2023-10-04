import Payment from '../models/payment/payment.model';
import Account from '../models/account/account.model';

async function insertPayment(dto: any): Promise<any>{
    try {

    const supplier = await Account.findById({ _id:dto.supplierId });
    const procumentstaff = await Account.findById({ _id:dto.supplierId });
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

export default { insertPayment};