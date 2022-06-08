'use strict'

const express = require('express')
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3900;
var mongoose = require('mongoose');
var jquery = require('jquery');

var url = "mongodb+srv://marcosTFG:223467@cluster0.bty1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


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

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'justificantes')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage}).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).send(req.file)
    })
});

app.get("/justificantes/:nombre", (req,res) =>
{
    res.download("./justificantes/" + req.params.nombre);
})

mongoose.connect(url, { useNewUrlParser: true }).then(() =>{

	console.log('Conexión con la BDD realizada con éxito!!!')

	app.listen(process.env.PORT || port, () =>{
		console.log('servidor ejecutándose en http://localhost:' + port );
	});

});