/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
			createPeserta : function(req,res,next){
					User.findOne({'nim':req.param('nim')}, function(err,user1){
							if(err) return next(err);
							if(user1) return res.send("Maaf, NIM ini sudah pernah mendaftar");
							User.findOne({'email':req.param('email')}, function(err,user2){
									if(err) return next(err);
									if(user2) return res.send("Maaf, Email ini sudah pernah mendaftar");
									var usrObj = {
											nim : req.param('nim'),
											nama : req.param('nama'),
											email : req.param('email'),
								      notelp : req.param('notelp'),
								      alasan : req.param('alasan'),
								      skill : req.param('skill'),
								      prestasi : req.param('prestasi'),
								      aplikasi : req.param('aplikasi'),
								      toki : req.param('toki'),
									}
									User.create(usrObj, function(err,users){
											if(err) return next(err);
											return res.redirect('/user/thankyou');
									});
							});
					});
			},
			list : function(req,res,next){
				User.find({'admin':false}, function foundUser(err,users){
					if(err) return next(err);
					res.view({
						users : users
					});
				});
			},
			index : function(req,res,next){
				User.find({'admin':false}, function foundUser(err,users){
					if(err) return next(err);
					res.view({
						users : users
					});
				});
			},
			login : function(req,res,next){
					res.view();
			},
			createAdmin : function(req,res,next){
				require('bcrypt').hash(req.param('password'), 10, function passwordEncrypted(err, encryptedPassword) {
				      if (err) return next(err);
				      var usrObj = {
				        username: req.param('username'),
				        encryptedPassword : encryptedPassword,
				        name: req.param('name'),
				        email: req.param('email'),
				        admin : true
				       }
				       User.create(usrObj, function userCreated(err,user){
										user.save(function(err,user){
											return res.redirect('/');
										});
				       });
				});
			},
			thankyou:function(req,res,next){
				res.view();
			},
			signout : function(req,res,next){
				req.session.destroy();
				return res.redirect('/');
			},
			signin : function(req,res,next) {
				User.findOne({ or : [ {username : req.param('email')}, { email: req.param('email') } ] }, function foundUser(err, user) {
					if (err) return next(err);
					if(!user) {
						return res.redirect('/user/login');
					}
					// Compare password from the form params to the encrypted password of the user found.
					bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
						if (err) return next(err);
						// If the password from the form doesn't match the password from the database...
						if (!valid) {
							return res.redirect('/user/login');
						}
						req.session.authenticated = true;
						req.session.User = user;
						user.save(function(err, user) {
							if (err) return next(err);
							if (req.session.User.admin) {
								return res.redirect('/user');
							}
						});
					});
				});
			},
			destroy : function(req,res,next){
				User.findOne(req.param('id'), function foundUser(err,user){
					User.destroy(user.id, function UserDeleted(err){
						if(err) return next(err);
						return res.redirect('/user');
					});
				});
			}
};
