var express = require('express');
var router = express.Router();

var Product = require('../database/connectProduct');
var Users = require('../database/connectUser');
var Cart = require('../database/connectCart');
var Comment = require('../database/connectCmt')

const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Server is running')
});


/* Login. */
router.post('/login', function (req, res, next) {

  Users.find({}, (err, docs) => {
    var check = docs.find((item) => {
      return item.username == req.body.acc && item.password == req.body.pass;
    })

    if (check != null) {
      var id = check._id;
      var name = check.name;
      var username = check.username
      var password = check.password
      var phone = check.phone
      var role = check.role

      var obj = {
        name,
        username,
        password,
        phone,
        role,
        id
      }

      var token = jwt.sign({ obj }, 'mk');

      res.status(200).json(token)
    }

    if (check == null) {
      res.status(400).json('Tài khoản hoặc mật khẩu không chính xác')
    }
  })

});

/* USERS */

router.get('/api/listusers', function (req, res, next) {
  Users.find({}, (err, docs) => {
    res.json(docs)
  })
});

router.post('/delete/user', function (req, res, next) {

  Users.deleteOne({ _id: req.body.id }, (err) => {
    if (err) throw err;
    res.status(200).json('Xóa User thành công')
    // res.json('Xóa thành công')
  })
})



router.post('/signup', function (req, res, next) {
  Users.find({}, (err, docs) => {
    const filter = docs.filter((item) => {
      return item.username.toUpperCase() == req.body.username.toUpperCase()
    })

    if (filter.length == 0) {
      const user = new Users({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
      })

      user.save().then(() => {
        res.status(200).json('Đăng kí thành công')
      })
        .catch((err) => {
          if (err) throw err;
        });
    }
    else if (filter.length != 0) {
      res.status(400).json('Tài khoản đã tồn tại')
    }

  })
});







/* PRODUCTS. */
router.get('/api/listproduct', function (req, res, next) {
  Product.find({}, (err, docs) => {
    res.json(docs)
  })
});

/* ADD PRODUCT */
router.post('/add/product', function (req, res, next) {

  Product.find({}, (err, docs) => {
    const filter = docs.filter((item) => {
      return item.name.toUpperCase() == req.body.name.toUpperCase()
    })

    // console.log(filter);
    if (filter.length == 0) {
      const prod = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        detail: req.body.detail
      })

      prod.save().then(() => {
        res.status(200).json('Thêm sản phẩm thành công')
      })
        .catch((err) => {
          if (err) throw err;
        });
    }
    else if (filter.length != 0) {
      res.status(400).json('Sản phẩm đã tồn tại')
    }

  })

});

/* DELETE Products. */
router.post('/delete/product', function (req, res, next) {

  Product.deleteOne({ _id: req.body.id }, (err) => {
    if (err) throw err;
    res.status(200).json('Xóa sản phẩm thành công')
    // res.json('Xóa thành công')
  })
})


/* EDIT Products. */
router.post('/edit/product', function (req, res, next) {
  Product.updateOne({ _id: req.body.id }, {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    detail: req.body.detail,
  },
    function (err) {
      if (err) throw err;
      res.status(200).json('Sửa sản phẩm thành công')
    })
});

/* AMY_CART */
router.get('/api/listcart', function (req, res, next) {
  Cart.find({}, (err, docs) => {
    res.json(docs)
  })
});
/* ADD_TO_CART */
router.post('/order', function (req, res, next) {

  const cart = new Cart({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    listOrder: req.body.listOrder,
    total: req.body.total,
    note: req.body.note,

  })

  cart.save().then(() => {
    res.status(200).json('Đặt Hàng Thành Công')
  })
    .catch((err) => {
      if (err) throw err;
    });
});

/* COMMENT */
router.get('/api/cmt', function (req, res, next) {
  Comment.find({}, (err, docs) => {
    res.json(docs)
  })
});


router.post('/add/cmt', function (req, res, next) {
  // console.log(req.body);
  const bl = new Comment({
    idProduct: req.body.idProduct,
    cmt: req.body.cmt,
    username: req.body.username,
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    minute: req.body.minute
  })

  bl.save().then(() => {
    res.status(200).json('Đã bình luận')
  })
    .catch((err) => {
      if (err) throw err;
    });

});

router.post('/delete/cmt', function (req, res, next) {

  Comment.deleteOne({ _id: req.body.id }, (err) => {
    if (err) throw err;
    res.status(200).json('Xóa bình luận thành công')
  })
})


module.exports = router;
