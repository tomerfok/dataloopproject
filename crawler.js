import cup from "crawler-url-parser";
import getImageUrls from "get-image-urls";

let args = process.argv.slice(2);
const url = args[0];
const depth = +args[1];

let htmlStr = '<html><body> \
    <a href="http://best.question.stackoverflow.com">subdomain</a><br /> \
    <a href="http://faq.stackoverflow.com">subdomain</a><br /> \
    <a href="http://stackoverflow.com">updomain</a><br /> \
    <a href="http://www.google.com">external</a><br /> \
    <a href="http://www.facebook.com">external</a><br /> \
    <a href="http://question.stackoverflow.com/aaa/bbb/ccc">sublevel</a><br /> \
    <a href="http://question.stackoverflow.com/aaa/bbb/zzz">sublevel</a><br /> \
    <a href="http://question.stackoverflow.com/aaa/">uplevel</a><br /> \
    <a href="http://question.stackoverflow.com/aaa/ddd">samelevel</a><br /> \
    <a href="http://question.stackoverflow.com/aaa/eee">samelevel</a><br /> \
    <a href="http://question.stackoverflow.com/aaa/ddd/eee">internal</a><br /> \
    <a href="http://question.stackoverflow.com/zzz">internal</a><br /> \
</body></html>';
let urls = cup.extract(htmlStr, 'https://stackoverflow.com/');

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