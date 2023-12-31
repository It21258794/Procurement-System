import itemmodel from '../models/item/item.model';
import Account from '../models/account/account.model';
import accountService from './account.service';

async function insertItem(dto: any): Promise<any> {
  try {
    console.log(dto.supplierName);
    const supplier = await accountService.findItemsByUserName(
      dto.supplierUsername,
    );
    console.log(supplier);
    if (!supplier) {
      throw new Error('Supplier does not exist');
    }

    const existItem = await itemmodel.findOne({
      itemName: dto.itemName,
      supplierName: dto.supplierUsername,
    });
    if (existItem) {
      throw new Error('Item already exists');
    }
    console.log(dto.itemName);
    const createdItem = await itemmodel.create(dto);
    return createdItem;
  } catch (err) {
    throw err;
  }
}

async function findItemsByName(itemName: string): Promise<any[]> {
  try {
    console.log('Searching for item with name:', itemName);
    const items = await itemmodel.find({ itemName: itemName });
    console.log('Found items:', items);
    return items;
  } catch (err) {
    throw err;
  }
}

async function getAllItems(): Promise<any[]> {
  console.log('Fetching all items');
  try {
    const items = await itemmodel.find({});
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

export default {
  insertItem,
  findItemsByName,
  updateItem,
  deleteItem,
  getAllItems,
};
