import cheerio from "cheerio";
import getImageUrls from "get-image-urls";
// import fs from "fs";

let args = process.argv.slice(2);
const url = args[0];
const depth = +args[1];

const got = (...args) =>
    import ('got').then(({ default: got }) => got(...args));

// Extracts images from url and pushes them to global images
const extractImages = async(url) => {
    try {
        const response = await got(url);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('img');

        linkObjects.each((index, element) => {
            images.push({
                url: url,
                href: $(element).attr('src'), // get the href attribute
                //                links.push($(element).attr('img'));
            });
        });
    } catch (error) {
        console.log(error.response.body);
    }
};

// Extracts child links from url and pushes them to global links, together with depth attribute
const extractLinks = async(url, depth) => {
    try {
        const response = await got(url);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');

        let linksReturned = [];
        linkObjects.each((index, element) => {
            linksReturned.push({
                depth: depth,
                href: $(element).attr('href'),
            });
        });
        return linksReturned;
    } catch (error) {
        console.log(error.response.body);
    }
    return null;
};

//Extracts 
const extractLinksFromURLs = (urls, depth) => {
    try {
        // pass over urls and call extractLinks
        let linksReturned = [];
        for (let url in urls) {
            extractLinks(url, depth).then(val => linksReturned = val.slice());
        }
        return linksReturned;
    } catch (error) {
        console.log(error.response.body);
    }
    return null;
};

// Example of working functions extractLinks and extractImages - for debug only
let urls = [];
let links = [];
extractLinks(url, 0).then(val => links = val.slice());
urls = links;

// TODO:
// Synchronize worker functions extractLinks and extractImages
// Pass over links and extract child links
for (let depthPointer = 1; depthPointer < depth; depthPointer++) {
    // Extracts child links and pushes them to global links
    links = extractLinksFromURLs(links, depthPointer);
    urls.concat(links);
}

let images = []
for (let link = 0; link < links; link++) {
    let images_list = []
    extractImages(links[link]).then(val => images_list = val.slice());
    images.concat(images_list);
}