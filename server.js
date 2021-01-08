const express = require('express') ; 
const app = express();
const fetch = require('node-fetch') ; 
// const mysql = require('mysql');
 // for express based rate limiting ; 
//   const ratelim = require("express-rate-limit") ; 

 let orgs ; // list of organisation names ; 
 // app.use(bodyParser.json());
// api home page route 
app.get('/api/home' , (req , res) => {
    res.send("Git Repository listing API")  
});	

// API endpoint for listing out the organisations name ; 
app.get('/api/orgnames' , (req , res) => {
    let namelist = "" ;  // for storing final list of strings  

     fetch('https://api.github.com/organizations')
		 .then(response => response.json())
		  .then(json => {
 
	  for(var i = 0; i < json.length; i++) {
		     var obj = json[i];
		     namelist += json[i].login + " " ; 
		    console.log(obj.login);
		}	
		res.send(namelist) ; 
	}) 	
});


// ENDPOINT for repos fetching route by organisation name passed as dynamic query by user  ; 
app.get('/api/findrepos' , (req , res) => {
   console.log("Repository list") ; 
    if(!req.query.orgname){ 
	     res.send({ 
			error: 'Provide organisation name to fetch the data' 
		})
	}

	else{	
		var par = req.query.orgname ; 
   		console.log("Organisation name entered " + req.query.orgname);
   	 	   //  res.send("Success") 
               //       let final_url = 'https://api.github.com/orgs/' +par + '/repos' ;  
    //   let myjson = "" ; 
                     let final_url = 'https://api.github.com/orgs/' +par + '/repos' ; 

       let myjson = "" ;  // to store list of repositires associated with the organisation as string ; 
		fetch(final_url)
		 .then(response => response.json())
		  .then(json => {
		   //  res.send(json);  
           //  myjson = JSON.stringify(json) ; 
        //   ; let i = 0 ; 
              // res.send(json.array.length) ;


        //   ; let i = 0 
	  for(var i = 0; i < json.length; i++) {
		     var tempobj = json[i];
		    myjson += json[i].name + " " ; 
		    console.log(tempobj.name);
		}	

		// consol.log(temp) ; 

		res.send(myjson) ; 
	}) 

         // console.log(temp) ; 
	} 
}); 

 let port = 5000; 
app.listen(port, () => { 
     console.log("Server is up and running ..." +port);  
}) 


