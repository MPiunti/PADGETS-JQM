/**
 * http://195.251.166.71:8080/PadgetsREST-web/resources/message/[message_id]/comment/?sid=test_user&from=[from]
 */

var Message_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/message";

var sessionId, cid;

$('#commentsPage').live('pageshow', function(event) {
	
	console.log( "COmments page script BEGIN :  " );
	
	mid = getUrlVars()["mid"];
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];



	var s_url = Message_APIURL+"/"+mid+"/comment/?sid="+sessionId+'&from=0';

	console.log( "calling comments service url:  " + s_url);
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extract(data);
	    });
});


	
	
function extract(data) {
	
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
									
						$('#commentsList').append('<li>'+comment.content
										+' <br/> '+comment.network+
						                +' <br/> '+comment.authorName+'</li>' );
					}
				});
			} //commentssJSON.length>0
			$('#commentList').listview('refresh');
	}
	



function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}