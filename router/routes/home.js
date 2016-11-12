const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    data = {
      posts:['blah','test','hello'],
      session: req.session
    }
    res.render('index', data);
  }
});

module.exports = router;
