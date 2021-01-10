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
      // Looping over js objects array ; 
	   json.forEach( (item) => {
		console.log(item.login) ;
	       namelist += item.login + " " + "," ;  	
	   })
		res.json(namelist) ; 
     }) 	
});


// ENDPOINT for repos fetching route by organisation name passed as dynamic query by user  ; 
app.get('/api/findrepos' , (req , res) => {
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
          console.log("Repository list") ; 
     // updated fetch method with for-each loop over json array 
	
        json.forEach( (val) => {
		console.log(val.name) ;
	       myjson += val.name  + " " + " , " ;  	
	   })

		res.json(myjson) ; 
	}) 
	  .catch(function(error){
              res.send("Entered Repository does'nt exist in the database !! "); 
 }) ;  
	} 
}); 

 let port = 5000; 
app.listen(port, () => { 
     console.log("Server is up and running ..." +port);  
}) 


