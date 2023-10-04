import Account from '../models/account/account.model';
import Site from '../models/site/site.model';

async function insertSite(dto: any): Promise<any>{
    try {

    const sitemanager = await Account.findById({ _id:dto.sitemanagerid });
    if(!sitemanager){
        throw new Error('Supplier does not exist');
    }
    
    const createdpayment = await Site.create(dto); 
      return createdpayment;
    } catch (err) {
      throw err;
    }
}

export default { insertSite};