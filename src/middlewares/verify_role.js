import { handleNotAuth } from "./handle_error";

export const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (!role) return handleNotAuth("Not", res);
  if (role !== "R1") return handleNotAuth("Require is admin", res);
  next();
};

export const isAdminOrMorderator = (req, res, next) => {
  const { role } = req.user;
  if (role !== "R1" && role !== "R2")
    return handleNotAuth("Require is admin/morderator", res);
  next();
};
