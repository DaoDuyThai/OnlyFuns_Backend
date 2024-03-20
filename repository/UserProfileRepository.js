import UserProfile from '../models/UserProfile.js';
/**
 * @des get members includes 2 collections User&UserProfile
 * @author Bui Anh Hong
 * @date 2/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getMembers = async () => {
  try {
    const members = await UserProfile.find().populate({
      path: 'userId',
      select: 'username isActive role',
    });

    console.log('Members: ', members);
    return members;
  } catch (error) {
    throw new Error(error.toString());
  }
};
/**
 * @des get profile by user id
 * @author Nguyen LD
 * @date 15/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getProfileByUserId = async (id) => {
  try {
    const profile = await UserProfile.findOne({ userId: id }).populate(
      'connections',
      'posts',
      { 
        path: 'userId',
        select: 'username active',
      },
    );
    return profile;
  } catch (error) {
    throw new Error(error.toString());
  }
};
/**
 * @des update profile by user id
 * @author Nguyen LD
 * @date 15/3/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateProfile = async (userId, data) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId: userId },
      { $set: data },
      { new: true },
    );
    return profile;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default { getMembers, getProfileByUserId, updateProfile };
