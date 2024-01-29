/** 
 * @des 
 * @author Trịnh Minh Phúc
 * @date 29/1/2024
 * @param {*} req
 * @param {*} res
 * @returns 
 */

import mongoose from "mongoose";

const connectDB = () => {
    try {
        const connection = mongoose.connect(process.env.URI_MONGODB);
        console.log("Connect to MongoDB success");
        return connection;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default connectDB;