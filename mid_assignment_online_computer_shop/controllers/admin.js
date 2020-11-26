const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get("/", (req, res) => {
    if(req.session.user){
        if(req.session.user[0].userType === 'admin'){
            res.send("logged in as admin");
        }
        else{
            res.redirect('/admin/login');
        }
    }
    else{
        res.redirect('/admin/login');
    }
});

router.get('/login', (req, res) => {
    if(req.session.user){
        if(req.session.user[0].userType === 'admin'){
            res.redirect('/');
        }
    }
    else{
        var successMessage = req.query.success;
        var errorMessage = req.query.error;
        res.render('admin/login', {success: successMessage, error: errorMessage});
    }
});

router.post('/login', (req, res)=>{
	var user = {
        uid: req.body.uid,
        password: req.body.password,
    }
    console.log(user);
    userModel.validateAdmin(user, function(gotUser){
        if (gotUser){
            req.session.user = gotUser;
            console.log("logged in");
            res.redirect("/admin");
        }
        else{
            res.redirect('/admin/login?error=' + encodeURIComponent("Wrong username and/or password"));
        }
    });
});

router.get('/signup', (req, res)=>{
    var user={};
    if(req.session.user){
        res.redirect("/");
    }
    else{
        var successMessage = req.query.success;
        var errorMessage = req.query.error;
        res.render('admin/signup', {success: successMessage, error: errorMessage, user: user});	
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
        userType: "admin",
    }
    console.log(JSON.stringify(user));

    userModel.getByEmail(user, function(result){
        if(result.length > 0){
            res.redirect('/admin/signup?error=' + encodeURIComponent('This email is taken!'));
        }
        else{
            userModel.getByUsername(user, function(result){
                if(result.length > 0){
                    res.redirect('/admin/signup?error=' + encodeURIComponent('This username is taken!'));
                }
                else{
                    userModel.insert(user, function(status){
                        if(status == true){
                            res.redirect('/admin/login?success=' + encodeURIComponent('Account created! Please login with your email/username and password'));
                        }
                        else{
                            res.redirect('/admin/signup?error='  + encodeURIComponent('Your account could not be created. Please try again later'));
                        }
                    });
                }
            })
        }
    });
});

module.exports = router;