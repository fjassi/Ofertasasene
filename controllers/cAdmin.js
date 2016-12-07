var conn = require('../config/db').conn;

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getAdmin: getAdmin
}

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

function getLogin(req, res){
	//console.log('ADENTRO DE GET LOGIN')
	res.render('login',{
		pagename: 'Login',
		errors: req.session.errors,
	});
}

function getAdmin(req, res){
	res.render('admin/admin');
}

function postLogin(req, res){
	//console.log('ADENTRO DE POST LOGIN')
	var form = req.body;
	console.log(form)
	if (form.nombre && form.password){
		conn("select * from secr where nombre = rtrim('"+ form.nombre +"')", function (user){
			user = user[0];
			console.log(user)
			if (user) {
				if (user.password === form.password) {
					// req.session.user = null;
					req.session.user = user;
					req.session.auth = true;

					date = new Date()
					day = date.getDate();
					if (day<10)
						day = "0"+day;
					month = (date.getMonth() + 1);
					if (month<10)
						month = "0"+month;
					date = date.getFullYear() + '/' + month + '/' +  day;
					req.session.user.horaLogin = date;

					res.redirect("/inicio");
				}else{
					res.render('error', {
						error: "Usuario o Contraseña incorrectos."
					});
				}
			}else{
				res.render('error', {
					error: "Usuario o Contraseña incorrectos."
				});
			}
		});
	} else {
		req.session.errors = 'Campos obligatorios.';
		res.redirect('/');
	}
}

function entreFechas (alta, baja) {
	if ( new Date(alta).getTime() < new Date().getTime() ) {
		if ( new Date(baja).getTime() > new Date().getTime() ) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}