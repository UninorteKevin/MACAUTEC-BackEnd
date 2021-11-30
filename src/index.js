'use-strict'

var mongoose = require('mongoose');
const app = require('./app');
var port = process.env.PORT || 3999;


mongoose.Promise = global.Promise;

const uri = "mongodb+srv://mern:mongodb@clustertallervehiculos.vvu9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//CONEXION DE A LA BASE DE DATOS MONGO DB CLOUD
mongoose.connect(uri, {useCreateIndex : true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log('La conexion a la base de datos se ha realizado correctamnete');
        })
        .catch(error => console.log(error));

//INICIAR Y CONFIG DEL SERVIDOR
app.set('port',port);

        //CREAR EL SERVIDOR
        app.listen(port, () => {
            console.log( 'El servidor http://localhost:'+ port +' esta funcionando correctamente');
        });

        app.get('/', (req, res) => {
            res.write(
                '<H1>No view!</H1>'
            )
        })