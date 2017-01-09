var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select comercios.* "+
		"from comercios ", cb);
}

function insert(nombre, path_logo, path_banner, direccion, telefono, link, posicion, cb){
	conn("insert into comercios(nombre, path_logo, path_banner, direccion, telefono, link, posicion, activo) "+
		"values('"+nombre+"', '"+path_logo+"', '"+path_banner+"', '"+direccion+"', '"+telefono+"', '"+link+"', '"+posicion+"', 1)", cb);
}

function getById(id, cb){
	conn("select comercios.* "+
		"from comercios "+
		"where comercios.id = "+id, cb);
}

function update(id, nombre, path_logo, path_banner, direccion, telefono, link, posicion, activo, cb){
	conn("update comercios set nombre = '"+nombre+"', path_logo = '"+path_logo+"', path_banner = '"+path_banner+"', "+
		"direccion = '"+direccion+"', telefono = '"+telefono+"', link = '"+link+"', posicion = '"+posicion+"', activo = "+activo+" "+ 
		"where id = "+id, cb);
}

function del(id, cb){
	conn("delete from comercios where id = "+id, cb);
}