var mRubrosGrupos = require('../models/mRubrosGrupos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function getLista(req, res) {
  	mRubrosGrupos.getAll(function (rubros){
  		res.render('rubrosgruposlista', {
			pagename: 'Lista de Grupos de Rubros',
			rubros: rubros
		});
  	});
}

function getAlta(req, res){
	res.render('rubrosgruposalta', {
		pagename: 'Alta de Grupo de Rubros',
	});
}

function postAlta(req, res){
	params = req.body;
	codigo = params.codigo;
	nombre = params.nombre;
	mRubrosGrupos.getByCodigo(codigo, function (grupoderubrosporcodigo){
		if (grupoderubrosporcodigo[0]==null){
			mRubrosGrupos.insert(codigo, nombre, function(){
				res.redirect('rubrosgruposlista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Grupo de Rubros existente. Intente con otro Codigo."
      		});
      	}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mRubrosGrupos.getById(id, function (grupoderubro){
		res.render('rubrosgruposmodificar',{
			pagename: 'Modificar Grupo de Rubros',
			rubrogrupo: grupoderubro[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;

	mRubrosGrupos.update(id, codigo, nombre, function(){
		res.redirect('rubrosgruposlista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mRubrosGrupos.getById(id, function (rubro){
	  	rubro = rubro[0];		
  		mRubrosGrupos.del(id, function(){
    		res.redirect('/rubrosgruposlista'); 
  		});
	}); 
}


