const router = require('express').Router();
const bookModel = require('../model/book');
router.get('/books', async function (req, res) {
   const bookList = await bookModel.find();
   console.log(bookList);
   res.send(bookList);
});
router.get('/books/:id', async function (req, res) {
    const { id } = req.params;
    const book = await bookModel.findOne({num : id});
    if(!book) return res.send("Book Not Found");
    res.send(book);
});
router.post('/books', async function (req, res) {
    const title= req.body.title;
    const num = req.body.num;
    const author = req.body.author;
    const bookExist = await bookModel.findOne({num : num});
  
    if (bookExist) return res.send('Book already exist');
    var data = await bookModel.create({title,num,author});
    data.save();
    res.send("Book Uploaded");
});

router.put('/books/:id', async function (req, res) {
    const { id } = req.params;
    const {
        title,
        authors,
    } = req.body;
    const bookExist = await bookModel.findOne({num : id});
    if (!bookExist) return res.send('Book Do Not exist');
    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        ...bookExist ,
        title: updateField(title, bookExist.title),
        authors: updateField(authors, bookExist.authors),
        
    };
    await bookModel.updateOne({num: id},{$set :{title : updatedBook.title, author: updatedBook.authors}})
    
    res.status(200).send("Book Updated");
});
router.delete('/books/:id', async function (req, res) {
    const { id } = req.params;
    const bookExist = await bookModel.findOne({num : id});
    if (!bookExist) return res.send('Book Do Not exist');
   await bookModel.deleteOne({ num: id }).then(function(){
        console.log("Data deleted"); // Success
        res.send("Book Record Deleted Successfully")
    }).catch(function(error){
        console.log(error); // Failure
    });
});

module.exports = router;