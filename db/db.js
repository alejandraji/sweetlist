const pgp = require('pg-promise')();
var dblink = process.env.DATABASE_URL || 'postgres://alejandrajimenez@localhost:5432/etsy_db';
const db = pgp(dblink);

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var auth_error = 'Incorrect Email / Password!';

  db.one(
    "SELECT * FROM users WHERE email = $1",
    [email]
  ).catch(function(){
    res.error = auth_error;
    next();
  }).then(function(user){
    bcrypt.compare(
      password,
      user.password_digest,
      function(err, cmp){
        if(cmp){
          req.session.user = {
            'email': user.email
          };
          next();
        } else {
          res.error = auth_error;
          next();
        }
      }
    );
  });
};

var logout = function(req, res, next){
  req.session.user = null;
  next()
};

var create_user = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, 10, function(err, hashed_password){
    db.none(
      "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
      [email, hashed_password]
    ).catch(function(){
      res.error = 'Error. User could not be created.';
      next();
    }).then(function(user){
      req.session.user = {
        'email': email
      };
      next();
    });
  });
};

var create_item = function(req, res, next){
  console.log('This is reqbody')
  // console.log(req.body);
  // console.log(req.session);
  // console.log(req.body.description);
  // var email = req.session.user.email;
  console.log(req.body)

  var title = req.body.title;
  var price = req.body.price;
  var email = req.body.email
  var image = req.body.image


    db.none(
     "INSERT INTO saved (email, title, price, image) VALUES ($1,$2,$3,$4)", [email, title, price, image]
     ).then(function() {
      console.log("working with this db!!!! ");
      res.success = data;
       next();
      }).catch(function(error) {
      console.log(error);
      res.error = "woops";
       next();
      });
};



module.exports = { login, logout, create_user, create_item };
