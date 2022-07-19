const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getPets = (request, response) => {
    pool.query('SELECT * FROM pets', (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

const addPet = (request, response) => {
    const { nome, peso, raca, especie } = request.body

    pool.query(
        'INSERT INTO pets (nome, peso, raca, especie ) VALUES ($1, $2, $3, $4)',
        [nome, peso, raca, especie ],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Pet criado.' })
        },
    )
}

const updatePet = (request, response) => {
    const { codigo, nome, peso, raca, especie } = request.body
    pool.query('UPDATE pets set nome=$1, peso=$2, raca=$3, especie=$4 where codigo=$5',
        [nome, peso, raca, especie, codigo], error => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Pet atualizado.' })
        })
}

const deletePet = (request, response) => {    
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM pets where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(201).json({ status: 'success', message: 'Pet apagado.' })
    })
}

const getPetPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM pets where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error', 
            message: 'Erro: ' + error });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/pets')
    // GET endpoint
    .get(getPets)
    // POST endpoint
    .post(addPet)
    // PUT
    .put(updatePet)  

app.route('/pets/:id')
    .get(getPetPorID) 
    .delete(deletePet) 


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})