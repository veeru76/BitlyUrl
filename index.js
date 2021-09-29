const axios = require('axios').default;;
const express = require("express");
const bodyParser = require('body-parser');
const app = express();


// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/shorten', async (req, res) => {
    const token = 'efc4bec11bcabbb0d361c0966d2f2f9b362c8b1b';

    // get group id
    var getGroupId = (() => {
        var _groupId = null;
        return async () => {
            if (_groupId == null) {
                var response = await axios.get('https://api-ssl.bitly.com/v4/groups', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                _groupId = response.data.groups[0].guid;
            }
            return _groupId;
        }
    })();
    
    // get shorten url
    var group_guid = await getGroupId();
    var postData = {
      long_url: req.body.url,
       group_guid: group_guid
    };
    
    var response = await axios.post('https://api-ssl.bitly.com/v4/shorten', postData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    res.status(200).send({
      shorten_url: response.data.link
    });
})

app.listen('8081', () => console.log('server started'))
