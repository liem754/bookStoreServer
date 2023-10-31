import { handleServerError } from "../middlewares/handle_error";
import * as sv from "../services";
export const createBooks = async (req, res) => {
  const {
    title,
    author,
    category,
    publicationYear,
    description,
    price,
    quantity,
  } = req.body;
  const { id } = req.user;

  try {
    if (
      !id ||
      !title ||
      !author ||
      !category ||
      !publicationYear ||
      !description ||
      !price ||
      !quantity
    ) {
      return res.status(400).json({
        err: -1,
        mes: "Missing input!",
      });
    }
    const data = {
      title,
      author,
      category,
      publicationYear,
      description,
      price,
      quantity,
    };
    if (req.file) data.images = req.file.path;
    const responsive = await sv.createBook(data, id);
    return res.status(200).json(responsive);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at createNewPost!!" + error,
    });
  }
};
export const getBooks = async (req, res) => {
  try {
    const rs = await sv.getBooks(req.query);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at createNewPost!!" + error,
    });
  }
};
export const getBook = async (req, res) => {
  const { bid } = req.params;
  try {
    if (!bid)
      return res.status(400).json({
        err: -1,
        mes: "Missing input!",
      });
    const rs = await sv.getBook(bid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};

export const deleteBook = async (req, res) => {
  const { bid } = req.body;
  try {
    if (!bid)
      return res.status(400).json({
        err: -1,
        mes: "Missing input!",
      });
    const rs = await sv.deleteBook(bid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};
export const updateBook = async (req, res) => {
  const {
    title,
    author,
    category,
    publicationYear,
    description,
    price,
    quantity,
    bid,
  } = req.body;
  try {
    if (
      !bid ||
      !title ||
      !category ||
      !publicationYear ||
      !author ||
      !price ||
      !description ||
      !quantity
    )
      return res.status(400).json({
        err: -1,
        mes: "Missing input!",
      });
    const data = {
      title,
      author,
      category,
      publicationYear,
      description,
      price,
      quantity,
      bid,
    };
    if (req.file) data.images = req.file.path;
    const rs = await sv.updateBook(data);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};
export const getbookbyCategoryct = async (req, res) => {
  const { category } = req.params;
  try {
    if (!category)
      return res.status(400).json({
        err: -1,
        mes: "Missing input!",
      });
    const rs = await sv.getbookbyCategory(category);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const rs = await sv.getCategory();
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};

export const Ratingct = async (req, res) => {
  const { comment, star, pid } = req.body;
  const { id } = req.user;
  try {
    if (!comment || !star)
      return res.status(400).json({
        err: -1,
        mes: "Missing input!",
      });
    const rs = await sv.Rating(req.body, id);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};
export const getRatingct = async (req, res) => {
  const { pid } = req.params;
  try {
    const rs = await sv.getRatings(pid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at sv!!" + error,
    });
  }
};
