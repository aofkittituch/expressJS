const productModel = require("../models/product");

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
    console.log(req.body);
    const product = await productModel(req.body).save();
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
    const product = await productModel.findByIdAndUpdate(id, req.body, {new: true}).exec();
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
    res.send(product);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("server error: " + err);
  }
};
