const mComercios = require('../models/mComercios');
const mRubros = require('../models/mRubros');

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
	mRubros.getAll(function(rubros){
		res.render("comercios_alta", {
			pagename: "Alta de Comercio",
			rubros: rubros
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	const nombre = params.nombre;
	const rubro = params.rubro;
	const direccion = params.direccion;
	const telefono = params.telefono;
	const link = params.link;
	const posicion = params.posicion;

	mComercios.insert(nombre, rubro, direccion, telefono, link, posicion, function(){
		res.redirect("comercios_lista");
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mRubros.getAll(function(rubros){
		mComercios.getById(id, function(comercio){
			res.render("comercios_modificar", {
				pagename: "Modificar Comercio",
				comercio: comercio[0],
				rubros: rubros
			});
		});
	});	
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre = params.nombre;
	const rubro = params.rubro;
	const direccion = params.direccion;
	const telefono = params.telefono;
	const link = params.link;
	const posicion = params.posicion;
	
	mComercios.update(id, nombre, rubro, direccion, telefono, link, posicion, function(){
		res.redirect("comercios_lista");
	});
}

function getDel(req, res){
	const params = req.params;
	const id = params.id;

	mComercios.del(id, function(){
		res.redirect("comercios_lista");
	});
}