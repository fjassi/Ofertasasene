var mRubros = require('../models/mRubros');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getRubrosPorGrupo: getRubrosPorGrupo
}

function getLista(req, res) {
  	mRubros.getAll(function (rubros){
  		res.render('rubros_lista', {
			pagename: 'Lista de Rubros',
			rubros: rubros
		});
  	});
}

function getAlta(req, res){
	res.render('rubros_alta', {
		pagename: 'Alta de Rubro'
	});
}


function postAlta(req, res){
	const params = req.body;
	var nombre = params.nombre;
	
	mRubros.insert(nombre, function(){
		res.redirect('rubros_lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mRubros.getById(id, function (rubro){
		res.render('rubros_modificar',{
			pagename: 'Modificar Rubro',
			rubro: rubro[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre = params.nombre;

	mRubros.update(id, nombre, function(){
		res.redirect('rubros_lista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;

	mRubros.del(id, function(){
		res.redirect('/rubros_lista'); 
	});				
}

function getRubrosPorGrupo(req, res){
	params = req.params;
	id_grupo = params.id_grupo;

	mRubros.getCantRubrosPorGrupo(id_grupo, function (cant){
		console.log(cant)
		res.send(cant);
	});
}
