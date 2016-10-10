import File from '../models/file.model';

import multer from 'multer';
import fs from 'fs';
const DIR = './uploads/';
// const PATH = './dist/src/assets/uploads/';
const PATH = '/assets/uploads/';
const SERVER_DIR = './src' + PATH;

let getFilePath = (fileId, fileType) => {
    return PATH + fileId + (fileType ? `/${fileType}` : '');
}

export default (app, router, auth) => {

    let upload = multer({dest: SERVER_DIR}).single('file');

    router.route('/files')

    .get((req, res) => {
        fs.readdir(SERVER_DIR, (err, pictures) => {
            pictures = pictures && pictures.map((picture) => getFilePath(picture));
            res.json(pictures);
        });
    })

    .post((req, res) => {
      upload(req, res, (err) => {
        if (err) {
          return res.end(err.toString());
        }
            res.json(req.file);
        });
    });

    router.route('/files/meta')

    .post((req, res) => {
          File.create( {

            name : req.body.name,

            description : req.body.description,

            type : req.body.type,

            file_id : req.body.file_id,

            path: getFilePath(req.body.file_id),

        }, (err, feedback) => {

            if (err)
              res.send(err);

            // DEBUG
            console.log(`Feedback created: ${feedback}`);

            // return the new `expense` to our front-end
            res.json(feedback);
        });
    });
};
