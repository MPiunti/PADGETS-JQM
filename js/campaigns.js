var APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";
var campaignDetailURL;
var userId,sessionId;

$('#campaignsPage').live('pageshow', function(event) {
	userId = getUrlVars()["userId"];
	sessionId = getUrlVars()["sessionId"];
	campaignDetailURL = "cdetail.html?userId="+userId+"&sessionId="+sessionId+"&cid=";
	console.log("query 4: " + userId + " and sessionId: " + sessionId);
	getCampaigns();
});

function getCampaigns() {
	$.getJSON( APIURL+"?sid="+sessionId+'&callback=?' , function(data) {
		$('#campaignList li').remove();
		console.log( " Data: " + data );
		campaigns = eval(data);
		console.log('campaigns n: '+ campaigns.count);
		$.each(campaigns, function(index, campaign) {
			console.log('campaign: ' + campaign.title);

			if(campaign!= null){
				$('#campaignList').append('<li>'+
				'<h4>' + campaign.title + '</h4>' +
				
				'<a href="'+ campaignDetailURL + campaign.idCampaign + '">' +
					'<span class="ui-li-count">' + campaign.title + '</span> </a></li>' );
				}

		});
		$('#campaignList').listview('refresh');
	});
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