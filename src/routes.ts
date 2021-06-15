import { Request, Response, Router } from 'express';

import AuthMiddleware from './middlewares/auth';


const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({message: 'Hello World!'});
});

routes.use(AuthMiddleware);

export default routes;