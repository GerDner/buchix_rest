// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data/db'); // connect to our database
var person = require('./app/models/person');
var week = require('./app/models/week');
var type = require('./app/models/type');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

//person.collection.drop()
//week.collection.drop()
//type.collection.drop()
// on routes that end in /persons
// ----------------------------------------------------
router.route('/people')

// create a person (accessed at POST http://localhost:8080/persons)
.post(function(req, res) {
    var newperson = new person(); // create a new instance of the person model
	newperson.name = req.body.person.name; // set the persons name (comes from the request)
	newperson.lastname = req.body.person.lastname;
	newperson.handy = req.body.person.handy;
	newperson.phone = req.body.person.phone;
	newperson.mail = req.body.person.mail;
	newperson.type = req.body.person.type;
    newperson.weeks = req.body.person.weeks;
	newperson.save(function(err) {
        if (err)
            res.send(err);

        res.json({
			person: newperson
        });
    });


})

// get all the persons (accessed at GET http://localhost:8080/api/persons)
.get(function(req, res) {
    person.find(function(err, persons) {
        if (err)
            res.send(err);

        res.json({person: persons});
    });
});

// on routes that end in /persons/:person_id
// ----------------------------------------------------
router.route('/people/:person_id')

// get the person with that id
.get(function(req, res) {
    person.findById(req.params.person_id, function(err, person) {
        if (err)
            res.send(err);
        res.json({person:person});
    });
})

// update the person with this id
.put(function(req, res) {
    person.findById(req.params.person_id, function(err, person) {

        if (err)
            res.send(err);

			person.name = req.body.person.name; // set the persons name (comes from the request)
			person.lastname = req.body.person.lastname;
			person.handy = req.body.person.handy;
			person.phone = req.body.person.phone;
			person.mail = req.body.person.mail;
            var weeks = [];
            req.body.person.weeks.forEach(function(item){
                weeks.push(item._id);
            })
            person.weeks = weeks;
			person.type = req.body.person.type;
        person.save(function(err) {
            if (err)
                res.send(err);

            res.json({
				person: person
            });
        });

    });
})

// delete the person with this id
.delete(function(req, res) {
    person.remove({
        _id: req.params.person_id
    }, function(err, person) {
        if (err)
            res.send(err);

        res.json({

        });
    });
});


// on routes that end in /weeks
// ----------------------------------------------------
router.route('/weeks')

// create a week (accessed at POST http://localhost:8080/weeks)
.post(function(req, res) {

    var newWeek = new week(); // create a new instance of the week model
	newWeek.kw = req.body.week.kw;
	newWeek.year = req.body.week.year;
	newWeek.mo = req.body.week.mo;
	newWeek.di = req.body.week.di;
	newWeek.mi = req.body.week.mi;
	newWeek.do = req.body.week.do;
	newWeek.fr = req.body.week.fr; // set the weeks name (comes from the request)
	newWeek.sa = req.body.week.sa;
	newWeek.so = req.body.week.so;
	newWeek.person = req.body.week.person;



	newWeek.save(function(err) {
        if (err)
            res.send(err);

        res.json({
			week: newWeek
        });
    });


})

// get all the weeks (accessed at GET http://localhost:8080/api/weeks)
.get(function(req, res) {
    week.find(function(err, weeks) {
        if (err)
            res.send(err);

        res.json({week: weeks});
    });
});

// on routes that end in /weeks/:person_id
// ----------------------------------------------------
router.route('/weeks/:person_id')

// get the week with that id
.get(function(req, res) {
    week.findById(req.params.person_id, function(err, week) {
        if (err)
            res.send(err);
        res.json({week:week});
    });
})

// update the week with this id
.put(function(req, res) {
    week.findById(req.params.person_id, function(err, week) {

        if (err)
            res.send(err);

			week.kw = req.body.week.kw;
			week.year = req.body.week.year;
			week.mo = req.body.week.mo;
			week.di = req.body.week.di;
			week.mi = req.body.week.mi;
			week.do = req.body.week.do;
			week.fr = req.body.week.fr; // set the weeks name (comes from the request)
			week.sa = req.body.week.sa;
			week.so = req.body.week.so;
			week.person = req.body.week.person;
        week.save(function(err) {
            if (err)
                res.send(err);

            res.json({
				week: week
            });
        });

    });
})

// delete the week with this id
.delete(function(req, res) {
    week.remove({
        _id: req.params.person_id
    }, function(err, week) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });
});







// on routes that end in /types
// ----------------------------------------------------
router.route('/types')

// create a type (accessed at POST http://localhost:8080/types)
.post(function(req, res) {

    var newtype = new type(); // create a new instance of the type model
	newtype.value = req.body.value; // set the types name (comes from the request)
	newtype.save(function(err) {
        if (err)
            res.send(err);

        res.json({
			type: newtype
        });
    });


})

// get all the types (accessed at GET http://localhost:8080/api/types)
.get(function(req, res) {
    type.find(function(err, types) {
        if (err)
            res.send(err);

        res.json({type: types});
    });
});

// on routes that end in /types/:person_id
// ----------------------------------------------------
router.route('/types/:person_id')

// get the type with that id
.get(function(req, res) {
    type.findById(req.params.person_id, function(err, type) {
        if (err)
            res.send(err);
        res.json({type:type});
    });
})

// update the type with this id
.put(function(req, res) {
    type.findById(req.params.person_id, function(err, type) {

        if (err)
            res.send(err);

        type.value = req.body.type.value;
        type.person = req.body.type.person;
        type.save(function(err) {
            if (err)
                res.send(err);

            res.json({
				type: type
            });
        });

    });
})

// delete the type with this id
.delete(function(req, res) {
    type.remove({
        _id: req.params.person_id
    }, function(err, type) {
        if (err)
            res.send(err);

        res.json({

        });
    });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
