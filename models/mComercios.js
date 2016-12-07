var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select comercios.*, rubros.nombre as rubrotxt "+
		"from comercios "+
		"left join rubros on rubros.id = comercios.id_rubro_fk", cb);
}

function insert(nombre, rubro, direccion, telefono, link, posicion, cb){
	conn("insert into comercios(nombre, id_rubro_fk, direccion, telefono, link, posicion) "+
		"values('"+nombre+"', "+rubro+", '"+direccion+"', '"+telefono+"', '"+link+"', '"+posicion+"')", cb);
}

function getById(id, cb){
	conn("select comercios.*, rubros.nombre as rubrotxt "+
		"from comercios "+
		"left join rubros on rubros.id = comercios.id_rubro_fk "+
		"where comercios.id = "+id, cb);
}

function update(id, nombre, rubro, direccion, telefono, link, posicion, cb){
	conn("update comercios set nombre = '"+nombre+"', id_rubro_fk = "+rubro+", "+
		"direccion = '"+direccion+"', telefono = '"+telefono+"', link = '"+link+"', posicion = '"+posicion+"' "+
		"where id = "+id, cb);
}

function del(id, cb){
	conn("delete from comercios where id = "+id, cb);
}