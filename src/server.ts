import express from 'express';
import users from './routes/users.route';
import mongoose from 'mongoose';

const DB_NAME = 'training';
const connection = mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
connection
    .then(() => console.log('La base de datos se inicio correctamente'))
    .catch(() => console.log('Error al iniciar la base de datos'))

const app = express();

app.use(express.json());
app.use(users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})
