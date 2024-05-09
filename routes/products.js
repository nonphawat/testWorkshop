var express = require("express");
var router = express.Router();
const { checkProduct } = require("../middleware/checkMember.middleware");
const productModel = require("../models/products.model");
const orderModel = require("../models/orders.model");

router.get("/api/v1/products", async (req, res) => {
  try {
    let products = await productModel.find();

    return res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

router.get("/api/v1/products/:id", checkProduct, async (req, res) => {
  const id = req.params.id;
  try {
    let product = await productModel.findById(id);
    if (!product)
      return res.status(404).send({
        msg: "No this Product",
      });

    return res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

router.post("/api/v1/products", async (req, res) => {
  const {
    body: { p_name, quantity, price },
  } = req;

  try {
    let newProduct = new productModel({
      p_name,
      quantity,
      price,
    });
    let product = await newProduct.save();
    return res.status(201).send({
      message: "Add Product Success",
      product_detail: product,
      status: "201",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

router.put("/api/v1/products/:id", checkProduct, async (req, res) => {
  const productID = req.params.id;
  const newData = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productID,
      newData,
      {
        new: true,
      }
    );
    return res.status(200).send({
      msg: "Updated Success",
      show: updatedProduct,
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

router.delete("/api/v1/products/:id", checkProduct, async (req, res) => {
  const productID = req.params.id;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(productID);
    return res.status(200).send({
      msg: "Delete Success",
      productName: deletedProduct.p_name,
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});





router.get("/api/v1/products/:id/orders", checkProduct, async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const productDetail = await orderModel.find({ p_foreignKey: id });

    return res.status(200).send({
      msg: "Get Success",
      orders: productDetail,
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});



router.post("/api/v1/products/:id/orders", checkProduct, async (req, res) => {
  const {
    params: { id },
    body: { p_total },
  } = req;

  try {

    //const productDetail = await orderModel.find({ p_foreignKey: id });
    const product = await productModel.findById(id);
    console.log(product.p_name);
    if(p_total > product.quantity){
      return res.status(404).send({
        msg: "Quantity more than in stock!",
        order: "Fail"
      })
    }
   
    const newOrder = new orderModel({
        p_foreignKey: id,
        p_name_order: product.p_name,
        p_total,
      });

    //---------------------------------------------
    const updatedQuantityStock = product.quantity - p_total;
    console.log(updatedQuantityStock);
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { quantity : updatedQuantityStock},
      {
        new: true,
      }
    );

    console.log(updatedProduct);
    //---------------------------------------------
    const order = await newOrder.save()
    return res.status(201).send({
      msg: "Add Success",
      order_detail: order,
      status: "201",
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

router.get('/api/v1/orders', async(req, res) =>{

  try{
    const orders = await orderModel.find();
    //console.log(orders);
    return res.status(200).send(orders)

  } catch(err){
    res.status(500).send(err.toString());
  }

})

module.exports = router;
