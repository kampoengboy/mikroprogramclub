/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      nama : 'string',
      nim : 'string',
      email : 'string',
      notelp : 'string',
      alasan : 'string',
      skill : 'string',
      prestasi : 'string',
      aplikasi : 'string',
      toki : 'string',
      admin: {
            type: 'boolean',
            defaultsTo: false
      },
      encryptedPassword: 'string',
      username : 'string',
    }
};
