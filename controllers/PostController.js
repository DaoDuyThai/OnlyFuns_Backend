import Post from '../models/Post.js';

/**
 * @function createPost
 * @author PhuocDT
 * @description This function creates a new post.
 * @param {Object} req - The request object from the client, containing the post details in the body.
 * @param {Object} res - The response object to be sent to the client.
 * @returns {Object} The response object containing a success message and the data of the post created.
 * @throws {Error} If there is an error in creating the post, an error message is sent in the response object.
 */
async function createPost(req, res) {
  // Destructure the post details from the request body
  const { userId, content, image, likes, report, status } = req.body;
  try {
    // Create a new post with the provided details
    const result = await Post.create(
      {
        userId,
        content,
        image,
        likes,
        report,
        status,
      },
      null,
    );
    // Send a response with a success message and the data of the post
    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (e) {
    // If there is an error, send a response with an error message
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

/**
 * @function getPosts
 * @author PhuocDT
 * @description This function retrieves all posts.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent to the client.
 * @returns {Object} The response object containing a success message and the data of the posts retrieved. If no posts are found, a 'no data' message is sent.
 * @throws {Error} If there is an error in retrieving the posts, an error message is sent in the response object.
 */
async function getPosts(req, res) {
  try {
    // Find all posts
    const response = await Post.find({}, null, null);
    // If posts are found, send a response with a success message and the data of the posts
    // If no posts are found, send a response with a 'no data' message
    response.length > 0
      ? res.status(200).json({
          status: 'success',
          data: response,
        })
      : res.status(200).json({
          status: 'no data',
        });
  } catch (e) {
    // If there is an error, send a response with an error message
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

/**
 * @function getPostReports
 * @author PhuocDT
 * @description This function retrieves all posts that have been reported.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent to the client.
 * @returns {Object} The response object containing a success message and the data of the reported posts retrieved. If no reported posts are found, a 'no data' message is sent.
 * @throws {Error} If there is an error in retrieving the reported posts, an error message is sent in the response object.
 */
async function getPostReports(req, res) {
  try {
    // Find all posts that have been reported
    const response = await Post.find({ report: { $ne: [] } }, null, null);
    // If reported posts are found, send a response with a success message, the data of the posts, and the total number of reported posts
    // If no reported posts are found, send a response with a 'no data' message
    response.length > 0
      ? res.status(200).json({
          status: 'success',
          data: response,
          result: response.length,
        })
      : res.status(200).json({
          status: 'no data',
        });
  } catch (e) {
    // If there is an error, send a response with an error message
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

export { createPost, getPosts, getPostReports };
