import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.getAllUsers);
router.post('/', controllers.validateCreateUser, controllers.createUser);
router.put('/user/:id', controllers.validateUpdateUser, controllers.updateUser);
router.get('/user/:id', controllers.getUser);
router.delete('/user/:id', controllers.deleteUser);

export default router;
