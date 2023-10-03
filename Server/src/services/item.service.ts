import itemmodel from '../models/item/item.model';
import Account from '../models/account/account.model';

async function insertItem(dto: any): Promise<any> {
  try {
    const supplier = await Account.findById({ _id: dto.supplierid });

    if (!supplier) {
      throw new Error('Supplier does not exist');
    }

    const existitem = await itemmodel.findOne({
      itemname: dto.itemname,
      supplierid: dto.supplierid,
    });
    if (existitem) {
      throw new Error('Item already exists');
    }

    const createditem = await itemmodel.create(dto);
    return createditem;
  } catch (err) {
    throw err;
  }
}

async function findItemsByName(itemname: string): Promise<any[]> {
  try {
    console.log('Searching for item with name:', itemname);
    const items = await itemmodel.find({ itemname: itemname });
    console.log('Found items:', items);
    return items;
  } catch (err) {
    throw err;
  }
}

async function updateItem(itemId: string, updatedData: any): Promise<any> {
  try {
    const updatedItem = await itemmodel.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    });

    if (!updatedItem) {
      throw new Error('Item not found');
    }
    return updatedItem;
  } catch (err) {
    throw err;
  }
}

async function deleteItem(itemId: string): Promise<boolean> {
  try {
    const deletedItem = await itemmodel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      throw new Error('Item not found');
    }

    return true;
  } catch (err) {
    throw err;
  }
}

export default { insertItem, findItemsByName, updateItem, deleteItem };
