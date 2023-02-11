//jotta päästään mongoose käsiksi
const mongoose = require('mongoose')

/*
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} */

//Tällä käsiksi komentoriviparametriin
//const password = process.argv[2]

mongoose.set('strictQuery', false)

//salasana sovelluksen ympäristömuuttujan kautta
const url = process.env.MONGODB_URI
//const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`


console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log(result)
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//Määritellään person skeema, joka kertoo kuinka henkilö tietokantaan tallennetaan
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true },
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Person = mongoose.model('Person', personSchema)


/*const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
}) */

module.exports = mongoose.model('Person', personSchema)