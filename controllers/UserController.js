import User from "../models/User.js";
/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("user_profile");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { getAllUsers };
