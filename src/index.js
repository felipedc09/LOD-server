const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
var PeriodicTasks = require('./db/utils/periodicTasks')
const instanceController = require('./controllers/instance')()
const packageController = require('./controllers/package')()
const conf = require('../config')

mongoose.connect(`${conf.dbUrl}${conf.dbUser}:${conf.dbPwd}@${conf.dbHost}/${conf.dbName}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// ROUTES
app.get('/instances', instanceController.getInstances)
app.post('/instances', instanceController.postInstances)
app.get('/instances/:id', instanceController.getInstancesById)
app.delete('/instances/:id', instanceController.deleteInstances)
app.get('/datasets/:instanceId', packageController.getPackagesByInstance)

// RUN SERVER
new PeriodicTasks().excecutePeriodicTasks()
app.listen(conf.port || 8080, () => console.log(`Listening on port ${conf.port || 8080}!`))
