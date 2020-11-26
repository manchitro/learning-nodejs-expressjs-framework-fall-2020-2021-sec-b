const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get("/", (req, res) => {
    var user={};
    if(req.session.user){
        user = req.session.user[0];
    }
    console.log(user);
    res.render("customer/index", {user: user});
});

router.get('/login', (req, res)=>{
    var user={};
    if(req.session.user){
        res.redirect("/");
    }
    else{
        var successMessage = req.query.success;
        var errorMessage = req.query.error;
        res.render('customer/login', {success: successMessage, error: errorMessage, user: user});	
    }
});

router.post('/login', (req, res)=>{
	var user = {
        uid: req.body.uid,
        password: req.body.password,
    }
    console.log(user);
    userModel.validate(user, function(gotUser){
        if (gotUser){
            req.session.user = gotUser;
            console.log("logged in");
            res.redirect("/");
        }
        else{
            res.redirect('/login?error=' + encodeURIComponent("Wrong username and/or password"));
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/signup', (req, res)=>{
    var user={};
    if(req.session.user){
        res.redirect("/");
    }
    else{
        var successMessage = req.query.success;
        var errorMessage = req.query.error;
        res.render('customer/signup', {success: successMessage, error: errorMessage, user: user});	
    }	
});

router.post('/signup', (req, res)=>{
    var user = {
        fullName : req.body.fullName,
        username : req.body.username,
        email : req.body.email,
        phone : req.body.phone,
        address: req.body.address,
        password: req.body.password,
        userType: "customer",
    }
    console.log(JSON.stringify(user));

    userModel.getByEmail(user, function(result){
        if(result.length > 0){
            res.redirect('/signup?error=' + encodeURIComponent('This email is taken!'));
        }
        else{
            userModel.getByUsername(user, function(result){
                if(result.length > 0){
                    res.redirect('/signup?error=' + encodeURIComponent('This username is taken!'));
                }
                else{
                    userModel.insert(user, function(status){
                        if(status == true){
                            res.redirect('/login?success=' + encodeURIComponent('Account created! Please login with your email/username and password'));
                        }
                        else{
                            res.redirect('/signup?error='  + encodeURIComponent('Your account could not be created. Please try again later'));
                        }
                    });
                }
            })
        }
    });
});

module.exports = router;