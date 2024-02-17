import mongoose, { Schema } from "mongoose";
/**
 * @des
 * @author Bui Anh Hong
 * @date 15/2/2024
 * @param {*} req
 * @param {*} res
 * @returns
 */
const bannerSchema = new Schema(
  {
    contents: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dateStart: {
      type: Date,
      required: true
    },
    dateEnd: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return this.dateStart < value;
        },
        message: "dateEnd must be after dateStart",
      }
    },
    pictureUrl: {
      type: String,
      required: true
    },
    redirectUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
