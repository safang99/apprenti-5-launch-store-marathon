//import { log } from "console"
import fs from "fs"

const productsPath = "products.json"

class Product {
  constructor({ name, description, price, available }) {
    this.name = name
    this.description = description
    this.price = price
    //if an available argument is provided we will use that value, otherwise it will default to true.
    this.available = available || true
  }

  static findAll() {
    const productData = JSON.parse(fs.readFileSync(productsPath)).products
    const products = productData.map((product) => {
      //console.log(product)
      debugger
      return new Product(product)
    })
    //console.log(products)
    return products
  }

  isValid() {
    if (
      this.name.trim() === "" ||
      this.description.trim() === "" ||
      this.price.trim() === ""
    ) {
      return false
    } else {
      return true
    }
  }

  save() {
    if (this.isValid()) {
      let productsArray = this.constructor.findAll()
      productsArray.push(this)
      fs.writeFileSync(
        productsPath,
        JSON.stringify({ products: productsArray })
      )
      return true
    } else {
      return false
    }
  }

  //For displaying errors
  // isValid() {
  //   let errors = {}
  //   if (!this.name) {
  //     errors.name = "Name is required."
  //   }
  //   if (!this.description) {
  //     errors.description = "Description is required."
  //   }
  //   if (!this.price) {
  //     errors.price = "Price is required."
  //   }
  //   return errors
  // }

  // save() {
  //   let errors = this.isValid()
  //   if (Object.entries(errors).length === 0) {
  //     let productsArray = this.constructor.findAll()
  //     productsArray.push(this)
  //     fs.writeFileSync(
  //       productsPath,
  //       JSON.stringify({ products: productsArray })
  //     )
  //   }
  //   return errors
  // }
}

export default Product
