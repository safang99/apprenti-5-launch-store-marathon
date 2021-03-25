import express from "express"

import Product from "../models/Product.js"

const productsRouter = express.Router()

productsRouter.get("/", (req, res) => {
  debugger
  res.render("products/index", { products: Product.findAll() })
})

productsRouter.get("/new", (req, res) => {
  res.render("products/new")
})

productsRouter.post("/", (req, res) => {
  //get body information
  const name = req.body.name
  const description = req.body.description
  const price = req.body.price

  const newProduct = new Product({ name, description, price })
  //save it
  console.log(newProduct)
  const errors = newProduct.save()

  if (newProduct.save()) {
    res.redirect("/products")
  } else {
    res.render("products/new")
  }

  //for displaying errors
  // if (Object.entries(errors).length === 0) {
  //   res.redirect("/products")
  // } else {
  //   res.render("products/new")
  // }
})

export default productsRouter
