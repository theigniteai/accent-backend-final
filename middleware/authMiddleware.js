// protect middleware
export const protect = (req, res, next) => {
  // For now, allow all (demo)
  next();
};
