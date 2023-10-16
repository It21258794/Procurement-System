import { Request, Response } from 'express';
import siteService from '../services/site.service';
import { error } from 'winston';
// Function to insert a new site

const insertSite = async (req: Request, res: Response) => {
  try {
    const dto = req.body;
    const site = await siteService.insertSite(dto);
    res.status(200).json(site);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

const getSite = async (req: Request, res: Response) => {
  try {
    const sites = await siteService.getSite();
    res.status(200).json(sites);
  } catch (err: any) {
    res.status(400).json({ err: error });
  }
};

const bugestRequest = async (req: Request, res: Response) => {
  try {
    const dto = req.body;
    console.log(dto.site_id);
    const item = await siteService.Increasebugest(dto);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};



const getAllBudgetRequests = async (req: Request, res: Response) => {
  try {

    const budgetRequests = await siteService.getAllBudgetRequests();

    if (budgetRequests && budgetRequests.length > 0) {
      res.status(200).json({ budgetRequests });
    } else {
      res.status(404).json({ message: 'No budget requests found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};


const budgetApprove = async (req: Request, res: Response) => {
  try {
    const { site_id, budget_id, status, budget } = req.body;
    const isApproved = await siteService.approveBudget(
      site_id,
      budget_id,
      status,
      budget,
    );

    if (isApproved) {
      res.status(200).json({ message: 'Budget approved successfully' });
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

const getAllApprovedBudget = async (req: Request, res: Response) => {
  try {
    const approvedBudget = await siteService.getAllApprovedBudget();

    if (approvedBudget && approvedBudget.length > 0) {
      res.status(200).json({ approvedBudget });
    } else {
      res.status(404).json({ message: 'No approved budget found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};
const budgetReject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isDeleted = await siteService.rejectBudget(id); // Modify this to match your actual service function

    if (isDeleted) {
      res.status(200).json({ message: 'Budget request deleted successfully' });
    } else {
      res.status(404).json({ message: 'Budget request not found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};



export default { insertSite, getSite, bugestRequest, budgetReject, budgetApprove, getAllApprovedBudget,getAllBudgetRequests };
