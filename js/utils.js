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
 * @param {String} station
 * @param {String} destination
 * @return {String} buildedURL
*/
function buildURL(lineType, lineId, station, destination) {
	try {
		var args = [...arguments], //Create a new array from arguments 'special object'
			argsAreOk = true; 

		args.forEach(function(element){
			if(typeof element != "string" || !element.length){
				throw new TypeError("buildURL : argument " + args.indexOf(element) + " must be a non empty string");
				argsAreOk = false;
			}
		});

		if(argsAreOk){
			var baseURL = "https://api-ratp.pierre-grimaud.fr/v2/",
				params = [],
				buildedURL;

			if(destination != null && parseInt(destination, 10)) {
				params["destination"] = destination;
			}
			
			buildedURL = baseURL + lineType + "/" + lineId + "/stations/" + station;

			if(Object.keys(params).length) {
				buildedURL += "?";

				for (key in params) {
					buildedURL += key + "=" + params[key];
				}
			}				
		}
	} catch (e) {
		console.error(e.message);
	} finally {
		return buildedURL;
	}
}