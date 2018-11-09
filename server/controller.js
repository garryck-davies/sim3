const bcrypt = require('bcryptjs');


module.exports = {

    async register(req, res) {
        /*
          1. check db for existing username
            a. if exists, send error message
          2. generate salt and hash
          3. insert into db
          4. put user data on session
          5. send back 200 w/ with data
        */
        let { username, password } = req.body;
        let db = req.app.get('db');
        let foundUser = await db.find_user([username]);
        if (foundUser[0]) return res.status(200).send('Username already in use.')
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let [createdUser] = await db.create_user([username, hash]);
        req.session.users = {username:createdUser.username};
        res.status(200).send({status: 'logged in'});
      },

      async login(req, res) {
        /*
        1. check to make sure a user has the username from req.body
            a. if not, send back proper message
        2. compare the pasword using comapareSync
            a. if incorrect, send proper message
        3. put logged in user on req.session
        4. send proper status
          */
        let { username, password } = req.body;
        let db = req.app.get('db');
        let [foundUser] = await db.find_user([username]);
            if (foundUser) {
                // compareSync returns either true or false
                let result = bcrypt.compareSync(password, foundUser.user_hash)
                if (result) {
                    req.session.user = { username: foundUser.user_username };
                    res.status(200).send({message: 'logged in'})
                } else {
                    res.status(401).send({message: 'Incorrect password.'});
                }
            } else {
                res.status(401).send({message: 'User not found.'})
            }
      },

      userData(req, res) {
        if (req.session.user) {
          res.status(200).send(req.session.user);
        } else {
          res.sendStatus(401);
        }
    }
}
