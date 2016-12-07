var conn = require('../config/db').conn;

module.exports = {
	getAllByIdComercio: getAllByIdComercio
}

function getAllByIdComercio(id_comercio, cb){
	conn("select ofertas.* from ofertas where id_comercio_fk = "+id_comercio+" order by id", cb);
}
