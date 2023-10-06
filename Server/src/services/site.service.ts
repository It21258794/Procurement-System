import Account from '../models/account/account.model';
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

export default { insertSite, getSite };
