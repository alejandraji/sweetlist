const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
var dblink = process.env.DATABASE_URL || 'postgres://alejandrajimenez@localhost:5432/etsy_db';
const db = require('../../db/db');
const database = pgp(dblink);

// ajax post req to /items/new
router.post('/new', db.create_item, function(req, res){
  if (res.error) {
    req.flash('error', res.error);
  } else {
   // console.log(data)
    res.send(res.success)
  }

});

router.get('/:email', function (req, res){
  console.log(req.session)
  var email= req.params.email
  // var data = "i am data";
  //var id= req.params.id;
 database.any('SELECT * FROM saved WHERE email =$1',[email]).then(function(data){

    var items = {
      data: data
    }
    console.log(items)
    res.render('items', items);
    console.log("id is working")
  }).catch(function(error){
  console.log(error)
 });

})

module.exports = router;

