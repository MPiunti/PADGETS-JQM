//var serviceURL = "http://localhost/directory/services/";

var serviceURL = "http://where.yahooapis.com/v1/";

var appId = "CQ4A0PrV34HySShcdReYzp07vLl6ZmyYeZfC3QKLr8nNP8WsAWFZVBcSjb1C4YJFP3HawM.g5zrE._eRDKmc2UI4anv7uxo-";
var queryPlace = "Rom";

var lois;

$('#woePage').bind('pageinit', function(event) {
	getWoE();
});

function getWoE() {
	$.getJSON(serviceURL + 'places.q(\''+ queryPlace  +'\')?appid=' + appId, function(data) {
		$('#woeList li').remove();
		lois = data.places;
		console.log('places: '+ lois);
		$.each(lois, function(index, item) {
			console.log(item);
			$('#woeList').append('<li>'+
			'<h4>' + item[0].country + '  ' + item[0].locality1 + '</h4>' +
				'<a href="/?id=' + item[0].name + '">' +
					'<h4>Where On Earth Id: ' + item[0].woeid + '</h4>' +					
					'<p>' + item[0].admin1 + '</p>'+
					'<span class="ui-li-count">' + item[0].woeid + '</span> </a></li>' );
		});
		$('#woeList').listview('refresh');
	});
}