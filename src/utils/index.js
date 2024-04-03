import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

/**
 *
 * @returns {Promise<import('puppeteer').Page>}
 */
export const getPage = async ({ headless = false }) => {
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  return page;
};

/**
 * @param {Number} amount
 */
export const delay = (seconds = 1) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, seconds * 1000)
  );
};
