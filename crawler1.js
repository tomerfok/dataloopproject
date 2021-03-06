import Crawler from "crawler";
import getImageUrls from "get-image-urls";

let args = process.argv.slice(2);
const url = args[0];
const depth = +args[1];

let c = new Crawler({
    maxConnections: depth,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log($("title").text());
        }
        done();
    }
});

c.queue([{
    uri: url,
    jQuery: false,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Grabbed', res.body.length, 'bytes');
        }
        done();
    },
}])

// .then((error, res, done) => {
//     var $ = res.$;
//     console.log($("title").text());
// })
// .catch((e) => {
//     console.log('ERROR', e);
// });

getImageUrls(url)
    .then((images) => {
        console.log('Images found', images.length);
        console.log(images);
    })
    .catch((e) => {
        console.log('ERROR', e);
    })

console.log(c);

























// import createBrowserless from 'browserless';
// import getHTML from 'html-get';
// import jsdom from "jsdom";
// import nodeHtmlParser from 'node-html-parser';
// const { parse } = nodeHtmlParser;
// const { JSDOM } = jsdom;

// let args = process.argv.slice(2);

// let url = args[0];
// let depth = +args[1];
// let content;
// let root;

// const browserlessFactory = createBrowserless();
// process.on('exit', () => {
//     browserlessFactory.close()
// });

// const getContent = async url => {
//     const browserContext = browserlessFactory.createContext()
//     const getBrowserless = () => browserContext
//     const result = await getHTML(url, { getBrowserless })
//     await getBrowserless((browser) => browser.destroyContext())
//     return result;
// };

// const dom = new JSDOM(url, { includeNodeLocations: true });
// const document = dom.window.document;
// const hrefEl = document.querySelectorAll("href");
// const imgEl = document.querySelectorAll("img");


// getContent(url)
//     .then(content => {
//         content = content;
//         console.log(content);

//         root = parse(content.html);
//         console.log(root);

//         process.exit();
//     })
//     .catch(error => {
//         console.error(error);
//         process.exit(1);
//     });