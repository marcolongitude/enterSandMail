import { Request, Response, Router } from 'express';
import userController from './controllers/UserController';
import sessionController from './controllers/SessionController';

// import ReadFileXLSXController from './controllers/ReadFileXLSXController';
import SaveContactsController from './controllers/SaveContactsController'

import AuthMiddleware from './middlewares/auth';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({message: 'Hello World!'});
});

//User routes not authenticated
routes.post("/sessions", sessionController.store);

//User routes authenticated
routes.post('/users', userController.create);
routes.get('/users', AuthMiddleware('sa'), userController.getAll);
routes.get('/users/:id', AuthMiddleware('sac'), userController.getById);
routes.get('/users/:email', AuthMiddleware('sa'), userController.getByEmail);
routes.put('/users/:id', AuthMiddleware('sa'), userController.update);

//Routes read file xlsx
// routes.post('/readfilexlsx', AuthMiddleware('sa'), ReadFileXLSXController.ReadFileXLSX);
routes.post('/readfilexlsx', AuthMiddleware('sa'), SaveContactsController.SaveContacts);


export default routes;