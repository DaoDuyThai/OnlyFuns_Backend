import User from '../models/User.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';



const generateVerificationCode = () => {
    return crypto.randomBytes(20).toString('hex');
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "trinhphuc980@gmail.com",
        pass: "kfqbavvazdgyysmd",
    },
});


const sendVerificationEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: "trinhphuc980@gmail.com",
        to: email,
        subject: 'Xác Minh Tài Khoản',
        html: `<p>Nhấp vào liên kết sau để xác minh tài khoản: <a href="http://localhost:9999/verify/${verificationCode}">Xác Minh</a></p>`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};
/** 
 * @des Register an account
 * @author Trịnh Minh Phúc
 * @date 29/1/2024
 * @param {username, email, password} req
 * @param {} res
 * @returns 
 */
const registerUser = async (username, email, password) => {
    try {
        const existingUser = await User.findOne({ username }).exec();
        if (existingUser) {
            return { error: 'Tên người dùng tồn tại', status: 404 };
        }
        const existingEmail = await User.findOne({ email }).exec();
        if (existingEmail) {
            return { error: 'Email người dùng tồn tại', status: 404 };
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashed,
            verificationCode: generateVerificationCode()
        });

        const user = await newUser.save();
        await sendVerificationEmail(user.email, user.verificationCode);

        const { password: userPassword, ...others } = user.toObject();
        return { user: others, message: 'Register successful. Please check your email for verification.' };
    } catch (error) {
        throw new Error(error.toString());
    }
};
const genAccessToken = (user) => {
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "60s" }
    );
    return token;
};

const genRefToken = (user) => {
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_REF_KEY,
        { expiresIn: "20d" }
    );
    return token;
};

/** 
 * @des Log in to your account
 * @author Trịnh Minh Phúc
 * @date 29/1/2024
 * @param {username,  password} req
 * @param {*} res
 * @returns 
 */
const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
            return { error: `User with username '${username}' not found`, status: 404 };
        }

        if (!user.isVerified) {
            return { error: `Account is not verified.`, status: 400 };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { error: `Wrong Password`, status: 401 };
        } else {
            const token = genAccessToken(user);
            const refToken = genRefToken(user);
            const { password, role, _id, ...info } = user.toObject();
            return { message: "Login successful", info, token, refToken };
        }
    } catch (error) {
        throw new Error(error.toString());
    }
};

/** 
 * @des Account authentication
 * @author Trịnh Minh Phúc
 * @date 30/1/2024
 * @param {verificationCode} req
 * @param {*} res
 * @returns 
 */
const verifyUser = async (verificationCode) => {
    try {
        const user = await User.findOne({ verificationCode }).exec();
        if (!user) {
            return { error: `Ma xac minh khong hop le`, status: 404 };
        }
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        return { success: true, message: 'Xac minh thanh cong' };
    } catch (error) {
        throw new Error(error.toString());
    }
}





export default { registerUser, genAccessToken, genRefToken, loginUser,verifyUser }
