const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/yhteys')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    console.log('index.js', persons)
    let pituus = persons.length
    response.json(`Tietokannasta löytyy ${pituus} puhelinnumeroa`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log('index.js', persons)
    response.json(persons)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).send('Ei löydy tommosta id:tä')
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body)

  Person.findByIdAndUpdate(request.params.id, { name: body.name, number: body.number }, { new: true, runValidators: true, context: 'query'  })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//Olemattomien osoitteiden käsittely viimeiseksi, koska tää vastaa kaikkiin
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('åfdsalkjf', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

