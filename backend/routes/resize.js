/*
const fs = require('fs');
const sharp = require('sharp');

const resize = (path, width, height) => {
    
    const readStream = fs.createReadStream(path);
    let transform = sharp();

    if (width || height) {
        width = !width ? height : width;
        height = !height ? width : height;
        transform = transform.resize(width, height);
    }

    
    let img = readStream.pipe(transform);
    console.log(img);
    return img;
  
}



module.exports = resize;

*/


'use strict';

const path = require('path');
const gm = require('gm');
const fs = require('fs');

const exists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
};

const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

class Media {
    constructor(path) {
        this.src = path;
    }

    isValidMedia(src) {
        return /\.(jpe?g|png)$/.test(src);
    }

    isValidBaseDir(src) {
        return /^\/public\/images/.test(src);
    }

    thumb(request, response) {
        let image = __dirname +  this.src;

        //if(this.isValidBaseDir(this.src) && this.isValidMedia(this.src) && exists(image)) {
            let width = (request.query.w && /^\d+$/.test(request.query.w)) ? request.query.w : '150';
            let height = (request.query.h && /^\d+$/.test(request.query.h)) ? request.query.h : '150';
            let extension = getFileExtension(this.src);
            let mime = (extension === 'jpeg' || extension === 'jpg') ? 'jpeg' : 'png';

            response.type(mime);
            let img = gm(image).resize(width, height).stream().pipe(response);
            console.log(img)
        /*} else {
            response.sendStatus(404);
        } */   
    }
}

module.exports = Media;
