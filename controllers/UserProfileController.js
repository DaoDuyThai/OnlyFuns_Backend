import UserProfile from "../models/UserProfileModel.js";
/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllUserProfiles = async (req, res) => {
  try {
    const userProfiles = await UserProfile.find({}).populate("userId", "posts");
    res.status(200).json({ success: true, userProfiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { getAllUserProfiles };