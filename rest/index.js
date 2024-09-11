const path = require('path')
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const methodOverride = require('method-override')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuidv4(),
        username: 'Ari setiawan',
        text: `Aplikasi ini sangat membantu saya dalam mengelola to-do list sehari-hari. UI-nya juga mudah digunakan!`
    },
    {
        id: uuidv4(),
        username: 'Dinda Rahma',
        text: `Fitur reminder-nya benar-benar berguna untuk saya yang sering lupa. Terima kasih sudah membuat aplikasi ini!`
    },
    {
        
        id: uuidv4(),
        username: 'Budi Santoso',
        text: `Saran saya, mungkin bisa ditambahkan fitur sinkronisasi dengan kalender supaya lebih praktis.`
    },
    {
        
        id: uuidv4(),
        username: 'Rizky Pratama',
        text: `Desain yang minimalis tapi fungsional, saya suka sekali. Ditunggu fitur-fitur baru lainnya!`
    },
    {
        
        id: uuidv4(),
        username: 'Sarah Amelia',
        text: `Cocok untuk siapa saja yang punya banyak tugas harian. Membantu saya untuk lebih terorganisir.`
    },
    {
        
        id: uuidv4(),
        username: 'Sanjaya',
        text: `Performanya lumayan cepat dan responsif, tapi kadang ada bug kecil saat menambahkan task baru.`
    },
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/create', (req, res) => {
    res.render('comments/create')
})

app.post('/comments', (req, res) => {
    const {username, text} = req.body
    comments.push({username, text, id: uuidv4()})
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newComment = req.body.text
    const foundComment = comments.find(c => c.id === id)
    foundComment.text = newComment
    console.log(newComment)
    console.log(foundComment)
    res.redirect('/comments')
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments');
})

app.get('/order', (req, res) => {
    res.send('GET order response')
});

app.post('/order', (req, res) => {
    const {item, qty } = req.body
    res.send(`Item: ${item} - Qty: ${qty}`)
});

app.listen(8080, () => {
    console.log(`Server is running on: http://localhost:8080`)
})