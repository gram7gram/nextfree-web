const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const parameters = require('../../parameters');

const router = new express.Router({mergeParams: true});

const publicDir = path.resolve(__dirname, '../../public')

const uploadOptions = {
  uploadTimeout: 30 * 1000, //30 sec
  abortOnLimit: true,
  limits: {fileSize: 5 * 1024 * 1024}, // 5MB
}

router.post('/media', fileUpload(uploadOptions), (req, res) => {

  const {file} = req.files

  let ext = file.name.split('.')
  ext = ext[ext.length - 1]

  const uri = `/u/${file.md5}.${ext}`

  file.mv(publicDir + uri)

  res.status(201).json({
    url: parameters.host + uri
  })

});

module.exports = router;
