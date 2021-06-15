import { Request, Response, Router } from 'express';
import userController from './controllers/UserController';
import sessionController from './controllers/SessionController';

import AuthMiddleware from './middlewares/auth';


const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({message: 'Hello World!'});
});

//User routes not authenticated
routes.post('/users', userController.create);
routes.post("/sessions", sessionController.store);

routes.use(AuthMiddleware);
//User routes authenticated
routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getById);
routes.get('/users/:email', userController.getByEmail);
routes.put('/users/:id', userController.update);

export default routes;