const express = require('express');
const { getAllBooks, checkoutBook, getFineForOverdue } = require('../controllers/booksControllers');
const router = express.Router();

router.post('/getAllBooks', getAllBooks)
router.post('/checkoutBook', checkoutBook)
router.post('/getFineForOverdue', getFineForOverdue)




module.exports = router;