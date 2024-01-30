import { userRepository } from "../repository/index.js"
/** 
 * @des Get All User
 * @author Trinh Minh Phuc
 * @date 30/1/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllUser = async(req,res)=>{
    try {
        const result = await userRepository.getAllUser()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}
export default {getAllUser}