//const http = require('http')
const { response, request, Router } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//Jotta frontend pääsee kiinni backendiin
app.use(cors())

//Jotta päästään dataan kiinni niin lisätään expressin json-parseri
app.use(express.json())

app.use(morgan('tiny'))


let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

  app.get('/', (req,res) => {
    res.send('Hello World')
  })

  //3.3 Näytetään puhelinnumero id:n perusteella 
  app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person.number) //pelkkä person, jos halutaan henkilö
    } else {
        response.status(404).end()
    }
  }) 

  //3.4 Poistetaan henkilö, mikäli vastaava id löytyy
  app.delete('/api/persons/:id', (request,response) => {
    const number = request.params.number
    const personFind = persons.find(person => person.number === number)
    if (typeof(personFind) != "undefined") {
    const id = personFind.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end }
    else {
        response.status(404).end 
    }

  })

  /*
  //Luodaan uusi id:tä
  const newId = () => {
    const maxId = persons.length >0
    ? Math.random(...persons.map(n=>n.id)) //Muodostaa taulukon id:stä ... muuttaa taulukon luvuiksi
    :0
    return maxId + 1
  } */

  //Luodaan uusi id
  const newId = () => {
    return Math.floor(Math.random() * 100000)
  }

  //3.6
  //henkilön lisäys POST-pyynnöllä
  //lisäksi luodaan uusi uniikki id
  app.post('/api/persons', (request,response) => {
    const body = request.body
   
    const personFind = persons.find(person => person.name === body.name)
    console.log(personFind)
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (typeof(personFind) != "undefined")
         {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
    const person = {
        name: body.name,
        number: body.number,
        id: newId(),   
    }

    persons = persons.concat(person)

    response.json(person)
  })



  //3.1 taulukko puhelinnumeroista
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  }) 


  //3.2 info sivu
  app.get('/info', (request, response) => {
    const lkm = persons.length
    //const d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    const d = new Date().toUTCString()
    console.log(d)
    const vastaus = `Phonebook has info for ${lkm} people `
    response.send(`Phonebook has info for ${lkm} people \n ${d}`)
  }) 


/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
}) */

/*const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */

//ympäristömuuttuja
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})