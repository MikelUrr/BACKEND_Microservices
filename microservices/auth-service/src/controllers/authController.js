import Jwt from 'jsonwebtoken';
import User from './../models/User.js';
import dotenv from 'dotenv';
import bycrypt from 'bcryptjs';
import validator from '../services/validator.js';
import axios from 'axios';

dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = checkUserExists(email)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!bycrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });

        }

        const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });
        return res.cookie('token', token, { httpOnly: true }).status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
}

const passwordReset = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!bycrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        if (!validator.validatePassword(newPassword)) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const salt = bycrypt.genSaltSync(10);
        const hash = bycrypt.hashSync(newPassword, salt);
        user.password = hash;
        await user.save();
        return res.status(200).json({ message: 'Password reset' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const register = async (req, res) => {
    const { firstName, lastName, email, password, salary, role, company, profile, configuration } = req.body;

    if (!validator.validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    if (!validator.validatePassword(password)) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    if (await validator.checkUserExists(email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const transaction = await sequelize.transaction();
    try {

        const salt = bycrypt.genSaltSync(10);
        const hash = bycrypt.hashSync(password, salt);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salary,
            status: true,
            userName: email,
            activeUser: true,
            contractTypeId
        }, { transaction });

        const userRole = await Role.findOne({ where: { name: role } });
        if (!userRole) {
            throw new Error('Role not found');
        }
        await UserRoles.create({
            userId: newUser.id,
            roleId: userRole.id
        }, { transaction });

        await transaction.commit();
        // Preparar los datos para enviar a otros microservicios
        const userProfileData = { userId: newUser.id, profile };
        const userConfigurationData = { userId: newUser.id, configuration };
        const userCompanyData = { userId: newUser.id, company };

        // Función para realizar peticiones POST y controlar errores
        const postData = async (url, data) => {
            const response = await axios.post(url, data);
            if (response.status !== 201) {
                throw new Error(`Failed to post to ${url}`);
            }
            return response.data;
        };

        // Enviar la información del perfil del usuario al User Management Service
        await postData('http://user-management-service:3000/users/profile', userProfileData);

        // Enviar la información de la configuración del usuario al User Management Service
        await postData('http://user-management-service:3000/users/configuration', userConfigurationData);

        // Enviar la información de la compañía del usuario al Company Service
        await postData('http://company-service:3000/companies/user', userCompanyData);

        // Enviar notificación de bienvenida al usuario
        const notificationData = {
            to: email,
            subject: 'Welcome to Our Service',
            body: `Hi ${firstName}, welcome to our service! Please visit the following link to update your profile: <link>`
        };
        await postData('http://notification-service:3000/notification-service/email', notificationData);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);

        // Rollback en caso de error en cualquiera de los microservicios
        await transaction.rollback();

        // Eliminar el usuario creado en Auth Service
        if (newUser) {
            await User.destroy({ where: { id: newUser.id } });
        }

        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export default { login, logout, passwordReset , register };