const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 5000;
const pool = require("./db");
app.use(express.json());


// post data with body data and uuid generated id
app.post('/books', async (req,res)=> {
    try {
        const id = uuidv4();
        const {name, description} = req.body;

        const book = await pool.query("INSERT INTO book (id,name,description) VALUES ($1,$2,$3) RETURNING *",[id, name ,description])
        res.status(201).json({message: `book created `, data:book.rows})
    } catch (error) {
        res.json({error:error.message})
    }
})

// get data 
app.get('/books', async(req,res)=>{
    try {
        const books = await pool.query("SELECT * FROM book");
        res.status(200).json({message: 'book returned', data: books.rows})
    } catch (error) {
        res.json({error: error.message})
    }
})

// get specific data
app.get('/books/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await pool.query("SELECT * FROM book WHERE id=$1", [id]);
        res.status(200).json({message: 'book returned', data: book.rows})
    } catch (error) {
        res.json({error: error.message})
    }
})

//delete data
app.delete('/books/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM book WHERE id=$1", [id]);
        res.status(200).json({message: 'book returned'})
    } catch (error) {
        res.json({error: error.message})
    }
})

//put data
app.put('/books/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const {name, description} = req.body;
        const updatedBook = await pool.query("UPDATE book SET name=$1, description=$2 WHERE id=$3 RETURNING *", [name,description,id]);
        res.status(200).json({message: 'book info updated', data: updatedBook.rows})
    } catch (error) {
        res.json({error: error.message})
    }
})


app.get('/', (req,res)=> {
    res.send('Server running successfully')
})

app.listen(port, async (req,res) =>{
    console.log(`server running on http://localhost:${port}`);
})