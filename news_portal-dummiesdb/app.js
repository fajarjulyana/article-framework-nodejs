// Import packages
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Sample data (can be replaced with database)
let news = [
    { id: 1, title: 'Breaking News 1', content: 'Content of breaking news 1' },
    { id: 2, title: 'Breaking News 2', content: 'Content of breaking news 2' }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { news });
});

// Admin routes
app.get('/admin', (req, res) => {
    // Render admin dashboard
    res.render('admin/dashboard');
});

app.get('/admin/news', (req, res) => {
    // Render page to show all news articles
    res.render('admin/news-list', { news });
});

app.get('/admin/news/create', (req, res) => {
    // Render form to create a new news article
    res.render('admin/news-create');
});

app.post('/admin/news/create', (req, res) => {
    // Handle creation of a new news article
    const { title, content } = req.body;
    const id = news.length + 1;
    news.push({ id, title, content });
    res.redirect('/admin/news');
});

app.get('/admin/news/edit/:id', (req, res) => {
    // Render form to edit a news article
    const id = req.params.id;
    const article = news.find(item => item.id == id);
    res.render('admin/news-edit', { article });
});

app.post('/admin/news/edit/:id', (req, res) => {
    // Handle editing of a news article
    const id = req.params.id;
    const { title, content } = req.body;
    const index = news.findIndex(item => item.id == id);
    if (index !== -1) {
        news[index] = { id, title, content };
    }
    res.redirect('/admin/news');
});

app.post('/admin/news/delete/:id', (req, res) => {
    // Handle deletion of a news article
    const id = req.params.id;
    news = news.filter(item => item.id != id);
    res.redirect('/admin/news');
});

// Route to view individual article
app.get('/article/:id', (req, res) => {
    const id = req.params.id;
    const article = news.find(item => item.id == id);
    if (article) {
        res.render('article', { article });
    } else {
        res.status(404).send('Article not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
