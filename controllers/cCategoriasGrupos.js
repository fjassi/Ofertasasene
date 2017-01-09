var mCategoriasGrupos = require('../models/mCategoriasGrupos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function getLista(req, res) {
  	mCategoriasGrupos.getAll(function (categorias){
  		res.render('categoriasgruposlista', {
			pagename: 'Lista de Grupos de Categorias',
			categorias: categorias
		});
  	});
}

function getAlta(req, res){
	res.render('categoriasgruposalta', {
		pagename: 'Alta de Grupo de Categorias',
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	mCategoriasGrupos.getByCodigo(codigo, function (grupodecategoriasporcodigo){
		if (grupodecategoriasporcodigo[0]==null){
			mCategoriasGrupos.insert(codigo, nombre, function(){
				res.redirect('categoriasgruposlista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Grupo de Categorias existente. Intente con otro Codigo."
      		});
      	}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mCategoriasGrupos.getById(id, function (grupodecategoria){
		res.render('categoriasgruposmodificar',{
			pagename: 'Modificar Grupo de categorias',
			categoriagrupo: grupodecategoria[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;

	mCategoriasGrupos.update(id, codigo, nombre, function(){
		res.redirect('categoriasgruposlista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mCategoriasGrupos.getById(id, function (categoria){
	  	categoria = categoria[0];		
  		mCategoriasGrupos.del(id, function(){
    		res.redirect('/categoriasgruposlista'); 
  		});
	}); 
}


