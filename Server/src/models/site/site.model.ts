import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  sitemanagerid: {
    type:mongoose.Schema.Types.ObjectId,
    require: true,
  },
  location:{
    type:String,
    require:true,
 },
});

const Site= mongoose.model('Site', SiteSchema);
export default Site;
