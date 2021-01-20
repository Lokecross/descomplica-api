import { Router } from 'express';

import AuditionsController from '../controllers/AuditionsController';

const auditionsRouter = Router();
const auditionsController = new AuditionsController();

auditionsRouter.get('/', auditionsController.index);

export default auditionsRouter;
