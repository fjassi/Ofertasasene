var mCategorias = require('../models/mCategorias');
var cImage = require('./cImage');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCategoriasPorGrupo: getCategoriasPorGrupo
}

function getLista(req, res) {
  	mCategorias.getAll(function (categorias){
  		res.render('categorias_lista', {
			pagename: 'Lista de Categorias',
			categorias: categorias
		});
  	});
}

function getAlta(req, res){
	res.render('categorias_alta', {
		pagename: 'Alta de Categoria'
	});
}


function postAlta(req, res){
	const params = req.body;
	var nombre = params.nombre;
	var path_imagen = params.link;
	var texto = params.texto;

	mCategorias.insert(nombre, path_imagen, texto, function(){
		res.redirect('categorias_lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mCategorias.getById(id, function (categoria){
		res.render('categorias_modificar',{
			pagename: 'Modificar Categoria',
			categoria: categoria[0]
		});
	});	
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre = params.nombre;
	const path_imagen = params.link;
	const texto = params.texto;
	var activo = params.activo;
	var lastpath = params.lastpath;
	if(activo == "on")
		activo = 1;
	else
		activo = 0;
	if(lastpath != path_imagen){
		cImage.remove_image(lastpath);		
	}
	

	mCategorias.update(id, nombre, path_imagen, texto, activo, function(){
		res.redirect('categorias_lista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mCategorias.getById(id, function(categoria){
		cImage.remove_image(categoria[0].path_imagen);
		mCategorias.del(id, function(){
			res.redirect('/categorias_lista'); 
		});
	});					
}

function getCategoriasPorGrupo(req, res){
	params = req.params;
	id_grupo = params.id_grupo;

	mCategorias.getCantCategoriasPorGrupo(id_grupo, function (cant){
		console.log(cant)
		res.send(cant);
	});
}
