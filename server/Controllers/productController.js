const productModel = require("../models/product");
const fs = require("fs");

exports.read = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const product = await productModel.findById(id).exec();
    // const product = await productModel.findOne({_id : id}).exec();
    res.send(product);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("server error: " + err);
  }
};

exports.list = async (req, res) => {
  try {
    // code
    const product = await productModel.find({}).exec();
    res.send(product);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("server error: " + err);
  }
};

exports.create = async (req, res) => {
  try {
    // code
    let data = req.body;
    if (req.file) {
      data.file = req.file.filename;
    }
    const product = await productModel(data).save();
    res.send(product);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("server error: " + err);
  }
};

exports.update = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const product = await productModel
      .findByIdAndUpdate(id, req.body, { new: true })
      .exec();
    res.send(product);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("server error: " + err);
  }
};

exports.deleteData = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id).exec();
    if (product?.file) {
      await fs.unlink("./uploads/" + product.file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfully");
        }
      });
    }
    if (product) {
      res.status(200).send("deleted successfully");
    } else {
      res.status(500).send("can not delete empty id");
    }
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("server error: " + err);
  }
};
