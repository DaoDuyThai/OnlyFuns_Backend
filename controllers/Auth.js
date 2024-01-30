import { authRepo } from "../repository/index.js";


/** 
 * @des Register an account
 * @author Trịnh Minh Phúc
 * @date 29/1/2024
 * @param {username, email, password} req
 * @param {} res
 * @returns 
 */
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;     
        const result = await authRepo.registerUser(username, email, password);
        if (result.error) {
            return res.status(result.status).json({ message: result.error });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
};
/** 
 * @des Log in to your account
 * @author Trịnh Minh Phúc
 * @date 29/1/2024
 * @param {username,  password} req
 * @param {*} res
 * @returns 
 */
const loginUser = async (req, res) => {
    try {
        const { username,  password } = req.body;  
        const result = await authRepo.loginUser(username,password)
        if(result.error){
            return res.status(result.status).json({message:result.error})
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

/** 
 * @des Account authentication
 * @author Trịnh Minh Phúc
 * @date 30/1/2024
 * @param {verificationCode} req
 * @param {*} res
 * @returns 
 */
const verifyUser= async (req, res) => {
    try {
        const { verificationCode } = req.params;
        const result = await authRepo.verifyUser(verificationCode)
        if(result.error){
            return res.status(result.status).json({message:result.error})
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.toString() });
    }
}

export default {registerUser, loginUser,verifyUser};