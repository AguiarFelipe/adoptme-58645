import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import path from 'path';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL);

app.engine('handlebars', handlebars.engine({
    runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowedProtoProperties:true
    },
    helpers:{
        formatDate: function (date){
            return new Date(date).toLocaleDateString('pt-BR');
        }
    }
}));

app.set('view engine', 'handlebars');
app.use(express.static(path.join(process.cwd(), 'src', 'css')));
app.set('view', './src/views');

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.render('welcome');
})
app.get('/menu', (req, res)=>{
    res.render('menu');
});

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
