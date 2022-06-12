const { test, expect, Playwright } = require('@playwright/test');

const MAIN_PAGE = 'http://localhost:3000/';
const THIS_PAGE = 'http://localhost:3000/userprofile';
const TARGET_PAGES = ['games', 'leaderboards', 'userprofile', 'table', 'login'];
const NavButtons = ['GAMES', 'LEADERBOARDS', 'PROFILE', 'CURRENT GAME', 'SIGN IN'];

test('navTest', async ({ page }) => {

  for (let index = 0; index < NavButtons.length; index++) {
    await page.goto(THIS_PAGE);
    let el = NavButtons[index];
    let targetPage = MAIN_PAGE + TARGET_PAGES[index];
    await expect(page.locator('button', {hasText: el})).toBeVisible();
    await page.locator('button', {hasText: el}).click();

    const url=await page.url();//get the url of the current page

    await expect(url).toBe(targetPage)
  }

})