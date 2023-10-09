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
    const item = await siteService.Increasebugest(dto);
    res.status(200).json(item);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

export default { insertSite, getSite, bugestRequest };
