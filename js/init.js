document.addEventListener('DOMContentLoaded',function(){

function connectionError(message) {
  this.name = 'connectionError';
  this.message = message || 'The API server seems offline or you made a bad request';
  this.stack = (new Error()).stack;
}
connectionError.prototype = Object.create(Error.prototype);
connectionError.prototype.constructor = connectionError;

	try{
		function loadXMLDoc(url) {
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
					if (xmlhttp.status == 200) {
						var data = JSON.parse(xmlhttp.response),
							response = data.response,
							responseInfo = response.informations,
							lineId = responseInfo.line,
							lineType = capitalizeWords(responseInfo.type), //TODO : Find why function doesn't work
							station = responseInfo.station.name,
							schedules = response.schedules,
							schedulesArray = Object.keys(schedules).map(function(k) { return schedules[k]; });
						
						//ADD {line}/{station} as breadcrumb
						document.querySelector(".breadcrumb-station").innerHTML = station;
						document.querySelector(".breadcrumb-busline").innerHTML = lineType + ' ' + lineId;

						document.getElementById("nextSchedule").innerHTML = schedulesArray[0]["message"];
						document.getElementById("otherSchedule").innerHTML += lineType + " in " + schedulesArray[1]["message"];
					}
					else {
						throw new connectionError("The API server seems offline or you made a bad request");
						document.getElementByClassName("error").innerHTML = 'Un problème technique empèche d\'obtenir les horaires désirés';
					}
				}
			};

			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		}

	//Default display
	loadXMLDoc('https://api-ratp.pierre-grimaud.fr/v2/bus/83/stations/4008?destination=248');

	//TODO: make function to construct url
	} catch (e) {
		console.error(e);
	}
})