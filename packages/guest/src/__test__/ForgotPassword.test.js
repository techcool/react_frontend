import { Config } from './config';
import { LoginPage, ForgetPassword } from './locator';
import { scrollToBottom, scrollToTop, sleep } from './helper';
const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');
const { async } = require('q');
 test("Forgot Password", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();

    // Enable both JavaScript and CSS coverage
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    await page.goto(LoginPage.url, { waitUntil: 'load', timeout: 0 });
    await sleep(1000);

    await scrollToBottom(page);

    const linkHandlers = await page.$x(`//a[contains(text(), "Forgot Password?")]`);
    await linkHandlers[0].click();
    await sleep(3000);

    await page.waitForSelector(ForgetPassword.email.selector);
    await sleep(1000);

    await page.type(ForgetPassword.email.selector, ForgetPassword.email.value);

    const [continueStep2] = await page.$x(`//button[contains(text(),"Send Email")]`);
    await continueStep2.click();
    await sleep(2000);

    let tryAnother = await page.$x(`//a[contains(text(), "Try Another Way!")]`);
    await tryAnother[0].click();
    await sleep(2000);

    await page.waitForSelector(ForgetPassword.phone.selector);
    await sleep(1000);

    await page.type(ForgetPassword.phone.selector, ForgetPassword.phone.value);
    await sleep(2000);

    const [sendSms] = await page.$x(`//button[contains(text(),"Send SMS")]`);
    await sendSms.click();
    await sleep(4000);

    await page.waitForSelector(ForgetPassword.otp.selector);
    await sleep(1000);

    await page.type(ForgetPassword.otp.selector, ForgetPassword.otp.value);
    const [otp] = await page.$x(`//button[contains(text(),"Verify Otp")]`);

    await otp.click();

    await sleep(4000);

    // Disable both JavaScript and CSS coverage
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './nyc/forgotPassword.nyc_output' })

    await browser.close();

  });

}, (500000));