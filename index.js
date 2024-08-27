const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 5000;
const pool = require("./db");
app.use(express.json());



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

app.get('/books', async(req,res)=>{
    try {
        const books = await pool.query("SELECT * FROM book");
        res.status(200).json({message: 'book returned', data: books.rows})
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