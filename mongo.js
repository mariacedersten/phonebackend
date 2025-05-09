// tämä on komentoriviltä käytettävä mondoDb-serveri
/*
const mongoose = require('mongoose')
const para = process.argv

mongoose.set('strictQuery', false)


const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})


const Note = mongoose.model('Note', noteSchema)

if (para.length<3) {
  console.log('give password as argument')
  process.exit(1)
} 
const password = para[2]
const url =
  `mongodb+srv://omniaopettaja:${password}@testifs.jiwxro8.mongodb.net/phoneBook?retryWrites=true&w=majority`


  mongoose.connect(url)


if(para.length==5) {
  const name = para[3]
  const number = para[4]
  const note = new Note({
    name: `${name}`,
    number: `${number}`,
  })
  
  note.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook `)
    mongoose.connection.close()
  })
} else if(para.length==3) {
  console.log("phonebook:")
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note.name, note.number)
    })
    mongoose.connection.close()
  })
}

*/