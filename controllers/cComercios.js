const mComercios = require('../models/mComercios');
const mCategoria = require('../models/mCategorias');
var cImage = require('./cImage');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function getLista(req, res) {
  	mComercios.getAll(function (comercios){
  		res.render('comercios_lista', {
			pagename: 'Lista de Comercios',
			comercios: comercios
		});
  	});
}

function getAlta(req, res){
	mCategoria.getAll(function(categoria){
		res.render("comercios_alta", {
			pagename: "Alta de Comercio",
			categoria: categoria
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	const nombre = params.nombre;
	const path_logo = params.path_logo;
	const path_banner = params.path_banner;
	const direccion = params.direccion;
	const telefono = params.telefono;
	const link = params.link;
	const posicion = params.posicion;

	mComercios.insert(nombre, path_logo, path_banner, direccion, telefono, link, posicion, function(){
		res.redirect("comercios_lista");
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mCategoria.getAll(function(categoria){
		mComercios.getById(id, function(comercio){
			res.render("comercios_modificar", {
				pagename: "Modificar Comercio",
				comercio: comercio[0],
				categoria: categoria
			});
		});
	});	
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre = params.nombre;
	const path_logo = params.path_logo;
	const path_banner = params.path_banner;
	const direccion = params.direccion;
	const telefono = params.telefono;
	const link = params.link;
	const posicion = params.posicion;
	var activo = params.activo;
	var lastpathBanner = params.lastpathBanner;
	var lastpathLogo = params.lastpathLogo;
	if(activo == "on")
		activo = 1;
	else
		activo = 0;
	if(lastpathLogo != path_logo){
		cImage.remove_image(lastpathLogo); 		
	}
	if(lastpathBanner != path_banner){
		cImage.remove_image(lastpathBanner); 		
	}
	mComercios.update(id, nombre, path_logo, path_banner, direccion, telefono, link, posicion, activo, function(){
		res.redirect("comercios_lista");
	});
}

function getDel(req, res){
	const params = req.params;
	const id = params.id;
	
	mComercios.getById(id, function(comercio){
		cImage.remove_image(comercio[0].path_logo);
		cImage.remove_image(comercio[0].path_banner);
		mComercios.del(id, function(){
			res.redirect("comercios_lista");
		});
	});

}