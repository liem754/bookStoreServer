import * as sv from "../services";
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({
        err: -1,
        mes: "Mising input!",
      });
    const response = await sv.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Failed server!",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        err: -1,
        mes: "Mising input!",
      });
    const response = await sv.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Failed server!",
    });
  }
};
