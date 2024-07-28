const checkUserExists = async (email) => {
    const userExists = await User.findOne({ where: { email } });
    return userExists !== null;
};

const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
};

const checkUserNameExists = async (userName) => {
    const userNameExists = await User.findOne({ where: { userName } });
    return userNameExists !== null;
};


export default {
    checkUserExists,
    validateEmail,
    validatePassword,
    checkUserNameExists,
};