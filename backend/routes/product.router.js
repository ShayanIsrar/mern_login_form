const ensureAuthenticated = require('../middlewares/auth.product');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res)=>{
    console.log('--- Logged in user details --- ', req.user)
    res.status(200).json([
        {
            name: 'mobile',
            price: 12000
        },
        {
            name: 'TV',
            price: 18000
        },
        {
            name: 'Computer',
            price: 22000
        },
        {
            name: 'Iphone',
            price: 35000
        },
    ])
})

module.exports = router;