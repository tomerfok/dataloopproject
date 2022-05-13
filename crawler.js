import createBrowserless from 'browserless';
import getHTML from 'html-get';
import parse from 'node-html-parser';

let args = process.argv.slice(2);

let url = args[0];
let depth = +args[1];

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

getContent(url)
    .then(content => {
        console.log(content)
        process.exit()
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    });