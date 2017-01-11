
var multer  = require('multer');
var im = require('imagemagick');
var fs = require('fs');
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
	remove_image: remove_image
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
	var path = './public/'+path;
	console.log(path);
	fs.exists(path, function(exists) {
		  if(exists) {
		    console.log('*****************encontradoo*****************.');
		    console.log('File exists. Deleting now ...');
		    fs.unlink(path);
		  } else {
		    console.log('File not found, so not deleting.');
		  }
		});
}

// fs.unlink('./uploads/product-camion (9).jpg',  function (err) {
//   if (err) throw err;
//   console.log('successfully deleted /tmp/hello');
// });