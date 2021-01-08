const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fetch = require('node-fetch') ; 
app.use(bodyParser.json());

// api home page route 
app.get('/api/home' , (req , res) => {
    console.log("Welcome Git Repository listing API") ;
    res.send("Welcome Git Repository listing API")  
});	
// function getdata(){  
//})
app.get('/api/orgnames' , (req , res) => {  
   // general organisations listing; 
      //  code ..
     
})
     res.send(orgs) ; 	
});
let temp = "" ; 

// repos fetching route by organisation name passed as dynamic query by user  ; 
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

       let myjson = "" ;  // to store list of repositires associated with the organisation as string ; 
		fetch(final_url)
		 .then(response => response.json())
		  .then(json => {
		
        //   ; let i = 0 ;
	  for(var i = 0; i < json.length; i++) {
		    let tempobj = json[i];
		    myjson += tempobj.name + " " + "  " ; 
		    console.log("Repository list") ; 
		    console.log(obj.name);
		}	
 
		res.send(myjson) ; 
	})

         // console.log(temp) ; 
	} 
}); 

 let port = 5000; 
app.listen(port, () => { 
     console.log("Server is up and running ..." +port);  
}) 
