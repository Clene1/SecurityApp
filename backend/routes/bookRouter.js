const express = require('express')
const {createBook, getBooks, getBook, updateBook, deleteBook} = require('../controllers/bookController.js')


//create instance of router
const router = express.Router()

//get one book
router.get('/', getBook)

//get all books
router.get('/:id', getBooks)

//add new book
router.post('/', createBook)

//delete a book
router.delete('/:id', deleteBook)

//update info
router.patch('/:id', updateBook)

module.exports = router