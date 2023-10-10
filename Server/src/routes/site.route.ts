import { Router } from 'express';
import siteController from '../controller/site.controller';
import AuthGuard from '../utils/authGuard';
export const siteRoute = Router();
// Route needed
siteRoute.post('/createsite', siteController.insertSite);
siteRoute.get('/getSites', AuthGuard, siteController.getSite);
siteRoute.post('/budgetRequest', siteController.bugestRequest);


siteRoute.put('/reject/:id', siteController.budgetReject);
siteRoute.put('/approve', siteController.budgetApprove);

// All approved budgets
siteRoute.get('/approved', siteController.getAllApprovedBudget);