function capitalizeWords(string) {
	return string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
}

/**
 * buildURL returns the URL builded from its parameters
 * @param {String} lineType
 * @param {String} lineId
 * @param {String} stationSlug
 * @param {String} lineWay
 * @return {String} : The builded URL
*/
function buildURL(lineType, lineId, stationSlug, lineWay) {
	var baseURL = "https://api-ratp.pierre-grimaud.fr/v3/schedules";
	var args = [...arguments]; //Create a new array from arguments 'special object' 

	args.forEach(function(element){
		if(typeof element != "string" || !element.length){
			throw new TypeError("buildURL : argument " + element + " must be a non empty string");
		}
	});


	return baseURL + "/" + lineType + "/" + lineId + "/" + stationSlug + "/" + lineWay;
}