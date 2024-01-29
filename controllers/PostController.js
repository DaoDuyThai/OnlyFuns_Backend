import Post from "../models/Post.js";
/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("userId");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export { getAllPosts };