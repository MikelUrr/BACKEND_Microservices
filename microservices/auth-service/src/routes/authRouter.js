import { Router } from 'express';
import authController from '../controllers/authController.js';
import { hasRole } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/login', (req, res) => {
    authController.login(req, res);
}
);

router.post('/logout', (req, res) => {
    authController.logout(req, res);
}
);

router.post('/register', hasRole("post"),(req, res) => {
    authController.register(req, res);
}
);

router.post('/role', (req, res) => {
    authController.role(req, res);
}
);
router.post('/permissions', (req, res) => {
    authController.permissions(req, res);
}
);
router,post('/password-reset', (req, res) => {
    authController.passwordReset(req, res);
}
);

export default router;
