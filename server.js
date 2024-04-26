const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* Conexion a la bd */
const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'pruebajp',
    user: 'yeipi',
    password: '12345',
    allowExitOnIdle: true
}

const db = pgp(cn);

/* Endpoints */
app.get('/post', (req, res) => {
    db.any('select * from cars')
       .then(data => res.send(data))
       .catch(error => res.send(error))
});

app.get('/post/:id', (req, res) =>{
    db.one('SELECT * FROM cars WHERE id=$1', [req.params.id])
//    db.one('SELECT cars., author. FROM cars JOIN id_author ON cars.id_author = author.id_author WHERE cars.id = $1', [req.params.id])
    .then(data => res.send(data))
    .catch(error => res.send(error))
});

app.get('/author/:id_author', async (req, res) => {
    try {
        const authorData = await db.one('SELECT name, lastname, date_of_birth, email, phone_number FROM author WHERE id_author =$1', [req.params.id_author]);
        res.json(authorData);
    } catch (error) {
        console.error('Error al obtener datos del autor:', error);
        res.status(500).json({ error: 'Error al obtener datos del autor' });
    }
});



app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
