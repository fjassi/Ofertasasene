const cIndex        = require('./controllers/cIndex');
const cAdmin        = require('./controllers/cAdmin');
const cComercios    = require('./controllers/cComercios');
const cCategorias       = require('./controllers/cCategorias');
const cCategoriasGrupos = require('./controllers/cCategoriasGrupos');
const cProductos      = require('./controllers/cProductos');
const cImage        = require('./controllers/cImage');

function logout (req, res) {
	console.log(req.cookies);
	fecha = new Date();
	day = fecha.getDate();
	month = fecha.getMonth();
	if (day<10)
		day = "0" + day;
	if (month<10)
		month = "0" + month;
	fecha = fecha.getFullYear() + "/"+month+"/"+day+" "+fecha.getHours()+":"+fecha.getMinutes()
	// mEventos.add(req.session.user.unica, fecha, "Logout", "", function(){
		req.session.destroy(function (err) {
			console.log("session destroyed executed")
			if (!err){
				res.clearCookie('connect.sid', { path: '/' });
		 		res.redirect('/');
		 	}else{
		 		console.log(err);
		 	}
		});	
	// });	
}

// Verifica que este logueado
function auth (req, res, next) {
	if (req.session.auth) {
		return next();
	} else {
		res.redirect('/')
	}
}

function acceso (req, res, next){
	var id_usuario = req.session.user.unica;
	var id_menu = req.session.user.id_menu;
	var accion = req.session.user.accion;

	if (id_menu != 00 && id_menu != 1 && id_menu != 43 && id_menu != 44 && id_menu != 45 ){
		mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
			if (user[0].tiene_permiso){
				next();
			}else{
				mAccesos.verificarAcceso(id_usuario, id_menu, accion, function (acceso){
					console.log(acceso)
					if (accion == "c")
						var acceso = acceso[0].c;

					if (accion == "a")
						var acceso = acceso[0].a;

					if (accion == "m")
						var acceso = acceso[0].m;

					if (accion == "b")
						var acceso = acceso[0].b;

					var acciontxt = "";
					if (acceso == 1){
						next();
					}else{
						var nombre_usuario = req.session.user.usuario;
						if (accion == 'a'){
							acciontxt = "al Alta";
						}else{
							if (accion == 'b'){
								acciontxt = "a dar de Baja";
							}else{
								if (accion == 'm'){
									acciontxt = "a Modificar";
								}else{
									if (accion == 'c'){
										acciontxt = "a Consultar";
									}else{
										console.log("asd");
									}
								}
							}
						}
						mAyuda.getAyuda(id_menu, function (ayuda){
							res.render("error", {
								error: nombre_usuario+": No tiene acceso "+acciontxt+" en el menú id "+id_menu+" llamado '"+ayuda[0].titulo+"'"
							});
						});
					}
				});
			}
		});
	}else{
		switch (id_menu){
			case '00':
				mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
					if (user[0].tiene_permiso){
						next();
					}else{
				        mAccesos.VerificarNivelProgramador(id_usuario, function (user){
							if (user[0].tiene_permiso){
								next();
							}else{
								mAyuda.getAyuda(id_menu, function (ayuda){
									var nombre_usuario = req.session.user.usuario;
									res.render("error", {
										error: nombre_usuario+": No tiene acceso al modulo Interno para programadores."
									});
								});
							}
						});
					}
				});
				break;
		    case '1':
		    	// usuarios
		    	mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
					if (user[0].tiene_permiso){
						next();
					}else{
				        mAccesos.VerificarNivelClaves(id_usuario, function (user){
							if (user[0].tiene_permiso){
								next();
							}else{
								mAyuda.getAyuda(id_menu, function (ayuda){
									var nombre_usuario = req.session.user.usuario;
									res.render("error", {
										error: nombre_usuario+": No tiene acceso al modulo de Usuarios."
									});
								});
							}
						});
					}
				});
		        break;
		    case '43':
		    case '44':
		    case '45':
			    mAccesos.VerificarNivelSupervisor(id_usuario, function (user){
					if (user[0].tiene_permiso){
						next();
					}else{
				        mAccesos.VerificarNivelAdministracion(id_usuario, function (user){
							if (user[0].tiene_permiso){
								next();
							}else{
								mAyuda.getAyuda(id_menu, function (ayuda){
									var nombre_usuario = req.session.user.usuario;
									res.render("error", {
										error: nombre_usuario+": No tiene acceso al modulo de Administracion."
									});
								});
							}
						});
				    }
				});
		        break;
		    default:
		        res.render("error", {
					error: "Error inesperado por favor reportelo para que llegue a los programadores."
				});
		}
	}
}

module.exports = function(app) {
	app.get('/', cAdmin.getLogin);
	app.get('/login', cAdmin.getLogin)
	app.post('/login', cAdmin.postLogin);
	app.get('/logout', logout);
	app.get('/inicio', auth, cIndex.getInicio);
	app.get('/error', cIndex.getError);
	app.post('/updatemenuinfo/:id_menu/:accion', auth, cIndex.updateMenuInfo);
	//comercios
		app.get("/comercios_lista", auth, cComercios.getLista);
		app.get("/comercios_alta", auth, cComercios.getAlta);
		app.post("/comercios_alta", auth, cImage.subirmulti, cComercios.postAlta);
		app.get("/comercios_modificar/:id", auth, cComercios.getModificar);
		app.post("/comercios_modificar", auth, cImage.subirmulti, cComercios.postModificar);
		app.get("/comercios_borrar/:id", auth, cComercios.getDel);
	//productos
		app.get("/productos_lista/:id_comercio", auth, cProductos.getLista);
		app.get("/productos_alta/:id_comercio", auth, cProductos.getAlta);
		app.post("/productos_alta", auth, cImage.subir, cProductos.postAlta);
		app.get("/productos_modificar/:id", auth, cProductos.getModificar);
		app.post("/productos_modificar", auth, cImage.subir, cProductos.postModificar);
		app.get("/productos_borrar/:id", auth, cProductos.getDel);
	//categorias
		app.get('/categorias_lista', auth, cCategorias.getLista);
		app.get('/categorias_alta', auth, cCategorias.getAlta);
		app.post('/categorias_alta', auth, cImage.subir, cCategorias.postAlta);
		app.get('/categorias_modificar/:id', auth, cCategorias.getModificar);
		app.post('/categorias_modificar', auth, cImage.subir, cCategorias.postModificar);
		app.get('/categorias_borrar/:id', auth, cCategorias.getDel);
		app.get('/getCategoriasPorGrupo/:id_grupo', auth, cCategorias.getCategoriasPorGrupo);
	//grupos de Categorias
		app.get('/categoriasgrupos_lista', auth, acceso, cCategoriasGrupos.getLista);
		app.get('/categoriasgrupos_alta', auth, acceso, cCategoriasGrupos.getAlta);
		app.post('/categoriasgrupos_alta', auth, cCategoriasGrupos.postAlta);
		app.get('/categoriasgrupos_modificar/:id', auth, acceso, cCategoriasGrupos.getModificar);
		app.post('/categoriasgrupos_modificar', auth, cCategoriasGrupos.postModificar);
		app.get('/categoriasgrupos_borrar/:id', auth, acceso, cCategoriasGrupos.getDel);
};