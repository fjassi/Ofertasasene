// ONKEYPRESS NO ANDA, USAR ONKEYDOWN

function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}//onKeyPress="return soloNumeros(event)"

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function changeDate2(date){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	return fechaus;
	// output: dd/mm/yyyy
}

function changeDate3(date){
    // input: dd/mm/yyyy
    fechaus = date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
    return fechaus;
    // output: yyyy-mm-dd
}

function Numy1Punto(e, field) {
	key = e.keyCode ? e.keyCode : e.which
	// backspace
	if (key == 8) return true
	// 0-9
	if (key > 47 && key < 58) {
    	if (field.value == "") return true
    	regexp = /.[0-9]{2}$/
    	return !(regexp.test(field.value))
    	}
    	// .
    	if (key == 46) {
    	if (field.value == "") return false
    	regexp = /^[0-9]+$/
    	return regexp.test(field.value)
	}
	// other key
	return false
}//onkeypress="return Numy1Punto(event, this)"

function checkDec(el){
	var ex = /^[0-9]+\.?[0-9]*$/;
	if(ex.test(el.value)==false){
	   	el.value = el.value.substring(0,el.value.length - 1);
	}
}//i cant remember what this does

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}// onkeypress='validate(event)'

function Validate7EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
            	// dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{7}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate7EntY2Dec(event,this)"

function Validate7EntY2Dec_Neg(e, field) {// ^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{7}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[+-]?[0-9]{7}\\.[0-9]{2}$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate7EntY2Dec_Neg(event,this)"

function Validate8EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{8}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate8EntY2Dec(event,this)"

function Validate10EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{10}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate10EntY2Dec(event,this)"

function lettersOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
        // alert("Enter letters only.");
        return false;
    }
    return true;
}//onkeypress="return lettersOnly(event)"

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}//onkeypress="return isNumber(event)"

function isNumberKey(evt){
    var e = evt || window.event; //window.event is safer, thanks @ThiefMaster
    var charCode = e.which || e.keyCode;                        
    if (charCode > 31 && (charCode < 47 || charCode > 57))
        return false;
    if (e.shiftKey) return false;
        return true;
}//onkeypress="return isNumberKey(event)"

// PARA EL SWIG CUANDO SE USA CON AJAX EN LAS VISTAS
function parseSwig(input, data) {
    var output = swig.render(input, { locals: {
        data: data
    }});

    return output;
}

function generateTodayDate(){
    var myDate = new Date();
    year = myDate.getFullYear(); 
    day = myDate.getDate();
    if (day<10)
        day = "0"+day;
    month = myDate.getMonth()+1;
    if (month<10)
        month = "0"+month
    myDate = day + "/" + month + "/" + year;
    return myDate;
}

function Validate6EntY1Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{1}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{6}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate6EntY1Dec(event,this)"

function generateTodayDateYMD () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    today = today.getFullYear() + '-' + month + '-' + day;
    return today;
}

function generateTodayDateDMY () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    today = day + '/' + month + '/' + today.getFullYear();
    return today;
}

function checkDateLessToday (date) {
    var fecha = new Date(date);
    var fecha_hoy = new Date();

    if (fecha > fecha_hoy) {
        return false;
    } else {
        return true;
    }
}

function generateFirstDateActualMonth () {
    var desdeSet = new Date();
    var mes = desdeSet.getMonth() + 1;

    if (mes < 10) { mes = '0' + mes }

    desdeSet = '01/' + mes + '/' + desdeSet.getFullYear();
    
    return desdeSet;
}

function addtime(start_time, end_time){
    var startArr = start_time.split(':');
    var endArr = end_time.split(':');
    
    startArr[0] = (startArr[0]) ? parseInt(startArr[0], 10) : 0;
    startArr[1] = (startArr[1]) ? parseInt(startArr[1], 10) : 0;

    endArr[0] = (endArr[0]) ? parseInt(endArr[0], 10) : 0;
    endArr[1] = (endArr[1]) ? parseInt(endArr[1], 10) : 0;

    var hours = startArr[0] + endArr[0];
    var add_hr = 0;
    var minutes = startArr[1] + endArr[1];

    if (minutes > 59){
        x = minutes/60;
        add_hr = Math.floor(x);
        hours = hours + add_hr;
        final_min = x - add_hr;
        minutes = final_min*60;
        minutes = Math.ceil(minutes);
    }

    if (hours < 10)
        hours = "0"+hours;

    if (minutes < 10)
        minutes = "0"+minutes;

    return hours+':'+minutes;
}

function addtime_clock(start_time, end_time){
    var startArr = start_time.split(':');
    var endArr = end_time.split(':');
    
    var d = new Date();
    startArr[0] = (startArr[0]) ? parseInt(startArr[0], 10) : 0;
    startArr[1] = (startArr[1]) ? parseInt(startArr[1], 10) : 0;
    // startArr[2] = (startArr[2]) ? parseInt(startArr[2], 10) : 0;
    endArr[0] = (endArr[0]) ? parseInt(endArr[0], 10) : 0;
    endArr[1] = (endArr[1]) ? parseInt(endArr[1], 10) : 0;
    // endArr[2] = (endArr[2]) ? parseInt(endArr[2], 10) : 0;

    d.setHours(startArr[0] + endArr[0]);
    d.setMinutes(startArr[1] + endArr[1]);
    // d.setSeconds(startArr[2] + endArr[2]);

    var hours = d.getHours();
    var minutes = d.getMinutes();
    // var seconds = d.getSeconds();
    if (hours < 10)
        hours = "0"+hours;

    if (minutes < 10)
        minutes = "0"+minutes;
    // return hours+':'+minutes+'.'+seconds+'hrs';
    return hours+':'+minutes;
}

function Validate6EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{6}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate6EntY2Dec(event,this)"

//mayus primer letra
function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Validate3EntY1Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{1}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{3}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onkeypress="return Validate3EntY1Dec(event,this)"

function getDateOfWeek(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
    return new Date(y, 0, d);
}

function getDateOfWeekTXT(w, y) {
    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
    var nd = new Date(y, 0, d);
    console.log(nd)
    var month = nd.getMonth();
    console.log(month)
    switch(month){
        case 0:
            m = "Enero";
            break;
        case 1:
            m = "Febrero";
            break;
        case 2:
            m = "Marzo";
            break;
        case 3:
            m = "Abril";
            break;
        case 4:
            m = "Mayo";
            break;
        case 5:
            m = "Junio";
            break;
        case 6:
            m = "Julio";
            break;
        case 7:
            m = "Agosto";
            break;
        case 8:
            m = "Septiembre";
            break;
        case 9:
            m = "Octubre";
            break;
        case 10:
            m = "Noviembre";
            break;
        case 11:
            m = "Diciembre";
            break;
        default: 
            m = "error";
            break;
    }

    return m+' '+nd.getFullYear();
}