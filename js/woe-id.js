var APIURL = "http://where.yahooapis.com/v1/";
var appId = "CQ4A0PrV34HySShcdReYzp07vLl6ZmyYeZfC3QKLr8nNP8WsAWFZVBcSjb1C4YJFP3HawM.g5zrE._eRDKmc2UI4anv7uxo-";

var queryPlace, places, serviceURL; 




$('#woePage').live('pageshow', function(event) {
	queryPlace = getUrlVars()["name"];
	console.log("query for: " + queryPlace );
	serviceURL = APIURL + 'places.q(\''+ queryPlace  +'\');start=0;count=18?appid=' + appId;
	getWoE();
});

function getWoE() {
	$.getJSON( serviceURL , function(data) {
		$('#woeList li').remove();
		places = data.places;
		console.log('places n: '+ places.count);
		$.each(places, function(index, item) {
			//console.log('item:' + item);
			
			$.each(item, function(index2, place) {
				//console.log('places:' + item);
				if(place!= null){
				$('#woeList').append('<li>'+
				'<h4>' + place.country + ' - ' + place.name + '</h4>' +
				'<h4>Where On Earth Id: ' + place.woeid + '</h4>' +					
					'<p>' + place.locality1 + '  ' + place.admin1 + '</p>'+
					'<a href="detail.html?woeid=' + place.woeid + '">' +
					'<span class="ui-li-count">' + place.woeid + '</span> </a></li>' );
				}
			});
		});
		$('#woeList').listview('refresh');
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