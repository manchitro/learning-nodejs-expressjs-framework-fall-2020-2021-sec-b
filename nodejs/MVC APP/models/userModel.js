const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(){

	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(){
		var sql = "update user SET username='"+user.username+"' , password='"+user.password+"' , type='"+user.type+"' , email='"+user.email+"'";

		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(){
		var sql = "delete from user where id='"+user.id+"'";

		db.execute(sql, function(status){
			callback(status);
		});
	}
}