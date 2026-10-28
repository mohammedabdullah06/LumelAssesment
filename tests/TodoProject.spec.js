
const { test, expect } = require('@playwright/test');
const Todourl = 'https://todomvc.com/examples/angular/dist/browser/#/all';

  test.beforeEach (async ({page})=>{
   await page.goto(Todourl);


 } );

 test('Add to-do is working. (Verify if the item is added to the list )', async ({ page }) => {
    const todoinput = page.getByPlaceholder('What needs to be done?');
    await todoinput.fill('drinking some water at frequent time');
    await todoinput.press('Enter');

    const todoitem = page.locator('.todo-list li');
    await expect (todoitem).toHaveText('drinking some water at frequent time');
    await expect (todoitem).toHaveCount(1);

});

test('2.Marking an item as complete works. (Verify if the item is crossed out and verify the counter on the bottom-left) )', async ({ page }) => {
    const todoinput = page.getByPlaceholder('What needs to be done?');
    await todoinput.fill('drinking some water at frequent time');
    await todoinput.press('Enter');
    const todoitem = page.locator('.todo-list li').first();
    await todoitem.locator('.toggle').check();

    await expect(todoitem).toHaveClass(/completed/);

    const todoCount = page.locator('.todo-count');
    await expect(todoCount).toHaveText('0 items left' );


}); 

test('3.Delete a to-do (Verify if the item is removed from the list)) )', async ({ page }) => {
    const todoinput = page.getByPlaceholder('What needs to be done?');
    await todoinput.fill('drinking some water at frequent time');
    await todoinput.press('Enter');
    const todoitem = page.locator('.todo-list li').first();
    await todoitem.hover();
    await todoitem.locator('.destroy').click();
    await expect(page.locator('.todo-list li')).toHaveCount(0);

});   

test('4.Filtering a to-do is working (Click on the Active button and verify if it shows the Active items. Click on Completed and verify if it shows the completed items))) )', async ({ page }) => {
    const todoinput = page.getByPlaceholder('What needs to be done?');
    await todoinput.fill('Active Task');
    await todoinput.press('Enter');
    await todoinput.fill('completed Task');
    await todoinput.press('Enter');

    await page.locator('.todo-list li').filter({ hasText: 'completed Task'}).locator('.toggle').check();
    await page.getByRole('link',{name : 'Active'}).click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li').first()).toHaveText('Active Task');

    //await page.locator('.todo-list li').filter({ hasText: 'Active Task'}).locator('.toggle').check();
    await page.getByRole('link',{name : 'Completed'}).click();
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li').first()).toHaveText('completed Task');


  

});   

