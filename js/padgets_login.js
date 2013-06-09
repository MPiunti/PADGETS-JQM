/**
 * (c)Reply Whitehall
 * 		PADGETS European Project - Padgets.eu
 * 		HTML5 + JQuery Mobile Web Front End 
 * 			developed by Michele Piunti on May-Decemner 2012
 */

//var url_redirect = "http://rapidminersrv.aegean.gr:8080";
var url_redirect = "http://"+location.host;

$(document).ready(function() {

    $("#citizenLink").on("click", function(event) {
    	//var url_base = "http://rapidminersrv.aegean.gr:8088/Padgets-JQM/campaigns.html";
		var strLink = url_redirect + "/Padgets-JQM/querycampaigns.html";				
    	//this.setAttribute("href",strLink);  
    	window.location.href = strLink;	
    });

    
    $("#facebookLink").on("click", function(event) {
    	var url_base = "http://rapidminersrv.aegean.gr:8088/padgets/login?provider=facebook&redirectUrl=";
		var strLink = url_base + url_redirect + "/Padgets-JQM/campaigns.html";				
    	//this.setAttribute("href",strLink);  
    	window.location.href = strLink;	
    });
    
    $("#googleLink").on("click", function(event) {
    	var url_base = "http://rapidminersrv.aegean.gr:8088/padgets/login?provider=google&redirectUrl=";
		var strLink = url_base + url_redirect + "/Padgets-JQM/campaigns.html";				
    	//this.setAttribute("href",strLink);   	
    	window.location.href = strLink;
    });
    
    
    $("#twitterLink").on("click", function(event) {
    	var url_base = "http://rapidminersrv.aegean.gr:8088/padgets/login?provider=twitter&redirectUrl=";
		var strLink = url_base + url_redirect + "/Padgets-JQM/campaigns.html";				
    	//this.setAttribute("href",strLink);   	
    	window.location.href = strLink;
    });
});