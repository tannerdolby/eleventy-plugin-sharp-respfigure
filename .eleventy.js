const sharp = require("sharp");
const fs = require("fs");

module.exports = (eleventyConfig, pluginNamespace) => {
    eleventyConfig.namespace(pluginNamespace, () => {
        eleventyConfig.addPairedShortcode("respfigure", (data, src, alt, imgDir, caption, className, widthData) => {
            const fileName = src.slice(0, -4);
    
            function toKB(size) {
                const kbRatio = 1 * Math.pow(10, -3);
                return (size * kbRatio).toFixed(2);
            }
    
            function smallJpeg(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .jpeg({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.jpg`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.jpg`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.jpg`, err);
                    });
            }
            function smallWebp(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .webp({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.webp`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.jpg`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.jpg`, err);
                    });
            }
            function medJpeg(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .jpeg({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.jpg`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.jpg`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.jpg`, err);
                    });
            }
            function medWebp(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .webp({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.webp`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.webp`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.webp`, err);
                    });
            }
            function largeJpeg(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .jpeg({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.jpg`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.jpg`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.jpg`, err);
                    });
            }
            function largeWebp(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .webp({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.webp`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.webp`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.webp`, err);
                    });
            }
            function xlJpeg(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .jpeg({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.jpg`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.jpg`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.jpg`, err);
                    });
            }
            function xlWebP(stream, file, width) {
                var width = parseInt(width);
                return stream
                    .clone()
                    .resize({ width })
                    .webp({ quality: 85 })
                    .toFile(`${imgDir}${file}-${width}.webp`)
                    .then(res => {
                        res.file = `${imgDir}${file}-${width}.webp`;
                        res.size = `${toKB(res.size)} KB`;
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(`Error transforming ${imgDir}${file}-${width}.webp`, err);
                    });
            }
    
            function transform(src) {
                const fileName = src.slice(0, -4);
                const parentStream = sharp(imgDir.concat(src));
                if (widthData.one) {
                    smallJpeg(parentStream, fileName, widthData.one.width);
                    smallWebp(parentStream, fileName, widthData.one.width);
                }
                if (widthData.two) {
                    medJpeg(parentStream, fileName, widthData.two.width);
                    medWebp(parentStream, fileName, widthData.two.width);
                }
                if (widthData.three) {
                    largeJpeg(parentStream, fileName, widthData.three.width);
                    largeWebp(parentStream, fileName, widthData.three.width);
                }
                if (widthData.four) {
                    xlJpeg(parentStream, fileName, widthData.four.width);
                    xlWebP(parentStream, fileName, widthData.four.width);
                }
            }
    
            if (widthData.one) {
                var jpegSources = 
                    `
                    \t\t<source type='image/jpeg' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.jpg'>
                    `;
                    var webpSources = 
                    `
                    \t\t<source type='image/webp' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.webp'>
                    `;
                    var figureMarkup =
                        `
                        <figure class='${className}'>
                            <picture>
                                ${webpSources}
                                ${jpegSources}
                                <img src='${imgDir}${fileName}-${widthData.one.width}.jpg' alt='${alt}' loading='lazy'>
                            </picture>
                            <figcaption>${caption}</figcaption>
                        </figure>
                        `;
            }
    
            if (widthData.two) {
                var jpegSources = 
                    `
                    \t\t<source type='image/jpeg' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.jpg'>
                    \t\t<source type='image/jpeg' media='${widthData.two.media}' srcset='${imgDir}${fileName}-${widthData.two.width}.jpg'>
                    `;
                    var webpSources = 
                    `
                    \t\t<source type='image/webp' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.webp'>
                    \t\t<source type='image/webp' media='${widthData.two.media}' srcset='${imgDir}${fileName}-${widthData.two.width}.webp'>
                    `;
                    var figureMarkup =
                        `
                        <figure class='${className}'>
                            <picture>
                                ${webpSources}
                                ${jpegSources}
                                <img src='${imgDir}${fileName}-${widthData.one.width}.jpg' alt='${alt}' loading='lazy'>
                            </picture>
                            <figcaption>${caption}</figcaption>
                        </figure>
                        `;
            }
    
            if (widthData.three) {
                var jpegSources = 
                    `
                    \t\t<source type='image/jpeg' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.jpg'>
                    \t\t<source type='image/jpeg' media='${widthData.two.media}' srcset='${imgDir}${fileName}-${widthData.two.width}.jpg'>
                    \t\t<source type='image/jpeg' media='${widthData.three.media}' srcset='${imgDir}${fileName}-${widthData.three.width}.jpg'>
                    `;
                    var webpSources = 
                    `
                    \t\t<source type='image/webp' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.webp'>
                    \t\t<source type='image/webp' media='${widthData.two.media}' srcset='${imgDir}${fileName}-${widthData.two.width}.webp'>
                    \t\t<source type='image/webp' media='${widthData.three.media}' srcset='${imgDir}${fileName}-${widthData.three.width}.webp'>
                    `;
                    var figureMarkup =
                        `
                        <figure class='${className}'>
                            <picture>
                                ${webpSources}
                                ${jpegSources}
                                <img src='${imgDir}${fileName}-${widthData.one.width}.jpg' alt='${alt}' loading='lazy'>
                            </picture>
                            <figcaption>${caption}</figcaption>
                        </figure>
                        `;
            }
    
            if (widthData.four) {
                var jpegSources = 
                    `
                    \t\t<source type='image/jpeg' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.jpg'>
                    \t\t<source type='image/jpeg' media='${widthData.two.media}' srcset='${imgDir}${fileName}-${widthData.two.width}.jpg'>
                    \t\t<source type='image/jpeg' media='${widthData.three.media}' srcset='${imgDir}${fileName}-${widthData.three.width}.jpg'>
                    \t\t<source type='image/jpeg' media='${widthData.four.media}' srcset='${imgDir}${fileName}-${widthData.four.width}.jpg'>
                    `;
                    var webpSources = 
                    `
                    \t\t<source type='image/webp' media='${widthData.one.media}' srcset='${imgDir}${fileName}-${widthData.one.width}.webp'>
                    \t\t<source type='image/webp' media='${widthData.two.media}' srcset='${imgDir}${fileName}-${widthData.two.width}.webp'>
                    \t\t<source type='image/webp' media='${widthData.three.media}' srcset='${imgDir}${fileName}-${widthData.three.width}.webp'>
                    \t\t<source type='image/webp' media='${widthData.four.media}' srcset='${imgDir}${fileName}-${widthData.four.width}.webp'>
                    `;
                    var figureMarkup =
                        `
                        <figure class='${className}'>
                            <picture>
                                ${webpSources}
                                ${jpegSources}
                                <img src='${imgDir}${fileName}-${widthData.one.width}.jpg' alt='${alt}' loading='lazy'>
                            </picture>
                            <figcaption>${caption}</figcaption>
                        </figure>
                        `;
            }
            const files = {
                one: {
                    jpg: widthData.one ? `${imgDir}${fileName}-${widthData.one.width}.jpg` : undefined,
                    webp: widthData.one ? `${imgDir}${fileName}-${widthData.one.width}.webp` : undefined
                },
                two: {
                    jpg: widthData.two ? `${imgDir}${fileName}-${widthData.two.width}.jpg` : undefined,
                    webp: widthData.two ? `${imgDir}${fileName}-${widthData.two.width}.webp` : undefined,
                },
                three: {
                    jpg: widthData.three ? `${imgDir}${fileName}-${widthData.three.width}.jpg` : undefined,
                    webp: widthData.three ? `${imgDir}${fileName}-${widthData.three.width}.webp` : undefined,
                },
                four: {
                    jpg: widthData.four ? `${imgDir}${fileName}-${widthData.four.width}.jpg` : undefined,
                    webp: widthData.four ? `${imgDir}${fileName}-${widthData.four.width}.webp` : undefined
                }
            }
    
            switch (fs.existsSync(imgDir.concat(src))) {
                case fs.existsSync(files.one.jpg) && fs.existsSync(files.one.webp):
                    break;
                case fs.existsSync(files.two.jpg) && fs.existsSync(files.two.webp):
                    break;
                case fs.existsSync(files.three.jpg) && fs.existsSync(files.three.webp):
                    break;
                case fs.existsSync(files.four.jpg) && fs.existsSync(files.four.webp):
                    break;
                default:
                    console.log("Transforming images, one moment!");
                    transform(src);
                    break;
            }
            return figureMarkup;
        });
    });
};