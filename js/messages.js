/**
 *http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/1/message/?sid=test_user&from=0
 */

var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";


var Comments_URL;
var sessionId, cid;

var msg_count_URL = 'http://195.251.166.71:8080/PadgetsREST-web/resources/campaign' ;//[campaign_id]/messagecount/?sid=';

$('#messagesPage').live('pageshow', function(event) {
	
	console.log( "Message page script BEGIN :  " );
	
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];

	//campaignDetailURL = "cdetail.html?sessionId="+sessionId+"&cid=";

	var s_url = Campaigns_APIURL+"/"+cid+"/message/?sid="+sessionId+'&from=0';

	console.log( "calling message service url:  " + s_url);
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extract(data);
	    });
});


	
	
function extract(data) {
			//alert("extracting: " + data.exampleType);
			var messagesJSON = eval(data);			
			console.log( " Data: " + messagesJSON );		
			console.log('messages n: '+ messagesJSON.count);
			$('#cmessageList li').remove();
			if(messagesJSON.length>0) {
				$.each(messagesJSON, function(index, message) {
					console.log('message (' +index+ '): ' + message.content);
	
					if(message!= null){
						
						$.each(message.publisheditems, function(index, msg_smp) {
						
							var comment_page = 'comments.html?mid='+msg_smp.idPublishedItem+'&cid'+cid+'&sessionId='+sessionId;
							var count = 'x';
							
											
							$('#messageList').append('<li><a href="'+ comment_page + '">' + message.content +
							 + '  '+ msg_smp.idPublishChannel.name+'  ' + msg_smp.idPublishChannel.network
							 + '<span class="ui-li-count">  ' + count + '</span> </a></li>' );
						});
					}
				});
			} //campaignsJSON.length>0
			$('#messageList').listview('refresh');
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