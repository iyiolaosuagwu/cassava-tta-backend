import express, { urlencoded } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

// redirect to routes/index.ts
import route from './routes';

dotenv.config();
const app = express();

app.use(cors({ origin: '*' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


// app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }));
// parse application/json
app.use(bodyParser.json())

app.use('/', route);

const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});