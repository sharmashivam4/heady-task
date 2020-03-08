var productController = require('../controllers/productController')
var categoryController = require('../controllers/categoryController')

module.exports = function (app) {

  app.post('/category', categoryController.addCategory)
  app.get('/category', categoryController.listCategory)

  app.post('/product', productController.addProduct)
  app.get('/product', productController.listProduct)
  app.patch('/product', productController.updateProduct)

}