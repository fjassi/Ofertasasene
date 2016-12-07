var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getCantRubrosPorGrupo: getCantRubrosPorGrupo
}

function getAll(cb){
	conn("select rubros.* from rubros order by id", cb);
}

function getById(id, cb){
	conn("select * from rubros where id = "+id, cb);
}

function insert(nombre, cb){
	conn("insert into rubros(nombre, activo) values('"+nombre+"', 1)", cb);
}

function update(id, nombre, cb){
	conn("update rubros set nombre = '"+nombre+"' where id = "+id, cb);
}

function del(id, cb){
	conn("delete from rubros where id = "+id, cb);
}

function getCantRubrosPorGrupo(id_grupo, cb){
	conn("select * from rubros where id_grupo_fk = "+id_grupo, cb);
}