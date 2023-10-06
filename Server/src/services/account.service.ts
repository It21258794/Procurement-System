import Account from '../models/account/account.model';

async function findAccountByCatogory(catogory: string): Promise<any[]> {
  try {
    console.log('Searching for accounts with the role:', catogory);
    const accounts = await Account.find({ role: catogory });
    console.log('Found items:', accounts);
    return accounts;
  } catch (err) {
    throw err;
  }
}

async function findItemsByUserName(username: string): Promise<any[]> {
  try {
    console.log('Searching for accounts with the username:', username);
    const { firstName, lastName } = splitFullName(username);
    const accounts = await Account.find({ fname: firstName, lname: lastName });
    console.log('Found items:', accounts);
    return accounts;
  } catch (err) {
    throw err;
  }
}

async function updateAccount(
  accountId: string,
  updatedData: any,
): Promise<any> {
  try {
    console.log(accountId);
    console.log(updatedData);
    const updatedItem = await Account.findByIdAndUpdate(
      accountId,
      updatedData,
      { new: true },
    );
    console.log(updatedItem);
    if (!updatedItem) {
      throw new Error('Account not found');
    }
    return updatedItem;
  } catch (err) {
    throw err;
  }
}

async function deleteAccount(userid: string): Promise<boolean> {
  try {
    const deletedaccount = await Account.findByIdAndDelete(userid);
    if (!deletedaccount) {
      throw new Error('Item not found');
    }
    return true;
  } catch (err) {
    throw err;
  }
}

//Splits a full name into its constituent first name and last name.
function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.split(' ');
  if (parts.length === 2) {
    const [firstName, lastName] = parts;
    return { firstName, lastName };
  } else {
    throw new Error('Invalid full name format');
  }
}

export default {
  findAccountByCatogory,
  findItemsByUserName,
  deleteAccount,
  updateAccount,
};
