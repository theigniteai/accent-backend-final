// protect middleware
export default function auth(req, res, next) {
  // you can read req.headers.authorization if you want
  next();
}
