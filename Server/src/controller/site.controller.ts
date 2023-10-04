import { Request, Response } from 'express';
import siteService from '../services/site.service';
// Function to insert a new site

const insertSite = async (req: Request, res: Response) => {
    try {
        console.log("siteController")
      const dto = req.body;
      const site = await siteService.insertSite(dto);
      res.status(200).json(site);
    } catch (err: any) {
      res.status(400).json({ err: err });
    }
  };

  export default{insertSite}