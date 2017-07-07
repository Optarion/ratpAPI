document.addEventListener('DOMContentLoaded',function(){

	function connectionError(message) {
		this.name = 'connectionError';
		this.message = message || 'The API server seems offline or you made a bad request';
		this.stack = (new Error()).stack;
	}
	connectionError.prototype = Object.create(Error.prototype);
	connectionError.prototype.constructor = connectionError;

	function getSchedules(url) {
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			try{
				if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
					if (xmlhttp.status === 200) {
						var data = JSON.parse(xmlhttp.response);
							lineId = defaultLineId,
							lineType = capitalizeWords(defaultLineType), //TODO : Find why function doesn't work
							station = defaultStationSlug,
							schedules = data.result.schedules;
						
						//ADD {line}/{station} as breadcrumb
						document.querySelector(".breadcrumb-station").innerHTML = station;
						document.querySelector(".breadcrumb-busline").innerHTML = lineType + ' ' + lineId;

						document.getElementById("nextSchedule").innerHTML = schedules[0]["message"];
						document.getElementById("otherSchedule").innerHTML += lineType + " in " + schedules[1]["message"];
					}
					else {
						throw new connectionError("The API server seems offline or you made a bad request");
					}
				}
			}
			catch (e) {
				if(e.name == 'connectionError') {
					document.querySelector(".error").css("display", "block").innerHTML = 'Un problème technique empèche d\'obtenir les horaires désirés';
				}
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

	try{
		var defaultLineType = "bus",
			defaultLineId = "83",
			defaultStationSlug = "ponscarme",
			defaultWay = "A",
			defaultURL = buildURL(defaultLineType, defaultLineId, defaultStationSlug, defaultWay);

		//Default display
		getSchedules(defaultURL);

	} 
	catch (e) {
		console.error(e.message);
	}
})