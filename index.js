var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.port || 5000;
var router = express.Router();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/db_aheerdoctor');
mongoose.connect('mongodb://naveedaheer:123456@ds129723.mlab.com:29723/db_naveedaheer')

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log("requesting something using router");
    next();
})


var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
        personalizations: [
            {
                to: [
                    {
                        email: 'naveedbhai2015@gmail.com'
                    }
                ],
                subject: 'Hello World Email sent by SendGrid'
            }
        ],
        from: {
            email: 'naveedaheer@gmail.com'
        },
        content: [
            {
                type: 'text/plain',
                value: 'this is testing email content. naveedaheer.com'
            }
        ]
    }
});


sg.API(request, function (error, response) {
    if (error) {
        console.log("Error in response");
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);


})

router.get('/', function (req, res) {
    res.json({ response: 'Hello World! welcome to aheer API, naveedaheer.com' });
});

app.use(router);
app.listen(port);
console.log('Server is running on port : ' + port);