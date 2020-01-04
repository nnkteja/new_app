// Metadata API
var express = require('express');
var request = require('request')
var http = require('http');
var allowedOrigins = ['http://localhost:4080'];

var router = express.Router();
const ep = "https://books.zoho.com/api/v3/contacts";

router.get('/get_info', function(req, res) {
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');

    var acceptEncoding = req.headers['accept-encoding'];
    if (acceptEncoding && acceptEncoding.match(/(deflate|gzip)/)) {
        res.header('Transfer-Encoding', 'gzip, chunked');
    }

    var options = {
        uri: ep + '?organization_id=' + 'tobefilled',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'tobefilled'
        }
    }

    request.get(options, function (err, response, body) {
        if(response.statusCode === 200) {
            res.status(200).send({
                "status": 200,
                "response": {
                    "data": JSON.parse(body)
                }
            });
        } else {
            res.sendStatus(response.statusCode)
        }
    });
});

module.exports = router;
