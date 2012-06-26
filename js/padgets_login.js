/**
 * (c)Reply Whitehall
 * 		PADGETS European Project - Padgets.eu
 * 		Mobile Web Front End 
 * 			developed by Michele Piunti on May-Decemner 2012
 */

//var url_redirect = "http://rapidminersrv.aegean.gr:8080";
var url_redirect = "http://127.0.0.1:8020";

$(document).ready(function() {
    $("#login_submit").click(function(event) {
        event.preventDefault();
        var credentials = { type: 'EMAIL', username: $('#login_username').val(), password: $('#login_password').val() };
        console.log( "login: " + credentials );
        $.ajax({
            type: "PUT",
            url: "api/auth",
            cache: false,
            data: JSON.stringify(credentials),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                //validate the response here, set variables... whatever needed
                    //and if credentials are valid, forward to the next page
                console.log(data);
                $.mobile.changePage($('campaigns.html'));
                    //or show an error message
            },
            error: function() { // server couldn't be reached or other error 
            }
        });
    });
    
    
    $("#facebookLink").click(function(event) {
    	var url_base = "http://rapidminersrv.aegean.gr:8088/padgets/login?provider=facebook&redirectUrl=";
		var strLink = url_base + url_redirect + "/Padgets-JQM/campaigns.html";				
    	this.setAttribute("href",strLink);   	
    });
    
    $("#googleLink").click(function(event) {
    	var url_base = "http://rapidminersrv.aegean.gr:8088/padgets/login?provider=google&redirectUrl=";
		var strLink = url_base + url_redirect + "/Padgets-JQM/campaigns.html";				
    	this.setAttribute("href",strLink);   	
    });
    
    
    $("#twitterLink").click(function(event) {
    	var url_base = "http://rapidminersrv.aegean.gr:8088/padgets/login?provider=twitter&redirectUrl=";
		var strLink = url_base + url_redirect + "/Padgets-JQM/campaigns.html";				
    	this.setAttribute("href",strLink);   	
    });
});