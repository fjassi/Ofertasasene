var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getCantCategoriasPorGrupo: getCantCategoriasPorGrupo,
	getActivo: getActivo
}

function getAll(cb){
	conn("select categorias.* from categorias order by id", cb);
}

function getById(id, cb){
	conn("select * from categorias where id = "+id, cb);
}

function insert(nombre, path_imagen, texto, cb){
	conn("insert into categorias(nombre, path_imagen, texto, activo) values('"+nombre+"', '"+path_imagen+"', '"+texto+"',  1)", cb);
}

function update(id, nombre, path_imagen, texto, activo, cb){
	conn("update categorias set nombre = '"+nombre+"', path_imagen = '"+path_imagen+"', texto = '"+texto+"', activo = "+activo+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from categorias where id = "+id, cb);
}

function getCantCategoriasPorGrupo(id_grupo, cb){
	conn("select * from categorias where id_grupo_fk = "+id_grupo, cb);
}

function getActivo(cb){
	conn("select categorias.* from categorias where categorias.activo = 1 order by id ", cb);
}