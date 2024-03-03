import Post from '../models/Post.js';

/**
 * @des
 * @author
 * @date
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function createPost(req, res) {
  const { userId, content, image, likes, report, status } = req.body;
  try {
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
    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

async function getPosts(req, res) {
  try {
    const response = await Post.find({}, null, null);
    response.length > 0
      ? res.status(200).json({
          status: 'success',
          data: response,
        })
      : res.status(200).json({
          status: 'no data',
        });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

async function getPostReports(req, res) {
  try {
    const response = await Post.find({ report: { $ne: [] } }, null, null);
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
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

export { createPost, getPosts, getPostReports };
