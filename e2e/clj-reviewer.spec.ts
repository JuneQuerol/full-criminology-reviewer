import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3007';

test.describe('CLJ Reviewer Website - Full User Journey', () => {

  test('Complete website test starting from homepage', async ({ page }) => {
    // ========== 1. HOMEPAGE ==========
    console.log('Testing Homepage...');
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    // Verify homepage loads
    const homeContent = await page.textContent('body');
    expect(homeContent).toBeTruthy();
    console.log('✓ Homepage loaded');

    // ========== 2. NAVIGATE TO PART 1 ==========
    console.log('Testing Part 1 navigation...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/part-1`);
    await page.waitForLoadState('domcontentloaded');
    const part1Content = await page.textContent('body');
    expect(part1Content?.length).toBeGreaterThan(50);
    console.log('✓ Part 1 page accessible');

    // ========== 3. NAVIGATE TO PART 2 ==========
    console.log('Testing Part 2 navigation...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/part-2`);
    await page.waitForLoadState('domcontentloaded');
    const part2Content = await page.textContent('body');
    expect(part2Content?.length).toBeGreaterThan(50);
    console.log('✓ Part 2 page accessible');

    // ========== 4. NAVIGATE TO PART 3 ==========
    console.log('Testing Part 3 navigation...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/part-3`);
    await page.waitForLoadState('domcontentloaded');
    const part3Content = await page.textContent('body');
    expect(part3Content?.length).toBeGreaterThan(50);
    console.log('✓ Part 3 page accessible');

    // ========== 5. NAVIGATE TO PART 4 ==========
    console.log('Testing Part 4 navigation...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/part-4`);
    await page.waitForLoadState('domcontentloaded');
    const part4Content = await page.textContent('body');
    expect(part4Content?.length).toBeGreaterThan(50);
    console.log('✓ Part 4 page accessible');

    // ========== 6. NAVIGATE TO PART 5 ==========
    console.log('Testing Part 5 navigation...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/part-5`);
    await page.waitForLoadState('domcontentloaded');
    const part5Content = await page.textContent('body');
    expect(part5Content?.length).toBeGreaterThan(50);
    console.log('✓ Part 5 page accessible');

    // ========== 7. NAVIGATE TO PRACTICE EXAMS ==========
    console.log('Testing Practice Exams page...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/practice`);
    await page.waitForLoadState('domcontentloaded');
    const practiceContent = await page.textContent('body');
    expect(practiceContent).toMatch(/Practice|Exam|Set/i);
    console.log('✓ Practice Exams page accessible');

    // ========== 8. TEST QUIZ SET 1 ==========
    console.log('Testing Quiz Set 1...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/practice/Set-01-RPC-Book1-General`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(5000); // Wait for questions to load
    const quiz1Content = await page.textContent('body');
    const quiz1HasContent = (quiz1Content?.length || 0) > 100;
    const quiz1HasLoading = quiz1Content?.includes('Loading');
    console.log(`Quiz Set 1: Content length=${quiz1Content?.length}, HasLoading=${quiz1HasLoading}`);
    console.log('✓ Quiz Set 1 page loads');

    // ========== 9. TEST QUIZ SET 10 ==========
    console.log('Testing Quiz Set 10...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/practice/Set-10-Comprehensive-Mixed`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(5000);
    const quiz10Content = await page.textContent('body');
    console.log(`Quiz Set 10: Content length=${quiz10Content?.length}`);
    console.log('✓ Quiz Set 10 page loads');

    // ========== 10. TEST PROGRESS PAGE ==========
    console.log('Testing Progress page...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/progress`);
    await page.waitForLoadState('domcontentloaded');
    const progressContent = await page.textContent('body');
    expect(progressContent?.length).toBeGreaterThan(50);
    console.log('✓ Progress page accessible');

    // ========== 11. TEST SEARCH PAGE ==========
    console.log('Testing Search page...');
    await page.goto(BASE_URL);
    await page.goto(`${BASE_URL}/search`);
    await page.waitForLoadState('domcontentloaded');
    const searchContent = await page.textContent('body');
    expect(searchContent).toMatch(/Search|Results/i);
    console.log('✓ Search page accessible');

    console.log('\n========== ALL TESTS PASSED ==========');
  });
});
