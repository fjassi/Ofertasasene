const cIndex               = require('./controllers/cIndex');
const cUsuario             = require('./controllers/cUsuario');
const cAdmin               = require('./controllers/cAdmin');
const cAccesos             = require('./controllers/cAccesos');
// const cCargos           = require('./controllers/cCargos');
const cUmed                = require('./controllers/cUmed');
const cRubros              = require('./controllers/cRubros');
const cRubrosGrupos        = require('./controllers/cRubrosGrupos');
const cRepuestos           = require('./controllers/cRepuestos');
const cVehiculos           = require('./controllers/cVehiculos');
const cProveedores         = require('./controllers/cProveedores');
const cAgenda              = require('./controllers/cAgenda');
const cOtrosGastos         = require('./controllers/cOtrosGastos');
const cPlanillaDiaria      = require('./controllers/cPlanillaDiaria');
const cTank                = require('./controllers/cTank');
const cStockGasoilEnTanque = require('./controllers/cStockGasoilEnTanque');
const cConsumoxFechas      = require('./controllers/cConsumoxFechas');
const cCodigosIE           = require('./controllers/cCodigosIE');
const cIngegr              = require('./controllers/cIngegr');
const cFlujoDeFondos       = require('./controllers/cFlujoDeFondos');
const cConjunto            = require('./controllers/cConjunto');
const cEquipos             = require('./controllers/cEquipos');
const cHerramientas        = require('./controllers/cHerramientas');
const cVales               = require('./controllers/cVales');
const cReparaciones        = require('./controllers/cReparaciones');
const cRemitos             = require('./controllers/cRemitos');
const cSerenos             = require('./controllers/cSerenos');
const cNovedadesCoches     = require('./controllers/cNovedadesCoches');
const cOrdenesTrabajo      = require('./controllers/cOrdenesTrabajo');
const cFacturas            = require('./controllers/cFacturas');
const cKmxcoche            = require('./controllers/cKmxcoche');
const cMvto_Conjuntos      = require('./controllers/cMvto_Conjuntos');
const cStockDeConjuntos    = require('./controllers/cStockDeConjuntos');
const cAsistencia          = require('./controllers/cAsistencia');
const cConsumosxCoches     = require('./controllers/cConsumosxCoches');
const mEventos             = require('./models/mEventos');
const mAccesos             = require('./models/mAccesos');
const mAyuda               = require('./models/mAyuda');

// const cPruebaSQL = require('./controllers/cPruebaSQL');
const cRandom = require('./controllers/cRandom');

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
	mEventos.add(req.session.user.unica, fecha, "Logout", "", function(){
		req.session.destroy(function (err) {
			console.log("session destroyed executed")
			if (!err){
				res.clearCookie('connect.sid', { path: '/' });
		 		res.redirect('/');
		 	}else{
		 		console.log(err);
		 	}
		});	
	});	
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
	//ayuda
	app.get('/ayuda', cIndex.getAyuda);
	app.get('/ayudaver/:id', cIndex.AyudaVer);
	//novedades
		app.get('/novedades_lista', auth, acceso, cNovedadesCoches.getLista);
		app.get('/novedad_alta', auth, acceso, cNovedadesCoches.getAlta);
		app.post('/novedades_alta', auth, cNovedadesCoches.postAlta);
		app.get('/novedades_filtro/:desde/:hasta/:numero_coche/:sinreparar', auth, acceso, cNovedadesCoches.getFiltro);
		app.get('/novedades_ver/:id_novedad', auth, acceso, cNovedadesCoches.getNovedad);
		app.get('/novedades_eliminar/:id_novedad', auth, acceso, cNovedadesCoches.getDel);
		app.post('/novedades_setordentrabajo/:id_novedad/:nro_orden', auth, acceso, cNovedadesCoches.postNroOrden);
		app.post('/novedades_setno_ordentrabajo/:id_novedad', auth, acceso, cNovedadesCoches.postNoOrden);
		app.get('/novedades_modificar/:id_novedad', auth, acceso, cNovedadesCoches.getModificar);
		app.post('/novedades_modificar', auth, cNovedadesCoches.postModificar);
	//usuarios
		app.get('/usuarioslista', auth, acceso, cUsuario.getUsuarios);
		app.get('/usuariosalta', auth, acceso, cUsuario.getUsuariosAlta);
		app.post('/usuariosalta', auth, cUsuario.putUsuario);
		app.get('/usuariosmodificar/:id', auth, acceso, cUsuario.getUsuarioModificar);
		app.post('/usuariosmodificar', auth, cUsuario.postUsuarioModificar);
		app.get('/usuariosborrar/:id', auth, acceso, cUsuario.getDelUsuario);
	//configurar accesos
		app.get('/accesoslista/:id', auth, cAccesos.getAccesos);
		app.post('/accesoslista', auth, cAccesos.postAccesos);
		app.post("/updateacceso/:id_usuario/:id_menu/:acceso_short/:value", auth, cAccesos.updateAcceso);
	//unidades de medida "umed"
		app.get('/umedlista', auth, acceso, cUmed.getAllUmed);
		app.get('/umedalta', auth, acceso, cUmed.getAlta);
		app.post('/umedalta', auth, cUmed.postAlta);
		app.get('/umedmodificar/:id', auth, acceso, cUmed.getModificar);
		app.post('/umedactualizar', auth, cUmed.postModificar);
		app.get('/umedborrar/:id', auth, acceso, cUmed.getDelUmed);
	//rubros
		app.get('/rubroslista', auth, acceso, cRubros.getLista);
		app.get('/rubrosalta', auth, acceso, cRubros.getAlta);
		app.post('/rubrosalta', auth, cRubros.postAlta);
		app.get('/rubrosmodificar/:id', auth, acceso, cRubros.getModificar);
		app.post('/rubrosmodificar', auth, cRubros.postModificar);
		app.get('/rubrosborrar/:id', auth, acceso, cRubros.getDel);
		app.get('/getRubrosPorGrupo/:id_grupo', auth, cRubros.getRubrosPorGrupo);
	//grupos de rubros
		app.get('/rubrosgruposlista', auth, acceso, cRubrosGrupos.getLista);
		app.get('/rubrosgruposalta', auth, acceso, cRubrosGrupos.getAlta);
		app.post('/rubrosgruposalta', auth, cRubrosGrupos.postAlta);
		app.get('/rubrosgruposmodificar/:id', auth, acceso, cRubrosGrupos.getModificar);
		app.post('/rubrosgruposmodificar', auth, cRubrosGrupos.postModificar);
		app.get('/rubrosgruposborrar/:id', auth, acceso, cRubrosGrupos.getDel);
	//repuestos
		app.get('/repuestoslista', auth, acceso, cRepuestos.getLista);
		app.get('/repuestosalta', auth, acceso, cRepuestos.getAlta);
		app.post('/repuestosalta', auth, cRepuestos.postAlta);
		app.get('/repuestosmodificar/:id', auth, acceso, cRepuestos.getModificar);
		app.post('/repuestosmodificar', auth, cRepuestos.postModificar);
		app.get('/repuestosborrar/:id', auth, acceso, cRepuestos.getDel);
		app.get('/getCantRepuestosEnRubro/:id_rubro', auth, cRepuestos.getCantRepuestosEnRubroById);
		app.get('/repuestos_filtrar/:filtro/:paramA/:paramB', auth, cRepuestos.getFiltro);
		app.post('/repuestos_actualizarprecio', auth, cRepuestos.postUpdatePrecio);
	//vehiculos
		app.get('/vehiculoslista', auth, acceso, cVehiculos.getLista);
		app.get('/vehiculosalta', auth, acceso, cVehiculos.getAlta);
		app.post('/vehiculosalta', auth, cVehiculos.postAlta);
		app.get('/vehiculosmodificar/:id', auth, acceso, cVehiculos.getModificar);
		app.post('/vehiculosmodificar', auth, cVehiculos.postModificar);
		app.get('/vehiculosborrar/:id', auth, acceso, cVehiculos.getDel);
		app.get('/vehiculosver/:id', auth, acceso, cVehiculos.getVer);
		app.get("/vehiculos_verificarNumero/:numero", auth, cVehiculos.verificarNumero);
	//proveedores
		app.get('/proveedoreslista', auth, acceso, cProveedores.getLista);
		app.get('/proveedoresalta', auth, acceso, cProveedores.getAlta);
		app.post('/proveedoresalta', auth, cProveedores.postAlta);
		app.get('/proveedoresmodificar/:id', auth, acceso, cProveedores.getModificar);
		app.post('/proveedoresmodificar', auth, cProveedores.postModificar);
		app.get('/proveedoresborrar/:id', auth, acceso, cProveedores.getDel);
		app.get('/proveedoresver/:id', auth, cProveedores.getVer);
	//agenda
		app.get('/agendalista', auth, acceso, cAgenda.getLista);
		app.get('/agendaalta', auth, acceso, cAgenda.getAlta);
		app.post('/agendaalta', auth, cAgenda.postAlta);
		app.get('/agendamodificar/:id', auth, acceso, cAgenda.getModificar);
		app.post('/agendamodificar', auth, cAgenda.postModificar);
		app.get('/agendaborrar/:id', auth, acceso, cAgenda.getDel);
		app.get('/agendaupdatehecho/:id/:valor', auth, cAgenda.updateHecho);
	//otrosgastos
		app.get("/otrosgastoslista", auth, cOtrosGastos.getLista);
		app.get("/otrosgastosalta", auth, acceso, cOtrosGastos.getAlta),
		app.post("/otrosgastosalta", auth, cOtrosGastos.postAlta);
		app.get("/otrosgastosmodificar/:id", auth, acceso, cOtrosGastos.getModificar);
		app.post("/otrosgastosmodificar", auth, cOtrosGastos.postModificar);
		app.get("/otrosgastosborrar/:id", auth, acceso, cOtrosGastos.getDel);
	//combustibles - planilla diaria
		app.get("/planilladiarialista", auth, acceso, cPlanillaDiaria.getLista);
		app.get("/planilladiariaalta", auth, acceso, cPlanillaDiaria.getAlta);
		app.post("/planilladiariaalta", auth, cPlanillaDiaria.postAlta);
		app.get("/planilladiariamodificar/:id", auth, acceso, cPlanillaDiaria.getModificar);
		app.post("/planilladiariamodificar", auth, cPlanillaDiaria.postModificar);
		app.get("/planilladiariaborrar/:id", auth, acceso, cPlanillaDiaria.getDel);
		app.get("/getplanilladiariabyfecha/:fecha", auth, cPlanillaDiaria.getByFecha);
		app.get("/planilladiariaverfechascondatos", auth, cPlanillaDiaria.getVerFechasConDatos);
		app.get("/getplanilladiariadfechascondatos/:desde/:hasta", auth, cPlanillaDiaria.getFechasConDatos);
	//Tank - Carga gas oil a tanque
		app.get("/tanklista", auth, acceso, cTank.getLista);
		app.get("/tankalta", auth, acceso, cTank.getAlta);
		app.post("/tankalta", auth, cTank.postAlta);
		app.get("/tankmodificar/:id", auth, acceso, cTank.getModificar);
		app.post("/tankmodificar", auth, cTank.postModificar);
		app.get("/tankborrar/:id", auth, acceso, cTank.getDel);
		app.get("/gettankentrefechas/:desde/:hasta", auth, cTank.getTankEntreFechas);
	//consulta stock gasoil en tanque
		app.get("/stockgasoilentanque", auth, acceso, cStockGasoilEnTanque.getIndex);
		app.get("/getstock/:id_tanque/:fecha", auth, cStockGasoilEnTanque.getStock);
	//consulta consumo x fechas
		app.get("/consumoxfechas", auth, acceso, cConsumoxFechas.getIndex);
		app.get("/getconsumoentrefechas/:desde/:hasta", auth, cConsumoxFechas.getConsumoEntreFechas);
	//administracion - codigos ingreso egreso
		app.get("/codigosie_lista", auth, acceso, cCodigosIE.getLista);
		app.get("/codigosie_alta", auth, acceso, cCodigosIE.getAlta);
		app.post("/codigosie_alta", auth, cCodigosIE.postAlta);
		app.get("/codigosie_modificar/:id", auth, acceso, cCodigosIE.getModificar);
		app.post("/codigosie_modificar", auth, cCodigosIE.postModificar);
		app.get("/codigosie_borrar/:id", auth, acceso, cCodigosIE.getDel);
		app.get("/codigosie_print", auth, cCodigosIE.getPrint);
	//administracion - ingresos y egresos "ingegr"
		app.get("/ingegr_lista", auth, acceso, cIngegr.getLista);
		app.get("/ingegr_getDesdeHasta/:desde/:hasta", auth, cIngegr.getDesdeHasta);
		app.get("/ingegr_alta", auth, acceso, cIngegr.getAlta);
		app.post("/ingegr_alta", auth, cIngegr.postAlta);
		app.get("/ingegr_modificar/:id", auth, acceso, cIngegr.getModificar);
		app.post("/ingegr_modificar", auth, cIngegr.postModificar);
		app.get("/ingegr_borrar/:id", auth, acceso, cIngegr.getDel);
		app.get("/flujodefondos_index", auth, acceso, cFlujoDeFondos.getIndex);
		app.post("/flujodefondos_generacion", auth, cFlujoDeFondos.postGeneracion);
		app.get("/flujodefondos_generacion_excel/:anio/:mes", auth, cFlujoDeFondos.getGeneracion_Excel);
		app.get("/flujodefondos_informe_form", auth, cFlujoDeFondos.getInforme);
		app.post("/flujodefondos_informe_form", auth, cFlujoDeFondos.postInforme);
		app.get("/flujodefondos_getDataEntreFechas/:desde/:hasta/:codigo", auth, cFlujoDeFondos.getDatosEntreFechas);
	//CONJUNTOS: Definicion de Conjunto y Fichas de Conjunto
		app.get("/conjuntos_alta", auth, acceso, cConjunto.getAlta);
		app.get("/conjunto_buscar_repuesto_por_codigo/:codigo", auth, cConjunto.getBuscar_Repuesto_x_Codigo);
		app.get("/conjunto_buscar_repuesto_por_codigo_y_serie/:codigo/:serie", auth, cConjunto.getBuscar_Repuesto_x_Codigo_y_Serie);
		app.get("/conjunto_verificar_codigoyserie/:codigo/:serie", auth, cConjunto.getVerificar_CodigoySerie);
		// app.get("/conjunto_ficha_verificar_codigoyserie/:codigo/:serie", auth, cConjunto.getBuscar_ConjuntoFicha_x_CodigoySerie);
		app.post("/conjuntos_alta", auth, acceso, cConjunto.postAlta);
		app.get("/conjunto_buscarfichaxcodigo", auth, acceso, cConjunto.getBuscar_Ficha_x_Codigo);
		app.get("/conjunto_verficha/:codigo/:serie", auth, acceso, cConjunto.getVerFicha);
		app.get("/conjunto_definicion_buscarxcodigo/:codigo", auth, cConjunto.getBuscar_ConjuntoDefinicion_xCodigo);
		app.get("/conjunto_ficha_alta/:codigo/:serie", auth, acceso, cConjunto.getConjunto_Ficha_Alta);
		app.post('/conjunto_ficha_alta', auth, cConjunto.postConjuntoFicha_Alta);
		app.get("/conjunto_buscarfichaxlistado", auth, acceso, cConjunto.getBuscar_Ficha_x_Listado);
		app.get("/getFichasFiltro/:opcion/:codigo", auth, cConjunto.getFichas_x_Filtro);
		app.get("/conjunto_modificar/:id", auth, acceso, cConjunto.getModificar);
		app.post("/conjunto_modificar", auth, cConjunto.postModificar);
		app.get("/conjunto_borrar/:id", auth, acceso, cConjunto.getDel);
		app.get("/conjunto_ficha_modificar/:id", auth, acceso, cConjunto.getFicha_Modificar);
		app.post("/conjunto_ficha_modificar", auth, cConjunto.postFicha_Modificar);
		app.get("/conjunto_ficha_borrar/:id", auth, acceso, cConjunto.getFicha_Del);
		app.post("/conjunto_dardebaja/:id/:fecha_baja/:motivo_baja", auth, cConjunto.postBaja);
		app.post("/conjunto_dardealta/:id", auth, cConjunto.postRecuperarAlta);
		app.get("/conjunto_buscarxcoche", auth, acceso, cConjunto.getBuscarxCoche);
		app.post("/conjunto_buscarxcoche", auth, cConjunto.postBuscarxCoche);
		app.get("/conjunto_formacioncoche/:numero", auth, acceso, cConjunto.getFormacionCoche);
		app.get("/conjunto_checkFormacionNotNull/:numero", auth, cConjunto.getCheckFormacionNotNull);
		app.get("/conjunto_buscarneumaticoxcoche", auth, acceso, cConjunto.getNeumaticoCoche);
		app.post("/conjunto_buscarneumaticoxcoche", auth, cConjunto.postNeumaticoCoche);
		app.get("/conjunto_checkNeumaticosNotNull/:numero", auth, cConjunto.getCheckNeumaticoNotNull);
		app.get("/conjunto_neumaticos_ubicacion/:numero", auth, acceso, cConjunto.getNeumaticos_Ubicacion);
	//VALES DE PAÑOL
		app.get("/vales_lista", auth, acceso, cVales.getLista);
		app.get("/getValesFiltroFecha/:desde/:hasta", auth, cVales.getValesFiltroFecha);
		app.get("/vales_alta", auth, acceso, cVales.getAlta);
		app.post("/vales_alta", auth, cVales.postAlta);
		app.get("/vales_modificar/:id", auth, acceso, cVales.getModificar);
		app.post("/vales_modificar", auth, cVales.postModificar);
		app.get("/vales_borrar/:id", auth, acceso, cVales.getDel);
		app.get("/vales_ver/:id", auth, cVales.getVer);
		app.get("/vales_alta_repuesto/:id_vale1", auth, cVales.getAltaRepuesto);
		app.post("/vales_alta_repuesto", auth, cVales.postAltaRepuesto);
		app.get("/vales_modificar_repuesto/:id_vale1/:id_vale2", auth, cVales.getModificarRepuesto);
		app.post("/vales_modificar_repuesto", auth, cVales.postModificarRepuesto);
		app.get("/vales_borrar_repuesto/:id_vale1/:id_vale2", auth, cVales.getDelRepuesto);
	//REPARACIONES DE EMERGENCIA
		app.get("/reparaciones_lista", auth, acceso, cReparaciones.getLista);
		app.get("/getReparacionesFiltroFecha/:desde/:hasta", auth, cReparaciones.getReparacionesFiltroFecha);
		app.get("/reparaciones_alta", auth, acceso, cReparaciones.getAlta);
		app.get("/reparaciones_checkVale/:nro_vale", auth, cReparaciones.getCheckNroVale);
		app.post("/reparaciones_alta", auth, cReparaciones.postAlta);
		app.get("/reparaciones_modificar/:id", auth, acceso, cReparaciones.getModificar);
		app.post("/reparaciones_modificar", auth, cReparaciones.postModificar);
		app.get("/reparaciones_borrar/:id", auth, acceso, cReparaciones.getDel);
		app.get("/reparaciones_ver/:id", auth, acceso, cReparaciones.getVer);
	//EQUIPOS
		app.get("/equipos_lista", auth, acceso, cEquipos.getLista);
		app.get("/equipos_alta", auth, acceso, cEquipos.getAlta);
		app.post("/equipos_alta", auth, cEquipos.postAlta);
		app.get("/equipos_ver/:id", auth, acceso, cEquipos.getVer);
		app.get("/equipos_modificar/:id", auth, acceso, cEquipos.getModificar);
		app.post("/equipos_modificar", auth, cEquipos.postModificar);
		app.get("/equipos_eliminar/:id", auth, acceso, cEquipos.getDelete);
		app.get("/equipos_filtrar/:opcion/:buscar", auth, cEquipos.getEquiposFiltro);
		app.get("/equipos_filtrar2", auth, cEquipos.getEquiposFiltro2);
		app.get("/equipos_buscarxnumero/:numero", auth, cEquipos.getBuscarxNumero);
	//HERRAMIENTRAS - MOVIMIENTOS
		app.get("/herramientas_lista", auth, acceso, cHerramientas.getLista);
		app.get("/herramientas_filtrar/:desde/:hasta/:denominacion", auth, acceso, cHerramientas.getFiltrar);
		app.get("/herramientas_alta", auth, acceso, cHerramientas.getAlta);
		app.get("/herramientas_filtro_repuestos/:codigo/:descripcion", auth, acceso, cHerramientas.getRepuestos);
		app.get("/herramientas_alta_form/:codigo", auth, acceso, cHerramientas.getAltaForm);
		app.post("/herramientas_alta", auth, cHerramientas.postAlta);
		app.get("/herramientas_ver/:id_herramienta", auth, acceso, cHerramientas.getVer);
		app.get("/herramientas_modificar/:id_herramienta", auth, acceso, cHerramientas.getModificar);
		app.post("/herramientas_modificar", auth, cHerramientas.postModificar);
		app.get("/herramientas_eliminar/:id_herramienta", auth, acceso, cHerramientas.getEliminar);
		app.get("/herramientas_ubicaciones", auth, acceso, cHerramientas.getUbicaciones);
		app.post("/herramientas_cambiar_ubicacion", auth, cHerramientas.postHerramientasUbicacion);
		app.post("/herramientas_modificar_fechaCambio/:id_herramienta/:opcion", auth, cHerramientas.postModificarFechaCambio);	
	//HERRAMIENTAS - CONTROL MENSUAL
		app.get("/herramientas_controlmensual", auth, acceso, cHerramientas.getControlMensual);
		app.get("/herramientas_listaoperarios/:desde/:hasta/:operario", auth, acceso, cHerramientas.getOperarios);
		app.get("/herramientas_listacompleta/:desde/:hasta/:operario", auth, acceso, cHerramientas.getListaCompleta);
	//HERRAMIENTAS - REPORTE X UBICACION
		app.get("/herramientas_reporteubicacion", auth, acceso, cHerramientas.getReporteXUbicacion);
		app.get("/herramientas_listareporteubicacion/:desde/:hasta/:id_ubicacion", auth, acceso, cHerramientas.getListadoReporteUbicacion);
	//HERRAMIENTAS - DISPONIBILIDAD
		app.get("/herramientas_disponibilidad", auth, acceso, cHerramientas.getDisponibilidades);
		app.get("/herramientas_get_disp/:codigo", auth, cHerramientas.getDisp_ajax)		
	//REMITOS
		app.get("/remitos_lista", auth, acceso, cRemitos.getLista);
		app.get("/remitos_alta", auth, acceso, cRemitos.getAlta);
		app.post("/remitos_alta", auth, acceso, cRemitos.postAlta);
		app.get("/remitos_ver/:nro_remito", auth, cRemitos.getVer);
		app.get("/remitos_listaproveedores", auth, acceso, cRemitos.getListaProveedores);
		app.get("/remitos_listar/:desde/:hasta/:id_proveedor/:estado", auth, acceso, cRemitos.getListaRemitos);
		app.get("/verRemito/:num_remito", auth, acceso, cRemitos.getRemito);
		app.get("/remitos_modificar/:id_remito", auth, acceso, cRemitos.getModificar);
		app.post("/remitos_modificar", auth, cRemitos.postModificar);
		app.get("/remitos_borrar/:num_remito", auth, cRemitos.getDel);
		app.get("/remitos_borrar_contenido/:num_remito/:id_remito2", auth, cRemitos.getDel_Contenido);
		app.get("/remitos_alta_contenido/:id_remito", auth, acceso, cRemitos.getAltaContenido);
		app.post("/remitos_alta_contenido", auth, cRemitos.postAltaContenido);
	//SERENO
		app.get("/sereno_lista", auth, acceso, cSerenos.getLista);
		app.get("/sereno_alta", auth, acceso, cSerenos.getAlta);
		app.post("/sereno_alta", auth, cSerenos.postAlta);
		app.get("/sereno_listaherramientas/:filtro/:desde/:hasta", auth, acceso, cSerenos.getListaHerramientas);
		app.get("/serenos_vehiculos", auth, acceso, cSerenos.getVehiculos);
		app.post("/serenos_setcoche/:id_sereno/:id_coche/:fecha_colocado", auth, cSerenos.postColocarCoche);
		app.get("/serenos_eliminar/:id_sereno", auth, cSerenos.getDel);
		app.post("/serenos_unsetcoche/:id_sereno", auth, cSerenos.postSacarCoche);
	//ORDENES DE TRABAJO
		app.get("/ordenestrabajo_lista", auth, acceso, cOrdenesTrabajo.getLista);
		app.get("/ordenestrabajo_alta", auth, acceso, cOrdenesTrabajo.getAlta);
		app.get("/get_ultima_ordentrabajo/:nro_coche/:fecha_hoy", auth, acceso, cOrdenesTrabajo.getUltimaOrden);
		app.get("/get_validar/:numero", auth, acceso, cOrdenesTrabajo.getValidarInsert);
		app.post("/ordenestrabajo_alta", auth, cOrdenesTrabajo.postAlta);
		app.get("/ordenestrabajo_filtrar/:desde/:hasta", auth, acceso, cOrdenesTrabajo.getFiltrar);
		app.get("/ordenestrabajo_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificar);
		app.post("/ordenestrabajo_modificar", auth, cOrdenesTrabajo.postModificar);
		app.get("/ordenestrabajo_eliminar/:id", auth, acceso, cOrdenesTrabajo.getEliminar);
		app.get("/ordenestrabajo_ver/:id", auth, acceso, cOrdenesTrabajo.getVer);
		app.get("/ordenestrabajo_frenos_ubica_modificar/:id/:id_ubica", auth, acceso, cOrdenesTrabajo.getModificarFrenosUbica);
		app.post("/ordenestrabajo_frenos_ubica_modificar", auth, cOrdenesTrabajo.postModificarFrenosUbica);
		app.get("/ordenestrabajo_frenos_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarFrenosGeneral);
		app.post("/ordenestrabajo_frenos_modificar", auth, cOrdenesTrabajo.postModificarFrenosGeneral);
		app.get("/ordenestrabajo_embragues_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarEmbragues);
		app.post("/ordenestrabajo_embragues_modificar", auth, cOrdenesTrabajo.postModificarEmbragues);
		app.get("/ordenestrabajo_lubricante_motor_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarLubricanteMotor);
		app.post("/ordenestrabajo_lubricante_motor_modificar", auth, cOrdenesTrabajo.postModificarLubricanteMotor);
		app.get("/ordenestrabajo_lubricante_caja_velocidad_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarLubricanteCajaVelocidad);
		app.post("/ordenestrabajo_lubricante_caja_velocidad_modificar", auth, cOrdenesTrabajo.postModificarLubricanteCajaVelocidad);
		app.get("/ordenestrabajo_lubricante_diferencial_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarLubricanteDiferencial);
		app.post("/ordenestrabajo_lubricante_diferencial_modificar", auth, cOrdenesTrabajo.postModificarLubricanteDiferencial);
		app.get("/ordenestrabajo_sistema_neumatico_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarSistemaNeumatico);
		app.post("/ordenestrabajo_sistema_neumatico_modificar", auth, cOrdenesTrabajo.postModificarSistemaNeumatico);
		app.get("/ordenestrabajo_sistema_alimentacion_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarSistemaAlimentacion);
		app.post("/ordenestrabajo_sistema_alimentacion_modificar", auth, cOrdenesTrabajo.postModificarSistemaAlimentacion);
		app.get("/ordenestrabajo_electricidad_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarElectricidad);
		app.post("/ordenestrabajo_electricidad_modificar", auth, cOrdenesTrabajo.postModificarElectricidad);
		app.get("/ordenestrabajo_filtros_admision_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarFiltrosAdmision);
		app.post("/ordenestrabajo_filtros_admision_modificar", auth, cOrdenesTrabajo.postModificarFiltrosAdmision);
		app.get("/ordenestrabajo_refrigeracion_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarRefrigeracion);
		app.post("/ordenestrabajo_refrigeracion_modificar", auth, cOrdenesTrabajo.postModificarRefrigeracion);
		app.get("/ordenestrabajo_chasis_modificar/:id",auth, acceso, cOrdenesTrabajo.getModificarChasis);
		app.post("/ordenestrabajo_chasis_modificar", auth, cOrdenesTrabajo.postModificarChasis);
		app.get("/ordenestrabajo_motor_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarMotor);
		app.post("/ordenestrabajo_motor_modificar", auth, cOrdenesTrabajo.postModificarMotor);
		app.get("/ordenestrabajo_cajavelocidad_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarCajaVelocidad);
		app.post("/ordenestrabajo_cajavelocidad_modificar", auth, cOrdenesTrabajo.postModificarCajaVelocidad);
		app.get("/ordenestrabajo_diferencial_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarDiferencial);
		app.post("/ordenestrabajo_diferencial_modificar", auth, cOrdenesTrabajo.postModificarDiferencial);
		app.get("/ordenestrabajo_neumatico_gomeria_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarNeumaticoGomeria);
		app.post("/ordenestrabajo_neumatico_gomeria_modificar", auth, cOrdenesTrabajo.postModificarNeumaticoGomeria);
		app.get("/ordenestrabajo_carroceria_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarCarroceria);
		app.post("/ordenestrabajo_carroceria_modificar", auth, cOrdenesTrabajo.postModificarCarroceria);
		app.get("/ordenestrabajo_monebus_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarMonebus);
		app.post("/ordenestrabajo_monebus_modificar", auth, cOrdenesTrabajo.postModificarMonebus);
		app.get("/ordenestrabajo_tren_delantero_modificar/:id", auth, acceso, cOrdenesTrabajo.getModificarTrenDelantero);
		app.post("/ordenestrabajo_tren_delantero_modificar", auth, cOrdenesTrabajo.postModificarTrenDelantero);
		app.get("/ordenestrabajo_km/:nro_coche/:desde/:hasta", auth, cOrdenesTrabajo.getKm);
		app.get("/ordenestrabajo_km_cubierta/:km/:codigo/:fecha_orden", auth, cOrdenesTrabajo.getKm_Cubierta);
		app.get("/ordenestrabajo_print/:id_orden", auth, cOrdenesTrabajo.getPrint);
	//FACTURAS
		app.get("/facturas_lista", auth, acceso, cFacturas.getLista);
		app.get("/facturas/filtro/:desde/:hasta/:filtro", auth, acceso, cFacturas.getByFiltro);
		app.get("/facturas_alta", auth, acceso, cFacturas.getAlta);
		app.post("/facturas_alta", auth, cFacturas.postAlta);
		app.get("/facturas/repuesto/:codigo", auth, acceso, cFacturas.getRepuesto);
		app.get("/facturas_modificar/:id", auth, acceso, cFacturas.getModificar);
		app.post("/facturas_modificar", auth, acceso, cFacturas.postModificar);
		app.get("/facturas_eliminar/:id", auth, acceso, cFacturas.getDelete);
		app.get("/facturas_ver/:id", auth, acceso, cFacturas.getVer);
	//CARGAR KMS
		app.get("/kmxcoche_alta", auth, acceso, cKmxcoche.getImport);
		app.post("/kmxcoche_alta", auth, cKmxcoche.postImport);
		app.get("/kmxcoche_form", auth, acceso, cKmxcoche.getForm);
		app.post("/kmxcoche_form", auth, cKmxcoche.postForm);
	//movimiento conjuntos
		app.get("/mvto_conjuntos_form", auth, acceso, cMvto_Conjuntos.getForm);
		app.post("/mvto_conjuntos_form", auth, cMvto_Conjuntos.postForm);
		app.get("/mvto_conjuntos_get_repuesto_x_denominacion/:denominacion", auth, cMvto_Conjuntos.getRepuesto_x_Denominacion);
	//STOCK DE CONJUNTOS
		app.get("/stockdeconjuntos_form", auth, acceso, cStockDeConjuntos.getForm);
		app.post("/stockdeconjuntos_form", auth, cStockDeConjuntos.postForm);
		app.get("/stockdeconjuntos_lista/:codigo/:incluir", auth, cStockDeConjuntos.postForm2);
	//IMPRESION DE ASISTENCIA TECNICA
		app.get("/impresion_asistencia_tecnica", auth, cAsistencia.getPrint);
		app.get("/getRuedasByNroCoche/:nro_coche", auth, cAsistencia.getRuedasByNroCoche);
	//CONSUMOS X COCHES
		app.get("/consumos_x_coches", auth, acceso, cConsumosxCoches.getConsumos);
		app.get("/getConsumosxCoches_xRepuestos/:codigo/:desde/:hasta", auth, cConsumosxCoches.getConsumosxCoches_xRepuestos);
		app.get("/getSumaTotalMantenimientos/:desde/:hasta", auth, cConsumosxCoches.getSumaTotalMantenimientos);
		app.get("/getConsumosxCoches_xMantenimiento/:desde/:hasta", auth, cConsumosxCoches.getConsumosxCoches_xMantenimiento);
		app.get("/getConsumosxCoches_xCodigoRepuesto/:desde/:hasta", auth, cConsumosxCoches.getConsumosxCoches_xCodigoRepuesto);
	// app.get('/pruebasql', auth, cPruebaSQL.getPrueba);
	//pruebasql
	// //random
		app.get('/random', auth, acceso, cRandom.getRandom);
		app.get('/updateRepuestosConIdRubroFk', auth, cRandom.updateRepuestosConIdRubroFk);
		app.get("/updateTablaVehiculosConFive", auth, cRandom.updateTablaVehiculosConFive);
		app.get("/updateTablaSecr", auth, cRandom.updateTablaSecrConOperariosTemp);
		app.get("/actualizarOtrosGastos", auth, cRandom.updateOtrosGastos);
		app.get("/actualizarEquipos", auth, cRandom.updateEquipos);
		app.get("/actualizarConjuntos", auth, cRandom.updateConjuntos);
		app.get("/actualizarConjuntosFichas", auth, cRandom.updateConjuntosFichas);
		app.get("/actualizarVales", auth, cRandom.updateVales);
		app.get("/actualizarHerramientas", auth, cRandom.updateHerramientas);
		app.get("/actualizarRemitos", auth, cRandom.updateRemitos);
};