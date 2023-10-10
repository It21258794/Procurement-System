import Account from '../models/account/account.model';
import { IBudget } from '../models/budgetForm/IBudget';
import budgetFormModel from '../models/budgetForm/budgetForm';
import Site from '../models/site/site.model';
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

export default { insertSite, getSite, Increasebugest };
