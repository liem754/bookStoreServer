import { handleServerError } from "../middlewares/handle_error";
import * as sv from "../services";
export const insertDB = async (req, res) => {
  try {
    const response = await sv.insertDB();
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
