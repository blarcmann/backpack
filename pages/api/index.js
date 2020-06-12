export default function handler(req, res) {
  console.log(req.body) // The request body
  console.log(req.query) // The url query string
  console.log(req.cookies) // The passed cookies
  res.end('Hello World')
}