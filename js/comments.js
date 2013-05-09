/**
 * (c)Reply Whitehall
 * 		PADGETS European Project - Padgets.eu
 * 		HTML5 + JQuery Mobile Web Front End 
 * 			developed by Michele Piunti on May-Decemner 2012
 */



/**
 * http://195.251.166.71:8080/PadgetsREST-web/resources/message/[message_id]/comment/?sid=test_user&from=[from]
 */

var Message_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/message";

var sessionId, cid;

$('#commentsPage').ready(function(event) {
	
	console.log( "Comments page script BEGIN :  " );
	
	mid = getUrlVars()["mid"];
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];

	var s_url = Message_APIURL+"/"+mid+"/comment/?sid="+sessionId+'&from=0';

	console.log( "calling comments service url:  " + s_url);
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extractComments(data);
	    });
});


	
	
function extractComments(data) {
	
			//alert("extracting: " + data.exampleType);
			var commentsJSON = eval(data);			
			console.log( " Data: " + commentsJSON );		
			console.log('messages n: '+ commentsJSON.count);
			$('#commentList li').remove();
			if(commentsJSON.length>0) {
				$.each(commentsJSON, function(index, comment) {
					console.log('commnet (' +index+ '): ' + comment.content);
	
					if(comment!= null){
						var comment_url = '?sid='+sessionId;
						var count = 'x';
									
						$('#commentList').append('<li>'+comment.content
										+' - '+comment.network+
						                +' - '+comment.authorName+'</li>' );
					}
				});
			} //commentssJSON.length>0
			$('#commentList').listview('refresh');
	}
	

