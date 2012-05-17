$('#detailsPage').live('pageshow', function(event) {
	//console.log ('ciao: ' + event );
	var woeid = getUrlVars()["woeid"];
	//var woeid = 722347;
	var serviceURL = APIURL + 'place/' + woeid + '?appid=' + appId;
	console.log (serviceURL);
	$.getJSON(serviceURL, displayPlace );
});

function displayPlace(data) {
	var place = data.place;
	console.log('place:' + place.name);
	$('#woeid').text("Where on hearth ID: " + place.woeid);
	$('#placeTypeName').text(place.placeTypaName);
	$('#name').text(place.name);
	$('#country').text(place.country);
	$('#admin1').text(place.admin1);
	$('#admin2').text(place.admin2);
	$('#admin3').text(place.admin3);
	$('#locality1').text("Locality: " + place.locality1);
	$('#locality2').text(place.locality2);
	$('#postal').text(place.postal);
	
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


