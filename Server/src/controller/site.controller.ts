import { Request, Response } from 'express';
import siteService from '../services/site.service';
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
    res.status(400).json({ err: 'Sites not Found' });
  }
};

export default { insertSite, getSite };
