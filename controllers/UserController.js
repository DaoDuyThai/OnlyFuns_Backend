import { userRepository } from '../repository/index.js';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';

/**
 * @des Get All User
 * @author Trinh Minh Phuc
 * @date 30/1/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllUser = async (req, res) => {
  try {
    const result = await userRepository.getAllUser();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

/**
 * @function getUserForLast7Days
 * @author PhuocDT
 * @description This function retrieves users who have joined in the last 7 days.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent to the client.
 * @returns {Object} The response object containing a success message and the data of the users who have joined in the last 7 days.
 * @throws {Error} If there is an error in retrieving the users, an error message is sent in the response object.
 */
const getUserForLast7Days = async (req, res) => {
  // The current date and time
  const startDate = new Date();
  // The date 6 days ago
  const dayAgo = startDate.getDate() - 6;
  try {
    // Find users who have joined between 7 days ago and now, select only the username, email, and joinDate fields
    const result = await User.find(
      { joinDate: { $gte: dayAgo, $lte: startDate } },
      'username email joinDate',
      null,
    );
    // Send a response with a success message and the data of the users
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    // If there is an error, send a response with an error message
    res.status(500).json({
      status: 'fail',
      message: error.toString(),
    });
  }
};

/**
 * @function getUser
 * @author PhuocDT
 * @description This function retrieves a user by their ID.
 * @param {Object} req - The request object from the client, containing the user's ID in the parameters.
 * @param {Object} res - The response object to be sent to the client.
 * @returns {Object} The response object containing a success message and the data of the user retrieved.
 * @throws {Error} If there is an error in retrieving the user, an error message is sent in the response object.
 */
async function getUser(req, res) {
  try {
    // Extract the user's ID from the request parameters
    const id = req.params.id;
    // Find the user by their ID, selecting only the username field
    const response = await User.findById(id, 'username', null);
    // Send a response with a success message and the data of the user
    res.status(200).json({
      status: 'success',
      data: response,
    });
  } catch (e) {
    // If there is an error, send a response with an error message
    res.status(500).json({
      status: 'fail',
      message: e,
    });
  }
}

export default { getAllUser, getUserForLast7Days, getUser };
