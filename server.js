const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fetch = require('node-fetch') ; 
// const mysql = require('mysql');
 // for express based rate limiting ; 
//   const ratelim = require("express-rate-limit") ; 

 let orgs ; // list of organisation names ; 
app.use(bodyParser.json());


// api home page route 
app.get('/api/home' , (req , res) => {
    console.log("Welcome Git Repository listing API") ;
    res.send("Welcome Git Repository listing API")  
});	
// function getdata(){  
//})
app.get('/api/orgnames' , (req , res) => {
     // console.log("Welcome Git Repository listing API") ;
      //  res.send(organisations)     
   // general organisations listing; 
     let i = 0 ; let temp = "" ;
fetch('https://api.github.com/organizations')
	.then(response => response.json())
	.then(json => {
	    // console.log("Success fetching the data"); 
     //  myJSON = JSON.stringify(json);
	  	orgs = json.parse(json) ;        
	   
})
     res.send(orgs) ; 	
});
let temp = "" ; 
// repos fetching route by organisation name ; 
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
                     let final_url = 'https://api.github.com/orgs/' +par + '/repos' ;  
		 // document.write("List of Repositeries are : "); 	
       let myjson = "" ; 
		fetch(final_url)
		 .then(response => response.json())
		  .then(json => {
		   //  res.send(json);  
           //  myjson = JSON.stringify(json) ; 
        //   ; let i = 0 ; 
              // res.send(json.array.length) ;

	  for(var i = 0; i < json.length; i++) {
		    var obj = json[i];
		    myjson += obj.name + " " + "  " ; 
		    console.log("Repository list") ; 
		    console.log(obj.name);
		}	

		// consol.log(temp) ; 
		res.send(myjson) ; 
	})
	    //   res.send(myjson) ; 
       console.log(temp) ; 
	} 
}); 

 let port = 5000; 
app.listen(port, () => { 
     console.log("Server is up and running ..." +port);  
}) 
