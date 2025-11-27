import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix to replicate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'Src','views'));
app.set('view engine', 'ejs');

// ---------------- Middleware----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));
app.get('/', (req, res) => {
    res.render('index', { name: "yo" });
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.listen(port, () => {
    console.log('Listening on port', port);
});