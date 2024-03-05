import {userProfileRepository} from "../repository/index.js";

/**
 * @des get members includes 2 collections User&UserProfile
 * @author Bui Anh Hong
 * @date 2/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getMembers = async(req,res)=>{
    try {
        const result = await userProfileRepository.getMembers()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}
export default {getMembers}