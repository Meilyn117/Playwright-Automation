const {test, chromium, expect} = require("@playwright/test");
import path from 'path';



test("Ckav Modal-opening", async ({page})=> 
{
await page.goto("https://fiber.att.com/");
await page.evaluate(() => {
  const iframe = document.getElementById('pypestream-wrapper');
  if (iframe) {
    iframe.style.display = 'none';
  }
});


const streetTextField = page.getByRole('textbox', { name: 'Street address' }).nth(1);
const zipCodeTextField = page.getByRole('textbox', { name: 'Zip code' }).nth(1);
const closeButton = page.locator('.close-icon-wrapper');

await page.getByRole('link', { name: 'Order online', exact: true }).click();
await expect(page.getByText('is available in your area')).toBeVisible();
await streetTextField.fill('873 Junction Dr');
await zipCodeTextField.fill('91911');
await closeButton.click();
await page.locator('.marquee-background-image-outer-wrapper').click();
await expect(page.getByText('is available in your area')).toBeVisible();
await streetTextField.fill('100 TX-332');
await zipCodeTextField.fill('77566');
await closeButton.click();
await page.locator('.merch-offer-main-card').click();
await expect(page.getByText('is available in your area')).toBeVisible();
await streetTextField.fill('300 LEGACY DR');
await zipCodeTextField.fill('75023');
await closeButton.click();

});


test("Ckav AddressValidation-nomatch", async ({page})=> 
{
  const orderOnlineButton = page.getByRole('link', { name: 'Order online', exact: true });
  const streetTextField = page.getByRole('textbox', { name: 'Street address' }).nth(1);
  const zipCodeTextField = page.getByRole('textbox', { name: 'Zip code' }).nth(1);
  const ckavButton = page.getByRole('button', { name: 'Check availability' }).nth(1)
  
        await page.goto("https://fiber.att.com/");
        await orderOnlineButton.click();
        await expect(page.getByText('is available in your area')).toBeVisible();
        await streetTextField.fill('873 Junction Dr');
        await zipCodeTextField.fill('91911');
        await ckavButton.click();
        await expect(page.getByText('We\'re sorry, we can\'t find your address.')).toBeVisible();

});

test("Ckav AddressValidation-closematch-returnAlternateAddress", async ({page})=> 
{
        const closeButton = page.locator('.close-icon-wrapper');
        const orderOnlineButton = page.getByRole('link', { name: 'Order online', exact: true });
        const streetTextField = page.getByRole('textbox', { name: 'Street address' }).nth(1);
        const zipCodeTextField = page.getByRole('textbox', { name: 'Zip code' }).nth(1);
        const ckavButton = page.getByRole('button', { name: 'Check availability' }).nth(1);


        await page.goto("https://fiber.att.com/");
        await orderOnlineButton.click();
        await expect(page.getByText('is available in your area')).toBeVisible();
        await streetTextField.fill('100 TX-332');
        await zipCodeTextField.fill('77566');
        await ckavButton.click();
        await expect(page.getByText('We couldn’t find that address, but we did find a few close matches.')).toBeVisible();
        await expect(
                page.getByRole('listitem').filter({ hasText: '100 HIGHWAY 332 W, LAKE JACKSON, TX 77566 ' })
        ).toBeVisible();
        await closeButton.click();

}); 

test("Ckav AddressValidation-ValidAddressRedirect", async ({page})=> 
{
  const orderOnlineButton = page.getByRole('link', { name: 'Order online', exact: true });
  const streetTextField = page.getByRole('textbox', { name: 'Street address' }).nth(1);
  const zipCodeTextField = page.getByRole('textbox', { name: 'Zip code' }).nth(1);
  const ckavButton = page.getByRole('button', { name: 'Check availability' }).nth(1);

        await page.goto("https://fiber.att.com/");
        await orderOnlineButton.click();
        await expect(page.getByText('is available in your area')).toBeVisible();
        await streetTextField.fill('873 Junction Dr');
        await zipCodeTextField.fill('75013');
        await ckavButton.click();
        await page.waitForURL('https://www.att.com/buy/internet/?product_suite=NBB&fiber_intent=true&coupon_id=EXTRA50&addressId=00000BDQVU');
});