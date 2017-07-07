function capitalizeWords(string) {
	try{
		string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
	}catch (e){
		console.error(e);
	} finally{
		return string;
	}
}

/**
 * buildURL returns the URL builded from its parameters
 * @param {String} lineType
 * @param {String} lineId
 * @param {String} stationSlug
 * @param {String} lineWay
 * @return {String} buildedURL
*/
function buildURL(lineType, lineId, stationSlug, lineWay) {
	var buildedURL = "";

	var args = [...arguments], //Create a new array from arguments 'special object'
		argsAreOk = true; 

	args.forEach(function(element){
		if(typeof element != "string" || !element.length){
			throw new TypeError("buildURL : argument " + args.indexOf(element) + " must be a non empty string");
			argsAreOk = false;
		}
	});

	if(argsAreOk){
		var baseURL = "https://api-ratp.pierre-grimaud.fr/v3/schedules";

		buildedURL = baseURL + "/" + lineType + "/" + lineId + "/" + stationSlug + "/" + lineWay;
	}

	return buildedURL;
}