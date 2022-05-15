import cheerio from "cheerio";
import getImageUrls from "get-image-urls";
// import fs from "fs";

let results = [];

let args = process.argv.slice(2);
const url = args[0];
const depth = +args[1];

const got = (...args) =>
    import ('got').then(({ default: got }) => got(...args));

const extractLinks = async(url) => {
    try {
        const response = await got(url);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');

        const links = [];
        linkObjects.each((index, element) => {
            links.push($(element).attr('href'));
        });

        console.log(links);
        return links;
    } catch (error) {
        console.log(error.response.body);
    }
    return null;
};

const extractImages = async(url) => {
    try {
        const response = await got(url);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');

        const links = [];
        linkObjects.each((index, element) => {
            links.push({
                text: $(element).text(), // get the text
                href: $(element).attr('href'), // get the href attribute
                //                links.push($(element).attr('img'));
            });
        });

        console.log(links);
        return links;
    } catch (error) {
        console.log(error.response.body);
    }
    return null;
};

getImageUrls(url)
    .then((images) => {
        console.log('Images found', images.length);
        console.log(images);
    })
    .catch((e) => {
        console.log('ERROR', e);
    });

const getChildLinks = (url) => {
    return extractLinks(url);
};

const getImagesUrl = (url) => {
    return getImageUrls(url);
};

//let baseUrlImages = getImagesUrl(url);
let Urls = extractLinks(url);
let baseUrlImages = extractImages(url);

results.push({ imagesUrl: baseUrlImages, sourceUrl: url, depth: 0 });

let allChildLinks = [];
let allChildLinksPointer;

for (let depthPointer = 0; depthPointer < depth; depthPointer++) {

    let currentChildLinks = getChildLinks(currentChildLinks[depthPointer]);
    for (let i = 0; i < currentChildLinks.length; i++) {

    }

    for (childLinkPointer = 0; childLinkPointer < currentChildLinks; childLinkPointer++) {
        let imagesUrl = getImagesUrl(currentChildLinks[childLinkPointer]);

        if (imagesUrl.length > 0) {
            results.push({ imagesUrl: imagesUrl, sourceUrl: currentChildLinks[childLinkPointer], depth: depthPointer });
        }
    }
}