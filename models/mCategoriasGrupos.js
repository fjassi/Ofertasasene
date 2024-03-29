var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo
}

function getAll(cb){
	conn('select * from categorias_grupos order by codigo', cb);
}

function getById(id, cb){
	conn("select * from categorias_grupos where id = "+id, cb);
}

function insert(codigo, sector, cb){
	conn("insert into categorias_grupos(codigo, nombre) values('"+codigo+"', '"+nombre+"')", cb);
}

function update(id, codigo, nombre, cb){
	conn("update categorias_grupos set codigo = '"+codigo+"', nombre = '"+nombre+"' where id = "+id, cb);
}

function del(id, cb){
	conn("delete from categorias_grupos where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from categorias_grupos where codigo='"+codigo+"'", cb);
}
