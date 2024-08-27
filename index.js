const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 5000;

app.use(express.json());

app.post('/books', async (req,res)=> {
    try {
        const id = uuidv4();
        res.status(201).json({message: `book created with id : ${id}`})
    } catch (error) {
        res.json({error:error.message})
    }
})


app.get('/', (req,res)=> {
    res.send('Server running successfully')
})

app.listen(port, async (req,res) =>{
    console.log(`server running on http://localhost:${port}`);
})