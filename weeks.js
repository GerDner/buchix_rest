
// on routes that end in /types
// ----------------------------------------------------
router.route('/types')

    // create a type (accessed at POST http://localhost:8080/types)
    .post(function(req, res) {

        var type = new type();		// create a new instance of the type model
        type.name = req.body.name;  // set the types name (comes from the request)

        type.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'type created!' });
        });


    })

    // get all the types (accessed at GET http://localhost:8080/api/types)
    .get(function(req, res) {
        type.find(function(err, types) {
            if (err)
                res.send(err);

            res.json(types);
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
            res.json(type);
        });
    })

    // update the type with this id
    .put(function(req, res) {
        type.findById(req.params.person_id, function(err, type) {

            if (err)
                res.send(err);

            type.name = req.body.name;
            type.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'type updated!' });
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

            res.json({ message: 'Successfully deleted' });
        });
    });
