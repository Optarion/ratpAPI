// TODO: WORK ON SYNC/ASYN ERROR HANDLING

try {
	document.addEventListener('DOMContentLoaded',function(){

		function ConnectionError(message) {
			this.name = 'ConnectionError';
			this.message = message || 'The API server seems offline or you made a bad request';
			this.stack = (new Error()).stack;
		}
		ConnectionError.prototype = Object.create(Error.prototype);
		ConnectionError.prototype.constructor = ConnectionError;

		function getSchedules(url) {
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function() {
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
					} else {
						throw new ConnectionError("The API server seems offline or you made a bad request");
					}
				} 
			};

			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		}

		var defaultLineType = "bus",
			defaultLineId = "83",
			defaultStationSlug = "ponscarme",
			defaultWay = "A",
			defaultURL = buildURL(defaultLineType, defaultLineId, defaultStationSlug, defaultWay);

		//Default display
		getSchedules(defaultURL);
	})
} catch(e) {
	if(e.name == 'ConnectionError') {
		document.querySelector(".error").css("display", "block").innerHTML = 'Un problème technique empèche d\'obtenir les horaires désirés';
	}
}