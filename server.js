const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var pusher = new Pusher({
  appId: '458477',
  key: '22ae6b2c4ce1da757a39',
  secret: '9c6e63301a9525c682f1',
  cluster: 'ap2',
  encrypted: true
});

app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('chat', 'message', payload);
  res.send(payload)
});

app.listen(app.get('PORT'), () =>
  console.log('Listening at ' + app.get('PORT')))
