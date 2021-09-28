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
    const url = req.body.long_url;
    const token = '4c6e039b4d2997fd42d972d39715b945180f2369';


    var getGroupId = (() => {
        var _groupId = null;
        return async () => {
            if (_groupId == null) {
                var response = await axios.get('https://api-ssl.bitly.com/v4/groups', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response);
            }
            return _groupId;
        }
    });
    await getGroupId();
    // var response = await axios.get('https://api-ssl.bitly.com/v4/groups?organization_guid=Oa1bcd234eF')
    // console.log(response.groups.guid)
    
    // let shortUrl = await axios.get("https://api-ssl.bitly.com/v4/shorten")
    // return shortUrl;
    res.status(200).send('a');
})

app.listen('8081', () => console.log('server started'))