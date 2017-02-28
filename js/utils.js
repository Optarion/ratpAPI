function capitalizeWords(string) {
	try{
		string.replace(/\b\w/g, function(l){ return l.toUpperCase() });
	}catch (e){
		console.error(e);
	} finally{
		return string;
	}
}