var conn = require('../config/db').conn;

module.exports = {
	getAllByIdComercio: getAllByIdComercio,
	getAllByIdCategoria: getAllByIdCategoria,
	insert: insert, 
	getById: getById,
	update: update, 
	del: del

}

function insertCompras1(id_secr_fk, fecha, direccion_envio, telefono_contacto, cb){
	conn("insert into compras1(id_secr_fk, fecha, direccion_envio, telefono_contacto) "+
		"values("+id_secr_fk+", '"+fecha+"', '"+direccion_envio+"', '"+telefono_contacto+"')", cb);
}

function insertCompras2(id_compras1_fk, id_producto_fk, cantidad, precio_uni, cb){
	conn("insert into compras2(id_compras1_fk, id_producto_fk, cantidad, precio_uni) "+
		"values("+id_secr_fk+", "+id_producto_fk+", "+cantidad+", "+precio_uni+")", cb);
}

function getByIdCompras1(id, cb){
	conn("select compras1.* "+
		"from compras1 "+
		"where compras1.id = "+id, cb);
}

function getByIdCompras2(id, cb){
	conn("select compras2.* "+
		"from compras2 "+
		"where compras2.id = "+id, cb);
}

function updateCompras1(id, link, precio, id_comercio_fk, id_categoria_fk, texto, activo, cb){
	conn("update productos set pach_imagen = '"+link+"', "+
		"precio = '"+precio+"', id_comercio_fk = '"+id_comercio_fk+"', id_categoria_fk = '"+id_categoria_fk+"', texto = '"+texto+"', activo = "+activo+" "+
		"where id = "+id, cb);
}

function delCompras1(id, cb){
	conn("delete from compras1 where id = "+id, cb);
}

function delCompras2(id, cb){
	conn("delete from compras2 where id = "+id, cb);
}