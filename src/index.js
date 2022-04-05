'use strict'

const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3900;
var mongoose = require('mongoose');

var url = "mongodb+srv://codenautas2:codenautas2020@cluster0.2fafc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose.Promise = global.Promise;

var alumno_routes = require('./routes/AlumnoRoute');
var curso_routes = require('./routes/CursoRoute');
var user_routes = require('./routes/UserRoute');
var asistencia_routes = require('./routes/AsistenciaRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', alumno_routes);
app.use('/api', curso_routes);
app.use('/api',user_routes);
app.use('/api', asistencia_routes);

mongoose.connect(url, { useNewUrlParser: true }).then(() =>{

	console.log('Conexión con la BDD realizada con éxito!!!')

	app.listen(process.env.PORT || port, () =>{
		console.log('servidor ejecutándose en http://localhost:' + port );
	});

});