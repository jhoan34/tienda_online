import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './Port.js';
import router from './routes/routes_products.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

// Handle ePayco confirmation POST request
app.post('/pagos/confirmation', (req, res) => {
    const data = req.body;
    console.log('Confirmation received:', data);
    // Process the confirmation data here
    res.status(200).send('Confirmation received');
});

// Handle ePayco response GET request
// Handle ePayco response GET request
app.get('/pagos/response', (req, res) => {
    const { ref_payco } = req.query;
    console.log('Response received with ref_payco:', ref_payco);
    
    // Construir la URL de redirección con el parámetro ref_payco
    const redirectUrl = `https://tienda-online-1.onrender.com/?ref_payco=${ref_payco}`;
    
    // Redirigir al usuario a la URL construida
    res.redirect(redirectUrl);
});


app.post('/pagosindividual/confirmation', (req, res) => {
    const data = req.body;
    console.log('Confirmation received:', data);
    // Process the confirmation data here
    res.status(200).send('Confirmation received');
});

// Handle ePayco response GET request
// Handle ePayco response GET request
app.get('/pagosindividual/response', (req, res) => {
    const { ref_payco } = req.query;
    console.log('Response received with ref_payco:', ref_payco);
    
    // Construir la URL de redirección con el parámetro ref_payco
    const redirectUrl = `https://tienda-online-1.onrender.com/#/responseiNdevidual/?ref_payco=${ref_payco}`;
    
    // Redirigir al usuario a la URL construida
    res.redirect(redirectUrl);
});



app.listen(PORT, () => {
    console.log('Server running on port ' + PORT, 'in', 'http://localhost:' + PORT);
});
