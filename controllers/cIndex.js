var mUsuarios = require('../models/mUsuarios');

module.exports = {
	getInicio: getInicio,
	getError: getError,
    getAyuda: getAyuda,
    updateMenuInfo: updateMenuInfo
}

function getInicio(req, res){
    res.render('inicio', {
        pagename: 'Ofertas'
    });
}

function getError(req, res) {
	res.render('error',{
        pagename: 'Error',
	});
}

function getAyuda(req, res){
    res.render('ayuda',{
        pagename: 'Ayuda'
    });
}

function updateMenuInfo(req, res){
    var params = req.params;
    var id_menu = params.id_menu;
    var accion = params.accion;

    req.session.user.id_menu = id_menu;
    req.session.user.accion = accion;
    req.session.save();
    res.send(1);
}