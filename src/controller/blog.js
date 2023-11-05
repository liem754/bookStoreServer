import * as sv from "../services";

export const createBlogct = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input!",
      });
    }
    const data = { title, description };
    if (req.file) data.images = req.file.path;

    const rs = await sv.createBlog(data);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error " + error,
    });
  }
};
export const getBlogct = async (req, res) => {
  const { bid } = req.params;
  try {
    if (!bid) {
      return res.status(401).json({
        err: -1,
        mes: "Missing input!",
      });
    }

    const rs = await sv.getBlog(bid);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error " + error,
    });
  }
};
export const getBlogcts = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const rs = await sv.getBlogs(req.query);
    return res.status(200).json(rs);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Sv error " + error,
    });
  }
};
