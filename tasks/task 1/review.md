### file [auth.js](https://github.com/vinsdragonis/Project-Nexus/blob/main/api/routes/auth.js)
 
# issue:
when receiving user data from req.body there is no validation, which can lead to the introduction of sql injection, you need to add data validation
```sh
// REGISTER
router.post('/register', async (req, res) => {
    try {
        console.log(req); 
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        // res.status(500).json(err);
    }
});
```
# proposed recommendations:
Data validation is required . For example, using the library [Joi.js](https://www.npmjs.com/package/joi)

# What can be improved:
All routes, can be modified midlewares, which will act as an authorization mechanism and protect routes from unauthorized access

> repository: https://github.com/vinsdragonis/Project-Nexus
