var mOfertas = require('../models/mOfertas');

module.exports = {
	getLista: getLista,
	getAlta: getAlta:,
	postAlta: postAlta
}

function getLista(req, res) {
	const params = req.params;
	const id_comercio = params.id_comercio;

  	mOfertas.getAllByIdComercio(id_comercio, function (ofertas){
  		res.render('ofertas_lista', {
			pagename: 'Lista de Ofertas',
			ofertas: ofertas,
			id_comercio: id_comercio
		});
  	});
}

function getAlta(req, res){
	const params = req.params;
	const id_comercio = params.id_comercio;

	res.render("ofertas_alta", {
		pagename: "Alta de Oferta",
		id_comercio: id_comercio
	});
}

function postAlta(req, res){

}
