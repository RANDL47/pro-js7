const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('./public'))

app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const cart = JSON.parse(data);
      cart.contents.push(req.body);
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

app.put('/api/cart/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const cart = JSON.parse(data);
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      find.quantity += req.body.quantity;
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

const port = 5555;
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
