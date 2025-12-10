import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3007';

test.describe('Interactive Quiz', () => {

  test('should show instant feedback on answer selection', async ({ page }) => {
    // Navigate to the first quiz page
    await page.goto(`${BASE_URL}/practice/Set-01-RPC-Book1-General`);
    await page.waitForLoadState('domcontentloaded');

    // Get the first question
    const firstQuestion = page.locator('.prose > div').first();

    // --- Test Case 1: Select the WRONG answer ---

    // Click on the first choice (which is incorrect for the first question)
    const firstChoice = firstQuestion.locator('div.space-y-3 > div').first();
    await firstChoice.click();

    // Assert that the first choice has the 'incorrect' style (red background)
    await expect(firstChoice).toHaveClass(/bg-red-500\/20/);

    // Assert that the 'Incorrect' feedback is shown
    const incorrectFeedback = firstQuestion.locator('h3:has-text("Incorrect")');
    await expect(incorrectFeedback).toBeVisible();

    // Assert that the explanation is visible
    const explanation = firstQuestion.locator('p:has-text("Explanation:")');
    await expect(explanation).toBeVisible();

    // Assert that the correct answer is highlighted
    const correctChoice = firstQuestion.locator('div.space-y-3 > div').nth(1);
    await expect(correctChoice).toHaveClass(/bg-green-500\/20/);

    // --- Test Case 2: Reload and select the RIGHT answer ---
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    
    const firstQuestionAgain = page.locator('.prose > div').first();

    // Click on the second choice (which is correct for the first question)
    const secondChoice = firstQuestionAgain.locator('div.space-y-3 > div').nth(1);
    await secondChoice.click();

    // Assert that the second choice has the 'correct' style (green background)
    await expect(secondChoice).toHaveClass(/bg-green-500\/20/);

    // Assert that the 'Correct!' feedback is shown
    const correctFeedback = firstQuestionAgain.locator('h3:has-text("Correct!")');
    await expect(correctFeedback).toBeVisible();

    // Assert that the explanation is visible
    const explanationAgain = firstQuestionAgain.locator('p:has-text("Explanation:")');
    await expect(explanationAgain).toBeVisible();
  });
});
