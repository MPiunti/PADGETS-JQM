/**
 * (c)Reply Whitehall
 * 		PADGETS European Project - Padgets.eu
 * 		HTML5 + JQuery Mobile Web Front End 
 * 			developed by Michele Piunti on May-Decemner 2012
 */


var User_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/user";
var sessionId;

$('#udetailsPage').ready(function(event) {
	//console.log ('ciao: ' + event );
	sessionId = getUrlVars()["sessionId"];
	
	if  ( sessionId === 'undefined'
		   || sessionId === 'read_user')  {	
		   	$('#about').html("<strong>PADGETS</strong> is a three-year STREP project co-funded by the EU under the 7th Framework"+ 
		   	"programme in the domain of ICT for eGovernance and Policy Modelling.<br/><br/>"+
		   	"<a href='http://www.padgets.eu/'>Padgets.eu</a>");	
		   	$('#userabout').html("About");	
	} else {
		var s_url = User_APIURL+"?sid="+sessionId;
		//var woeid = 722347;
		 $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        displayUser(data);
	     });		
		
	}

});


function displayUser(data) {
	var userJSON = eval(data);	

		$('#username').text(userJSON.username  );
		$('#name').text(userJSON.firstname + " " + userJSON.lastname);
		$('#email').html("<a href='mailto:" +userJSON.email+"'>"+userJSON.email+ "</a>" );
			
		if(! typeof userJSON.organization === 'undefined')
		  $('#organization').html("Organization:  <i>"+ userJSON.organization+"</i>"  );
		$('#viewlanguage').text(userJSON.viewLanguage );
		$('#age').text(userJSON.age );

}

