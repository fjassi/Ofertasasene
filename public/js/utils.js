module.exports = {
	generateTodayDateYMD: generateTodayDateYMD,
	changeDate: changeDate,
    changeDate2: changeDate2,
    MaysPrimera: MaysPrimera
}

function generateTodayDateYMD () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    today = today.getFullYear() + '-' + month + '-' + day;
    return today;
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
	return fechaus;
	// output: yyyy-mm-dd
}

function changeDate2(date){
    // input: yyyy/mm/dd
    fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
    return fechaus;
    // output: dd/mm/yyyy
}

//mayus primera letra
function MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}