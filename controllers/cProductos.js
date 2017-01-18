var mProductos = require('../models/mProductos');
var mCategorias = require('../models/mCategorias');
var fs = require('fs');
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
	const params = req.params;
	const id_comercio = params.id_comercio;

  	mProductos.getAllByIdComercio(id_comercio, function (productos){
  		res.render('productos_lista', {
				pagename: 'Lista de Productos',
				productos: productos,
				id_comercio: id_comercio
			});
  	});
}

function getAlta(req, res){
	const params = req.params;
	const id_comercio = params.id_comercio;

	mCategorias.getActivo(function(categorias){
		res.render("productos_alta", {
		pagename: "Alta de Producto",
		id_comercio: id_comercio, 
		categorias: categorias
		});
	});
	
}

function postAlta(req, res){
	const params = req.body;
	const file = req.file;
	const link = params.link;
	const precio = params.precio;
	const id_comercio = params.id_comercio;
	const id_categoria = params.id_categoria;
	const texto = params.texto;
	console.log(file.originalname);

	// cImage.resize_product(link);

	mProductos.insert(link, precio, id_comercio, id_categoria, texto, function(){
		res.redirect("productos_lista/"+id_comercio);

	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;
	mCategorias.getAll(function(categorias){
		mProductos.getById(id, function (producto){
			res.render('productos_modificar',{
				pagename: 'Modificar Producto',
				producto: producto[0],
				categorias: categorias
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const file = req.file;
	const id = params.id;
	const link = params.link.trim();
	const precio = params.precio;
	const id_comercio = params.id_comercio;
	const id_categoria = params.id_categoria;
	const texto = params.texto;
	var activo = params.activo;
	if(activo == "on")
		activo = 1;
	else
		activo = 0;
	var lastpath = params.lastpath.trim();
	console.log(lastpath);
	console.log('link:');
	console.log(link);
	if(lastpath != link){
		cImage.remove_image(lastpath);		
	}
	
	mProductos.update(id, link, precio, id_comercio, id_categoria, texto, activo, function(){
		res.redirect('productos_lista/'+id_comercio);
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;

	mProductos.getById(id,function(producto){
		mProductos.del(id, function(){
			cImage.remove_image(producto[0].path_imagen);
			res.redirect('/productos_lista/'+producto[0].id_comercio_fk); 
		});
	});
						
}
