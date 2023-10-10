import Account from '../models/account/account.model';
import { BudgetStatus, IBudget } from '../models/budgetForm/IBudget';
import budgetFormModel from '../models/budgetForm/budgetForm';
import siteModel from '../models/site/site.model';

async function insertSite(dto: any): Promise<any> {
  try {
    const sitemanager = await Account.findById({ _id: dto.siteManager_id });
    if (!sitemanager) {
      throw new Error('Supplier does not exist');
    }

    const createdSite = await siteModel.create(dto);
    return createdSite;
  } catch (err) {
    throw err;
  }
}

const getSite = async () => {
  try {
    const site = await siteModel.find();
    return site;
  } catch (err: any) {
    throw err;
  }
};

const Increasebugest = async (dto: IBudget) => {
  try {
    const site = await siteModel.findById(dto.site_id);

    if (!site) {
      throw 'Site not found';
    }

    const budgetItem = await budgetFormModel.create(dto);
    return budgetItem;
  } catch (err: any) {
    throw err;
  }
};


//http://localhost:8000/api/site/approveBudget
async function approveBudget(site_id: string,budget_id:string,status: BudgetStatus,budget:number): Promise<any> {
  try {
      const updateBudget = await budgetFormModel.updateOne({_id:budget_id}, { status: status});
      console.log(updateBudget);
      if(!updateBudget){
         throw 'budget not updated.'

      }
      await siteModel.updateOne({_id:site_id},{budget:budget});
        return true;

    } catch (err) {
    throw err;
  }
}

//http://localhost:8000/api/site/getAllApprovedOrders
async function getAllApprovedBudget(): Promise<any[]> {
  try {
    const approvedBudget = await budgetFormModel.find({ status: 'confirmed' });
    return approvedBudget;
  } catch (err) {
    throw err;
  }
}

//http://localhost:8000/api/site/rejectOrder
async function rejectBudget(site_id: string): Promise<boolean> {
  try {
      const rejectBudget = await budgetFormModel.findByIdAndUpdate(site_id,{status:'rejected'});
      if (!rejectBudget) {
          throw new Error('budget not found');
      }
      return true;
  } catch (err) {
    throw err;
  }
}

export default { insertSite, getSite, Increasebugest, rejectBudget,approveBudget,getAllApprovedBudget };
