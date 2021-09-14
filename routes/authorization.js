const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');

router.use('/', (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    
    if (!token) {
      res.status(403).send('Authorization credentials missing in header')
      return;
    }

    token = token.slice(7, token.length);
    jwt.verify(token, 'ShopifyIsCool', (err, decoded) => {
      if (err)    res.status(401).send('Invalid token');
      else {
        res.locals.owner = decoded.username
        next();
      }
    });
        
})

module.exports = router;