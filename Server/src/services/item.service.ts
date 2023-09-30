import itemmodel from '../models/item/item.model';
import Account from '../models/account/account.model';

async function insertItem(dto: any): Promise<any>{
    try {

    const supplier = await Account.findById({ _id:dto.supplierid });

    if(!supplier){
        throw new Error('Supplier does not exist');
    }

    const existitem = await itemmodel.findOne({ itemname: dto.itemname, supplierid:dto.supplierid });
    if (existitem) {
     throw new Error('Item already exists');
    }

    const createditem = await itemmodel.create(dto); 
      return createditem;
    } catch (err) {
      throw err;
    }
}

export default { insertItem };