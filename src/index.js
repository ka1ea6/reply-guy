import config from "./config/index.js";
import { delay, getPage } from "./utils/index.js";

(async () => {
  const page = await getPage({ headless: false });

  await page.goto("https://www.reddit.com/login", {
    timeout: "0",
  });

  await page.setViewport({ height: 1080, width: 1980 });
  await page.waitForSelector("#login-username");
  await page.waitForSelector("#login-password");

  await page.type("#login-username", config.REDDIT_USERNAME, { delay: 100 });
  await page.type("#login-password", config.REDDIT_PASSWORD, { delay: 100 });

  //
  await page.$eval("shreddit-overlay-display", (el) => {
    const overlayShadow = el.shadowRoot;
    const signUpDrawerShadow = overlayShadow.querySelector(
      "shreddit-signup-drawer"
    ).shadowRoot;
    const slotterShadow =
      signUpDrawerShadow.querySelector("shreddit-slotter").shadowRoot;
    const loginButton = slotterShadow.querySelector("button");
    loginButton.disabled = false;
    loginButton.click();
  });

  // navigating to the article
  await page.waitForSelector('[slot="full-post-link"]', { timeout: 0 });
  await page.$eval('[slot="full-post-link"]', (el) => el.click());

  await page.waitForSelector("comment-composer-host");

  // focusing on the text area
  await page.$eval("comment-composer-host", (el) => el.focus());

  // Delaying to wait for the lexical editor to initialize
  await delay(2);
  await page.type('[data-lexical-editor="true"]', "Hello world", {
    delay: 100,
  });

  await page.$eval('[type="submit"]', (el) => el.click());

  // delay to wait for form submission
  await delay(2);
  await page.close();
  await page.browser().close();
})();
