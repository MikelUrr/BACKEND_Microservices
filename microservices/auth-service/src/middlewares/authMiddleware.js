//contains midleware for authentication

import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Permission } from '../models/Permission';
import {UserRoles} from '../models/UserRoles';
import { config } from '../config/config';
import dotenv from 'dotenv';
import { rolesValidator } from '../services/rolesValidator';

dotenv.config();

const isLogged = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const hasRole = (action) => {
   //get user role
return async (req, res, next) => {
   //get coockie and use jwt to get email
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    //get user role

    const userRole = await UserRoles.findOne({ where: { userId: user.id } });
    if (!userRole) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const role = await Role.findByPk(userRole.roleId);
    if (!role) {
        return res.status(404).json({ message: 'Role not found' });
    }
    const validateRole = rolesValidator(await Role.findOne({ where: { name: role.name } }),action)
    if (!validateRole) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();

}
}
const isAdmin = async (req, res, next) => {
    if (req.user.UserProfile !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

export { isLogged, hasRole, isAdmin };