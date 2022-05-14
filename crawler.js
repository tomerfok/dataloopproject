import createBrowserless from 'browserless';
import getHTML from 'html-get';
import jsdom from "jsdom";
import nodeHtmlParser from 'node-html-parser';
const { parse } = nodeHtmlParser;
const { JSDOM } = jsdom;

let args = process.argv.slice(2);

let url = args[0];
let depth = +args[1];
let content;
let root;

const browserlessFactory = createBrowserless();
process.on('exit', () => {
    browserlessFactory.close()
});

const getContent = async url => {
    const browserContext = browserlessFactory.createContext()
    const getBrowserless = () => browserContext
    const result = await getHTML(url, { getBrowserless })
    await getBrowserless((browser) => browser.destroyContext())
    return result;
};

// url
const dom = new JSDOM('<a href="www.example.com"></a>', { includeNodeLocations: true });
const document = dom.window.document;
const hrefEl = document.querySelector('a');
const imgEl = document.querySelectorAll('img');

console.log(imgEl);
getContent(url)
    .then(content => {
        content = content;
        console.log(content);

        root = parse(content.html);
        const imgEle = root.text.querySelectorAll('img');

        console.log(root);

        process.exit();
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });