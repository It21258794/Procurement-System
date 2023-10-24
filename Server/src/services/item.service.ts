import itemmodel from '../models/item/item.model';
import Account from '../models/account/account.model';
import accountService from './account.service';

// Function to insert a new item into the database
async function insertItem(dto: any): Promise<any> {
  try {
    console.log(dto.supplierName);
    // Check if the supplier exists
    const supplier = await accountService.findItemsByUserName(
      dto.supplierUsername,
    );
    console.log(supplier);
    if (!supplier) {
      throw new Error('Supplier does not exist');
    }

    // Check if the item with the same name and supplier already exists
    const existItem = await itemmodel.findOne({
      itemName: dto.itemName,
      supplierName: dto.supplierUsername,
    });
    if (existItem) {
      throw new Error('Item already exists');
    }
    console.log(dto.itemName);
    // Create and return the new item
    const createdItem = await itemmodel.create(dto);
    return createdItem;
  } catch (err) {
    throw err;
  }
}

// Function to find items by their name
async function findItemsByName(itemName: string): Promise<any[]> {
  try {
    console.log('Searching for item with name:', itemName);
    // Find items with the specified name
    const items = await itemmodel.find({ itemName: itemName });
    console.log('Found items:', items);
    return items;
  } catch (err) {
    throw err;
  }
}

// Function to get all items from the database
async function getAllItems(): Promise<any[]> {
  console.log('Fetching all items');
  try {
    // Retrieve all items from the database
    const items = await itemmodel.find({});
    console.log('Found items:', items);
    return items;
  } catch (err) {
    throw err;
  }
}

// Function to update an item by its ID
async function updateItem(itemId: string, updatedData: any): Promise<any> {
  try {
    // Update the item with the specified ID and return the updated item
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

// Function to delete an item by its ID
async function deleteItem(itemId: string): Promise<boolean> {
  try {
    // Delete the item with the specified ID
    const deletedItem = await itemmodel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      throw new Error('Item not found');
    }

    return true;
  } catch (err) {
    throw err;
  }
}

// Export all the functions as an object
export default {
  insertItem,
  findItemsByName,
  updateItem,
  deleteItem,
  getAllItems,
};
