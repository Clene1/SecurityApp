const Book = require('../models/BookModels.js')
const mongoose = require('mongoose')

//get all books
const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createAt: -1})
    res.status(200).json(books)
}


//create new book
const createBook = async (req, res) => {
    const {title, author, quantity} = req.body
    //add document to the database
    try{
        const book = await Book.create({title, author, quantity})
        res.status(200).json(book)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get one book
const getBook = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
    }
    const book = await Book.findById(id)
    
    if(!book) {
        return res.status(404).json({error: "Could not find such book"})
    }
    res.status(200).json({book})
}

//update a book
const updateBook = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid id"})
    }
    const book = await Book.findOneAndUpdate({_id: id}, {
        ...req.body //to spread the properties out of the request
    })
    if (!book) {
        return res.status(404).json({error: "Book not found"})
    }
    res.status(200).json(book)
    
}

//delete a book
const deleteBook = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid id"})
    }
    const book = await Book.findOneAndDelete({_id: id})
    if (!book) {
        return res.status(404).json({error: "Book not found"})
    }
    res.status(200).json(book)
    
}


module.exports = {
    getBooks,  
    createBook,
    getBook,
    updateBook,
    deleteBook,
    
}