const Category = require('../models/category').Category
const Counter = require('../models/counter').Counter

const async = require('async')

let addCategory = function (req, res) { 
  let payload = {}

  payload.name = req.body.name
  payload.sub_categories = req.body.sub_categories
  payload.products = req.body.products

  Counter.findOneAndUpdate({name: "_categoryId"}, {$inc: {seq: 1}}, {new : true}, (error, doc) => {
    if (error) {
      console.error('Error in adding category: ', error)
      res.locals.restResponse.success = false
      res.locals.restResponse.error = error
      res.locals.restResponse.httpStatus = 500
      res.json(res.locals.restResponse)
    } else {

      payload.id = doc.seq
      let category = new Category(payload)
      category.save((err, result) => {
        if (err) {
          console.error('Error in adding category: ', err)
          res.locals.restResponse.success = false
          res.locals.restResponse.error = err
          res.locals.restResponse.httpStatus = 500
        } else {
          res.locals.restResponse.success = true
          res.locals.restResponse.result = result
          res.locals.restResponse.httpStatus = 200
        }
        res.json(res.locals.restResponse)
      })
    }
  })
}


let listCategory = function (req, res) {
  Category.find({}, (error, categories) => {
    if (error) {
      console.error('Error in listing category: ', error)
      res.locals.restResponse.success = false
      res.locals.restResponse.error = error
      res.locals.restResponse.httpStatus = 500
      res.json(res.locals.restResponse)
    } else {

      let subCategoryIds = []
      for (let i = 0; i < categories.length; i++) {
        subCategoryIds.push(categories[i].sub_categories)
      }

      async.eachOfSeries(subCategoryIds, function (subCategoryId, key, callback) {
        Category.find({id: {$in: subCategoryId}}, {"_id": 0, "sub_categories": 0, "products": 0}, (error, res) => {
          if (error) {
            callback(error)
          } else {
            categories[key].sub_categories = res
            callback(null, null)
          }
        })
      }, function (error) {
        if (error) {
          console.error('Error in getting sub-categories: ', error)
          res.locals.restResponse.success = false
          res.locals.restResponse.error = error
          res.locals.restResponse.httpStatus = 500
          res.json(res.locals.restResponse)
        } else {
          res.locals.restResponse.success = true
          res.locals.restResponse.result = categories
          res.locals.restResponse.httpStatus = 200
          res.json(res.locals.restResponse)
        }
      })
    }
  })
}

exports.addCategory = addCategory
exports.listCategory = listCategory