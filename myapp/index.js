const express = require("express");
const {open}=require('sqlite');
const sqlite3=require('sqlite3')
const path=require('path');

const app = express();

const dbPath = path.join(__dirname,"goodreads.db")

let db=null;
const initializeDbAndServer=async()=>{
    try{
    db= await open({
        filename:dbPath,
        driver:sqlite3.Database
    })
    app.listen(3000,()=>{
        console.log("Server running at http://localhost:30000/")
    });
    }catch(e){
        console.log(`DB Error: ${e.meassage}`)
        process.exit(1)
    }
}
initializeDbAndServer()

app.get("/books/",async(request,response)=>{
    const  getBookQuery = `
    SELECT * 
    FROM book
    ORDER BY  book_id;

    `;
    const booksArray= await db.all(getBookQuery);
    response.send(booksArray)
})

