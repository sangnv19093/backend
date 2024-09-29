const { default: mongoose } = require("mongoose");
var db = require("./db");

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    quantityInStock: Number,
    realPrice: Number,
    category: String,
    discountPrice: Number,
    restaurantId: { type: mongoose.Schema.ObjectId, ref: "restaurantModel" },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
productModel = db.mongoose.model("productModel", productSchema);
module.exports = {
  productModel,
};
