// Import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db'); // Import file koneksi db

// Menyajikan file statis dari folder 'public'
app.use(express.static('public'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware untuk parsing body request
app.use(bodyParser.urlencoded({ extended: false }));

// Menu Root
app.get('/', (req, res) => {
    db.query('SELECT * FROM articles', (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.render('articles-list', { articles: results }); // Render halaman admin dengan data artikel
    });
});
// Route untuk halaman admin
app.get('/admin', (req, res) => {
    res.render('admin/dashboard'); // Render halaman admin
});

// Route untuk menampilkan daftar artikel di halaman admin
app.get('/admin/articles', (req, res) => {
    db.query('SELECT * FROM articles', (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.render('admin/articles-list', { articles: results }); // Render halaman admin dengan data artikel
    });
});

// Route untuk menambahkan artikel baru
app.get('/admin/articles/new', (req, res) => {
    res.render('admin/new-article'); // Render halaman form untuk menambahkan artikel baru
});

// Route untuk menyimpan artikel baru ke database
app.post('/admin/articles', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO articles (title, content) VALUES (?, ?)', [title, content], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.redirect('/admin/articles'); // Redirect kembali ke halaman daftar artikel admin setelah menyimpan
    });
});

// Route untuk mengedit artikel
app.get('/admin/articles/edit/:id', (req, res) => {
    const articleId = req.params.id;
    db.query('SELECT * FROM articles WHERE id = ?', [articleId], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.render('admin/edit-article', { article: results[0] }); // Render halaman form untuk mengedit artikel
    });
});

// Route untuk menyimpan perubahan pada artikel ke database
app.post('/admin/articles/edit/:id', (req, res) => {
    const articleId = req.params.id;
    const { title, content } = req.body;
    db.query('UPDATE articles SET title = ?, content = ? WHERE id = ?', [title, content, articleId], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.redirect('/admin/articles'); // Redirect kembali ke halaman daftar artikel admin setelah mengedit
    });
});

// Route untuk menghapus artikel dari database
app.post('/admin/articles/delete/:id', (req, res) => {
    const articleId = req.params.id;
    db.query('DELETE FROM articles WHERE id = ?', [articleId], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.redirect('/admin/articles'); // Redirect kembali ke halaman daftar artikel admin setelah menghapus
    });
});

// Server listening
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
