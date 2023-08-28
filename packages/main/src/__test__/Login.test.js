import { Config } from "./config";
import { scrollToBottom, scrollToTop, sleep } from "./helper";
import { LoginPage } from "./locator";
const puppeteer = require("puppeteer");
const pti = require("puppeteer-to-istanbul");
const { async } = require("q");

test("Login", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();

    // Enable both JavaScript and CSS coverage
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    await page.goto(LoginPage.url, { waitUntil: "load", timeout: 0 });

    await sleep(1000);
    await scrollToBottom(page);

    await page.click("#submit_btn");

    await scrollToTop(page);

    await page.waitForSelector(LoginPage.email);
    await sleep(1000);
    await page.type(LoginPage.email, LoginPage.inputValue.student.email);

    await page.waitForSelector(LoginPage.password);
    await sleep(1000);
    await page.type(LoginPage.password, LoginPage.inputValue.student.password);

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);
    await sleep(6000);

    // Disable both JavaScript and CSS coverage
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage()
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: "./.nyc_output" });


    await browser.close();

  });

}, (500000));
