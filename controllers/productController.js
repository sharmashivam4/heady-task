const Product = require('../models/product').Product
const Counter = require('../models/counter').Counter
const Category = require('../models/category').Category

let addProduct = function(req, res) {
  let payload = {}

  payload.name = req.body.name
  payload.price = req.body.price
  payload.categories = req.body.categories

  Counter.findOneAndUpdate({name: "_productId"}, {$inc: {seq: 1}}, {new : true}, (error, doc) => {
    if (error) {
      console.error('Error in adding product: ', error)
      res.locals.restResponse.success = false
      res.locals.restResponse.error = error
      res.locals.restResponse.httpStatus = 500
      res.json(res.locals.restResponse)
    } else {

      payload.id = doc.seq
      let product = new Product(payload)
      product.save((err, result) => {
        if (err) {
          console.error('Error in adding product: ', err)
          res.locals.restResponse.success = false
          res.locals.restResponse.error = err
          res.locals.restResponse.httpStatus = 500
          res.json(res.locals.restResponse)
        } else {
          
          Category.updateMany({id: {$in: payload.categories}}, {$push: {'products': result.id}}, (error, response) => {
            if (error) {
              console.error('Error in adding product: ', error)
              res.locals.restResponse.success = false
              res.locals.restResponse.error = error
              res.locals.restResponse.httpStatus = 500
              res.json(res.locals.restResponse)
            } else {
              res.locals.restResponse.success = true
              res.locals.restResponse.result = result
              res.locals.restResponse.httpStatus = 200
              res.json(res.locals.restResponse)
            }
          })
        }
      })
    }
  })
}

let listProduct = function (req, res) {
  Product.find({'categories': Number(req.query.category)}, (error, products) => {
    if (error) {
      console.error('Error in listing product: ', error)
      res.locals.restResponse.success = false
      res.locals.restResponse.error = error
      res.locals.restResponse.httpStatus = 500
    } else {
      res.locals.restResponse.success = true
      res.locals.restResponse.result = products
      res.locals.restResponse.httpStatus = 200
    }
    res.json(res.locals.restResponse)
  })
}

let updateProduct = function (req, res) {
  Product.findOneAndUpdate({'id': req.body.id}, {$set: {'name': req.body.name, 'price': req.body.price}}, {new: true}, (error, doc) => {
    if (error) {
      console.error('Error in updating product: ', error)
      res.locals.restResponse.success = false
      res.locals.restResponse.error = error
      res.locals.restResponse.httpStatus = 500
    } else {
      res.locals.restResponse.success = true
      res.locals.restResponse.result = doc
      res.locals.restResponse.httpStatus = 200
    }
    res.json(res.locals.restResponse)
  })
}


exports.addProduct = addProduct
exports.listProduct = listProduct
exports.updateProduct = updateProduct