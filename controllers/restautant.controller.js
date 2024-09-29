const { default: mongoose } = require("mongoose");
var restaurantModel = require("../models/restaurant.model");
const bcrypt = require("bcrypt");
const { render } = require("ejs");

exports.getRestaurants = async (req, res, next) => {
  try {
    let list = await restaurantModel.restaurantModel.find();
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "Lấy  dữ liệu restaurant thành công" });
    } else {
      return res.status(400).json({ msg: "Không có dữ liệu restaurant" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.getInfoRestaurantById = async (req, res, next) => {
  const restaurantId = req.params.id;

  try {
    let info = await restaurantModel.restaurantModel.find({
      _id: restaurantId,
    });
    if (info) {
      return res
        .status(200)
        .json({ data: info, msg: "Lấy  dữ liệu restaurant thành công" });
    } else {
      return res.status(400).json({ msg: "Không có dữ liệu restaurant" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.createRestaurant = async (req, res, next) => {
  try {
    let list = await restaurantModel.restaurantModel.create(req.body);
    console.log(req.body);
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "Thêm dữ liệu  restaurant thành công" });
    } else {
      return res.status(400).json({ msg: "thêm restaurant thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.deleteRestaurant = async (req, res, next) => {
  let idRestaurant = req.params.id.replace(":", "");
  idRestaurant = new mongoose.Types.ObjectId(idRestaurant);
  try {
    let deleteRestaurant =
      await restaurantModel.restaurantModel.findByIdAndDelete({
        _id: idRestaurant,
      });
    if (deleteRestaurant) {
      return res.status(200).json({ msg: "Xóa dữ liệu restaurant thành công" });
    } else {
      return res.status(400).json({ msg: "xóa restaurant thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// for website
exports.webregister = async (req, res, next) => {
  console.log(req.body);
  if (req.body.password != req.body.rePassword) {
    return res.status(500).json({ msg: "Mật khẩu nhập lại không đúng" });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const restaurant = new restaurantModel.restaurantModel(req.body);
      restaurant.password = await bcrypt.hash(req.body.password, salt);
      await restaurant.generateAuthToken();
      let new_u = await restaurant.save();
      console.log(new_u);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
};

exports.weblogin = async (req, res, next) => {
  try {
    const restaurant = await restaurantModel.restaurantModel.findOne({
      account: req.body.username,
    });

    if (!restaurant) {
      return res.status(401).json({ msg: "Không tồn tại tài khoản" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      restaurant.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Sai mật khẩu" });
    }

    // Thiết lập thông tin nhà hàng vào session
    req.session.user = restaurant;

    res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Sai tài khoản hoặc mật khẩu" });
  }
};

exports.weblogout = async (req, res, next) => {
  console.log("aaaa");
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};
exports.getListRestaurant = async (req, res, next) => {
  try {
    let list = await restaurantModel.restaurantModel.find();
    console.log(list);
    res.render("restaurant/res", { list: list, req: req });
  } catch (error) {
    res.redirect("/", { req: req });
  }
};
exports.searchRestaurant = async (req, res, next) => {
  console.log(req.query.name);
  try {
    let regex = new RegExp(req.query.name, "i");
    let msg = "";
    let list = await restaurantModel.restaurantModel.find({ name: regex });
    if (list.length == 0) {
      msg = "Không có nhà hàng: " + req.query.name;
    }
    res.render("restaurant/res", { list: list, msg: msg, req: req });
  } catch (error) {
    console.log(error);
    res.redirect("/"); // Nếu có lỗi, chuyển hướng về trang chủ
  };
};