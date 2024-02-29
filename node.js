const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/money', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Expense schema
const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/expense', (req, res) => {
    const newExpense = new Expense({
        description: req.body.description,
        amount: req.body.amount
    });

    newExpense.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding expense');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/expenses', (req, res) => {
    Expense.find({}, (err, expenses) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching expenses');
        } else {
            res.json(expenses);
        }
    });
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
