import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  siteManager_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  budget: {
    type: Number,
    require: true,
  },
},{timestamps:true});

const Site = mongoose.model('Site', SiteSchema);
export default Site;
