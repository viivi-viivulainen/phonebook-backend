const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

//Tällä käsiksi komentoriviparametriin
const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.cxuwetw.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

//Määritellään person skeema, joka kertoo kuinka henkilö tietokantaan tallennetaan
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})


Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(person.name + ' ' + person.number)
  })
  mongoose.connection.close()
})

person.save().then(result => {
  if (process.argv[3] & process.argv[3] !== '') {
    console.log('added ' + person.name + ' ' + person.number + ' to the phonebook')
  }
  console.log(result)
  mongoose.connection.close()
})



