const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/new', function (req, res) {
  var error = req.flash('error')[0];
  res.render('users/new', { 'error': error });
});

router.post('/create', db.create_user, function (req, res) {
  if(res.error){
    req.flash('error', res.error);
    res.redirect('new');
  } else {
    res.redirect('/');
  }
});

module.exports = router;


router.get('/:email', function (req, res){
  var userEmail = req.params.email;
  db.any('SELECT * FROM saved WHERE user_email = $1',[userEmail]).then(function(data){
    var userData = {
      saved : data
    }
    res.render('users/saved', userData)
  });
});
