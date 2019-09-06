const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://tech.uff4u.com:8000/files/ufa/2.0/accounting_uk/1.2/index.html', {
        waitUntil: 'networkidle2'
    });
    await page.pdf({
        path: 'hn.pdf',
        format: 'A4'
    });

    await browser.close();
})();