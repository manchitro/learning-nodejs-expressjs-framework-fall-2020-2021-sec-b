const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/create', (req, res)=>{
	res.render('user/create'); 
})

router.post('/create', (req, res)=>{

	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	});

	connection.connect(function(err) {
		if (err) {
		console.error('error connecting: ' + err.stack);
		return;
		}	 
		console.log('connected as id ' + connection.threadId);
	});

	var uname = req.body.username;
	var pass = req.body.password;
	var email = req.body.email;
	var dept = req.body.dept;

	var sql = "INSERT INTO user(username, password, email, dept) VALUES ('"+ uname +"','"+ pass +"','"+ email +"','"+ dept +"')";

	connection.query(sql, function (err, result) {
		if (err){
			throw err;
		}

		console.log("1 record inserted");
	  });

	//res.send('posted');
	res.redirect('/home/userlist'); 
})


router.get('/edit/:id', (req, res)=>{

	var data = req.params.id;
	//res.send(data);
	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	});

	connection.connect(function(err) {
		if (err) {
		console.error('error connecting: ' + err.stack);
		return;
		}	 
		console.log('connected as id ' + connection.threadId);
	});

	sql = "select * from user where id = '" + data + "'";

	connection.query(sql, function (error, results) { 
		if(results.length > 0 ){
			var user ={
				id: results[0].id,
				username: results[0].username,
				password: results[0].password,
				email: results[0].email,
				dept: results[0].dept,
			};	

			console.log(user);

			res.render('user/edit', user);
	  	}else{
		  res.redirect('/home/userlist');
	  	}
  });

})


router.post('/edit/:id', (req, res)=>{

	var uname = req.body.username;
	var email = req.body.email;
	var pass = req.body.password;
	var dept = req.body.dept;

	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	});

	connection.connect(function(err) {
		if (err) {
		console.error('error connecting: ' + err.stack);
		return;
		}	 
		console.log('connected as id ' + connection.threadId);
	});

	sql = "UPDATE user SET username='"+uname+"',password='"+pass+"',email='"+email+"',dept='"+dept+"' WHERE id='"+req.params.id+"'";

	connection.query(sql, function (error, results) { 
		if (error){
			throw error;
		}

		console.log("1 record updated");
  	});

	res.redirect('/home/userlist');
})

router.get('/delete/:id', (req, res)=>{
	var data = req.params.id;
	//res.send(data);
	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	});

	connection.connect(function(err) {
		if (err) {
		console.error('error connecting: ' + err.stack);
		return;
		}	 
		console.log('connected as id ' + connection.threadId);
	});

	sql = "select * from user where id = '" + data + "'";

	connection.query(sql, function (error, results) { 
		if(results.length > 0 ){
			var user ={
				id: results[0].id,
				username: results[0].username,
				password: results[0].password,
				email: results[0].email,
				dept: results[0].dept,
			};	

			console.log(user);

			res.render('user/delete', user);
	  	}else{
		  res.redirect('/home/userlist');
	  	}
  });
})

router.post('/delete/:id', (req, res)=>{
	
	//delete from DB
	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	});

	connection.connect(function(err) {
		if (err) {
		console.error('error connecting: ' + err.stack);
		return;
		}	 
		console.log('connected as id ' + connection.threadId);
	});

	sql = "delete from user where id='"+req.params.id+"'";

	connection.query(sql, function (error, results) { 
		if(error) throw error;
	  });

	res.redirect('/home/userlist');
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
