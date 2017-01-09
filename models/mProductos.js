var conn = require('../config/db').conn;

module.exports = {
	getAllByIdComercio: getAllByIdComercio,
	getAllByIdCategoria: getAllByIdCategoria,
	insert: insert, 
	getById: getById,
	update: update, 
	del: del

}

function getAllByIdComercio(id_comercio, cb){
	conn("select productos.* from productos where id_comercio_fk = "+id_comercio+" order by id", cb);
}

function getAllByIdCategoria(id_categoria, cb){
	conn("select productos.* from productos where id_categoria_fk = "+id_categoria+" order by id", cb);
}

function insert(link, precio, id_comercio_fk, id_categoria_fk, texto, cb){
	conn("insert into productos(path_imagen, precio, id_comercio_fk, id_categoria_fk, texto, activo) "+
		"values('"+link+"', "+precio+", "+id_comercio_fk+", "+id_categoria_fk+", '"+texto+"', 1)", cb);
}

function getById(id, cb){
	conn("select productos.* "+
		"from productos "+
		"where productos.id = "+id, cb);
}

function update(id, link, precio, id_comercio_fk, id_categoria_fk, texto, activo, cb){
	conn("update productos set path_imagen = '"+link+"', "+
		"precio = '"+precio+"', id_comercio_fk = '"+id_comercio_fk+"', id_categoria_fk = '"+id_categoria_fk+"', texto = '"+texto+"', activo = "+activo+" "+
		"where id = "+id, cb);
}

function del(id, cb){
	conn("delete from productos where id = "+id, cb);
}
