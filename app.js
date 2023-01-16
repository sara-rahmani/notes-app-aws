// import express from 'express'
// // import * as database from ('./fakeDatabase.js')
//  import * as database from './mysqlDatabase.js'
//  //import {getNote} from './mysqlDatabase' //default
const express = require("express");
const database = require("./mysqlDatabase");


const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));


 app.get("/notes", async(req, res) => {
  const notes =  await database.getNotes();
  console.log(notes);
  // res.send(notes);// 

  res.render("index.ejs", {pokeNotes: notes})
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    try {
      const note = await database.getNote(id)
      console.log(note);
      res.render("noteDetail.ejs", {pokeNote: note})
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  })

//   res.render("singleNote.ejs", {
//     note,
//   });
// })



app.post("/notes",  async(req, res) => {
    const data = req.body
    console.log(data);
  try{  
     await database.addNote(data)
    
      res.redirect("/notes");
    }catch (error) {
        console.error(error)
        res.sendStatus(500)
      }
})

app.get("/notes/:id/delete", async(req, res) => {
    const id = +req.params.id
console.log(id);
    try{
 await database.deleteNote(id)
  res.redirect("/notes")
} catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})
// After all other routes
app.get('*', (req, res) => {
  res.sendFile('index.ejs');
});

const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
