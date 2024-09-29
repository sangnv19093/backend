const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dath33603:QWCNouzimMLmQESf@cluster0.xcezadi.mongodb.net/BeanfoodBacken')
        .then(() => console.log('Kết nối MongoDB thành công'))
        .catch((err) => {
                console.log("Loi ket noi CSDL: ");
                console.log(err);
        });
module.exports = { mongoose }