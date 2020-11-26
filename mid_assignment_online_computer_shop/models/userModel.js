const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where (username='"+user.uid+"' or email='"+user.uid+"') and password='"+user.password+"'";
		//console.log(sql);
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	validateAdmin: function(user, callback){
		var sql = "select * from users where (username='"+user.uid+"' or email='"+user.uid+"') and password='"+user.password+"' and userType='admin'";
		//console.log(sql);
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getByEmail: function(email, callback){
		var sql = "SELECT * FROM users WHERE email='"+email+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getByUsername: function(username, callback){
		var sql = "SELECT * FROM users WHERE username='"+username+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById: function(id, callback){
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllCustomer: function(callback){
		var sql = "select * from users WHERE type='Customer'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
        var sql = "INSERT INTO users(fullName, username, email, password, phoneNo, userType, address, createdAt) VALUES ('"+user.fullName+"', '"+user.username+"', '"+user.email+"', '"+user.password+"', '"+user.phone+"', '"+user.userType+"', '"+user.address+"', current_timestamp())";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update:function(sql, callback){
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}