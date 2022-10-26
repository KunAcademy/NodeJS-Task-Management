const errorHandlerMiddleware = (err,req, res, next) => {
  console.log(err)
  return res.status(500).json({ 
    message: "hello this is wrong",
  })
}

module.exports = errorHandlerMiddleware 