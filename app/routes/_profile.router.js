// ```
// _expense.router.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _expense.router.js may be freely distributed under the MIT license
// ```

// */app/routes/_expense.router.js*

// # Recipe API object

// HTTP Verb  Route                   Description

// GET        /api/expense             Get all of the expenses
// GET        /api/expense/:expense_id  Get a single expense by expense id
// POST       /api/expense             Create a single expense
// DELETE     /api/expense/:expense_id  Delete a single expense
// PUT        /api/expense/:expense_id  Update a expense with new info

// Load the `expense` model
import Profile from '../models/expense.model';

export default (app, router, auth) => {

  // ## Expense API Routes

  // Define routes for the `expense` API

  router.route('/profile')

    // ### Create a `expense`

    // Accessed at POST http://localhost:8080/api/expense

    // Create a `expense`
    .post(auth, (req, res) => {
          Profile.create( {

            name : req.body.name,

            avatar : req.body.avatar,

            description : req.body.description,

            birthdate : req.body.birthdate,

            user: req.body.user,

          }, (err, profile) => {

            if (err)
              res.send(err);

            // DEBUG
            console.log(`Profile created: ${profile}`);

            // return the new `expense` to our front-end
            res.json(profile);
          });
    })

    // ### Get all of the `expenses`

    // Accessed at GET http://localhost:8080/api/expense
    .get(auth, (req, res) => {
        console.log('user:', req.user);
      //auth(req, res);
      Profile.find({ "user": req.user._id },(err, profile) => {
        if(err)
          res.send(err);
        else
          res.json(profile);
      });
      // Use mongoose to get all expenses in the database
    });

  router.route('/profile/:profile_id')

    // ### Get a `expense` by ID

    // Accessed at GET http://localhost:8080/api/expense/:expense_id
    .get(auth, (req, res) => {
          // Use mongoose to fetch a single `expense` by id in the database
          Expense.findOne(req.params.expense_id, (err, profile) => {

            if(err)
              res.send(err);

            else
              res.json(profile);
          });
    })

    // ### Update a `expense` by ID

    // Accessed at PUT http://localhost:8080/api/expense/:expense_id
    .put(auth, (req, res) => {

      // use our `expense` model to find the `expense` we want
      Profile.findOne({

        '_id' : req.params.profile_id

        }, (err, profile) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          profile.name = req.body.name;

        if (req.body.description)
            profile.description = req.body.description;

        if (req.body.avatar)
          profile.avatar = req.body.avatar;

        if (req.body.user)
          profile.user = req.body.user;

        if (req.body.birthdate)
          profile.birthdate = req.body.birthdate;

        // save the `expense`
        return profile.save((err) => {

          if (err)
            res.send(err);

          return res.send(profile);

        });
      });
    })

    // ### Delete a `expense` by ID

    // Accessed at DELETE http://localhost:8080/api/expense/:expense_id
    .delete(auth, (req, res) => {

      // DEBUG
      console.log(`Attempting to delete expense with id: ${req.params.profile_id}`);

      Profile.remove({

        _id : req.params.profile_id
        }, (err, profile) => {

        if(err)
          res.send(err);

        else
          console.log('Profile successfully deleted!');

        Profile.find((err, profile) => {
          if(err)
            res.send(err);

          res.json(profile);
        });
      });
    });
};
