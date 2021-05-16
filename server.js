const express = require('express'); 
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb+srv://test:test@cluster0.okyek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = 3000; 
const app = express(); 

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('VisitorInfo');
    const collection = db.collection('VisitorData');
    collection
      .find()
      .toArray()
      .then((results) => {
        res.render('index.ejs', { users: results });
      })
      .catch((error) => {
        res.redirect('/');
      });
  });
});
app.post('/users', (req, res) => { 
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('VisitorInfo');
      const collection = db.collection('VisitorData');
      collection.insertOne(req.body).then(() => {
          res.redirect('/');
      }).catch(() => {
          res.redirect('/');
      });
  });
}); 
app.post('/restaurant', (req, res) => { 
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('RestaurantData');
      const collection = db.collection('RestaurantData');
      collection.insertOne(req.body).then(() => {
          res.redirect('/');
      }).catch(() => {
          res.redirect('/');
      });
  });
}); 
app.delete('/users', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('VisitorInfo');
      const collection = db.collection('VisitorData');
      collection
          .deleteOne(req.body)
          .then(() => {
              res.json(`Deleted user`);
          })
          .catch(() => {
              res.redirect('/');
          });
  });
});

app.listen(port, () => { 
  console.log(`Server listening on port ${port}`); 
});