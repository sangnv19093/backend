require("../models/product.model");
require("../models/users.model");

var notifyModel = require("../models/notify.model");
exports.getNotifyById = async () => {
  try {
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.postNotify = async (data) => {
  console.log(data);
  try {
    const notify = new notifyModel.notifyModel(req.body);
    await notify.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
