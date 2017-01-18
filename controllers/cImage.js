
var multer  = require('multer');
var im = require('imagemagick');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
// const im = require('imagemagick-stream');
// var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
 destination: function (req, file, callback) {
   callback(null, './public/uploads');
 },
 filename: function (req, file, callback) {
   callback(null, 'product-' + file.originalname);
 }
});

var upload = multer({ storage : storage}).single('avatar');
var uploadm = multer({storage : storage}).array('avata',2);

module.exports = {
	subir: subir,
	subirmulti: subirmulti, 
	remove_image: remove_image,
	resize_product: resize_product
}

function subir(req,res, next){
	// var params = req.params;
	// var last
	// console.log(req);
	
 upload(req,res,function(err) {
   if(err) {
   	console.log("Archivo no subido");
     return res.end("Error uploading file.");
   }else{
   // 		im.resize({
			//   srcPath: 'kittens.jpg',
			//   dstPath: 'kittens-small.jpg',
			//   width:   256
			// }, function(err, stdout, stderr){
			//   if (err) throw err;
			//   console.log('resized kittens.jpg to fit within 256x256px');
			// 	});
			
			// console.log(req.file.filename);
	   console.log("Archivo subido");
	   return next();
   }
 });
}

function subirmulti (req, res, next){
	uploadm(req, res, function(err){
		if(err) {
   	console.log("Archivo no subido");
     return res.end("Error uploading file.");
   }else{
	   console.log("Archivo subido");
	   return next();
   }
	});
}

function remove_image (path){
	var path = './'+path;
	console.log(path);
	fs.exists(path, function(exists) {
		  if(exists) {
		    console.log('*****************encontradoo*****************.');
		    console.log('Archivo encontrado. Eliminando...');
		    fs.unlink(path);
		  } else {
		    console.log('Archivo no encontrado, no se puede eliminar');
		  }
		});
}

// fs.unlink('./uploads/product-camion (9).jpg',  function (err) {
//   if (err) throw err;
//   console.log('successfully deleted /tmp/hello');
// });

// function resize_banner (filename){
// 	im(filename)
//   .resize('200x200')
//   .to(filename);
// }

// function resize_product (filename){
// var fname = '/'+filename;
// var writeStream = '/public/uploads/250'+filename;
// gm(fname)
// .resize(353, 257)
// .autoOrient()
// .write(writeStream, function (err) {
//   if (!err) console.log(' hooray! ');
// });


// 	console.log(filename);
// 	// var fname = './'+filename;
// 	// console.log(filename);
// im.convert([filename, '-resize', '25x120', 'kittens-small.jpg'], 
// function(err, stdout){
//   if (err) throw err;
//   console.log('stdout:', stdout);
// });
// 	im.convert()
}