import mongoose from 'mongoose';
import { BudgetStatus } from './IBudget';

const Schema = mongoose.Schema;

const BudgetFormSchema = new Schema(
  {
    site_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: BudgetStatus.PENDING,
    },
  },
  { timestamps: true },
);

const BudgetForm = mongoose.model('BudgetForm', BudgetFormSchema);
export default BudgetForm;
