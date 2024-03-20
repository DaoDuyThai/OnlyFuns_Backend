import { userProfileRepository } from '../repository/index.js';

/**
 * @des get members includes 2 collections User&UserProfile
 * @author Bui Anh Hong
 * @date 2/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getMembers = async (req, res) => {
  try {
    const result = await userProfileRepository.getMembers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await UserProfile.find({ userId: userId });
    res.status(200).json({
      status: 'success',
      data: response,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: e.toString(),
    });
  }
};
/**
 * @des get user profile by user id
 * @author Nguyen LD
 * @date 15/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getProfileByUserId = async (req, res) => {
  try {
    const result = await userProfileRepository.getProfileByUserId(
      req.params.userId,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
export default { getMembers, getUserProfile, getProfileByUserId };
