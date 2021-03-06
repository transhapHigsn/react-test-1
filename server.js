const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var pusher = new Pusher({
  appId: 'App_id',
  key: 'App_key',
  secret: 'App_secret',
  cluster: 'App_Cluster',
  encrypted: true
});

app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req, res) => {
  console.log(req.body)
  const payload = req.body;
  pusher.trigger('presence-chat', 'message', payload);
  res.send(payload)
});

var userId = 0

app.post('/pusher/auth', function(req,res) {
  console.log(req.body)
  console.log("Inside auth " + req.body.channel_name  + req.body.socket_id)
  var socketId = req.body.socket_id
  var channel = req.body.channel_name

  var presenceData ={
    user_id: userId,
    user_info: {
      name: req.body.name
    }
  }
  var auth = pusher.authenticate(socketId, channel, presenceData)
  userId += 1
  res.send(auth)
})

app.listen(app.get('PORT'), () =>
  console.log('Listening at ' + app.get('PORT')))
