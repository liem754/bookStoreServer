import { handleServerError } from "../middlewares/handle_error";
import * as sv from "../services";
export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await sv.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
export const updateCart = async (req, res) => {
  const { id } = req.user;
  const { pid, price, quantity } = req.body;
  try {
    if (!pid || !price || !quantity)
      return res.status(400).json({
        err: -1,
        mes: "Missing Input",
      });
    // console.log(id);
    // console.log(req.body);
    const response = await sv.updateCarts(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
export const getCarts = async (req, res) => {
  const { id } = req.user;
  try {
    // console.log(id);
    // console.log(req.body);
    const response = await sv.getCarts(id);
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
export const deleteCart = async (req, res) => {
  const { id } = req.body;
  try {
    // console.log(id);
    // console.log(req.body);
    const response = await sv.deleteCart(id);
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
export const contact = async (req, res) => {
  const { email, messege } = req.body;
  try {
    if (!email || !messege)
      return res.status(400).json({
        err: -1,
        mes: "Missing input",
      });
    const response = await sv.contact(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
export const updateUser = async (req, res) => {
  const { email, name } = req.body;
  const { id } = req.user;
  try {
    if (!email || !name)
      return res.status(400).json({
        err: -1,
        mes: "Missing input",
      });

    let data = { email, name };
    if (req.file) data.avatar = req.file.path;
    const response = await sv.updateUser(data, id);
    return res.status(200).json(response);
  } catch (error) {
    return handleServerError(res);
  }
};
