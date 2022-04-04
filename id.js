const express = require("express");
const app = express();
const port = process.env.PORT || 4000
app.get("/HealthCheck",async(req,res)=> {
	
	let username = req.body.username;
	let password = req.body.password;
	
	if (username && password) {
		
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password],(error, results)=> {
			if (error) throw error;
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.listen(port,()=>{
    console.log("Start")
})