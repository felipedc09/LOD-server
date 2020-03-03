const express = require('express');
const cors = require('cors');
const instanceController = require('./controllers/instance')()
const ckanController = require('./controllers/ckan')()


const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//ROUTES
app.get('/instances', instanceController.getInstances);
app.post('/instances', instanceController.postInstances);
app.get('/instances/:instanceName', instanceController.getInstancesByURL);
app.get('/instance/:instanceName/graphic', ckanController.getInstanceGraphic);

//RUN SERVER
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
