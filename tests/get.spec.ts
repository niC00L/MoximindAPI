import { test, expect } from '@playwright/test';
import expectedData from '../test-data/users-get-response.json';

test('GET all users', async ({ request }) => {
    const response = await request.get('/api/users?per_page=20');
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    await test.step('Compare response data', async () => {
        expect(responseData.total).toBe(expectedData.total);
        expect(responseData.data[0].last_name).toBe(expectedData.data[0].last_name);
        expect(responseData.data[1].last_name).toBe(expectedData.data[1].last_name);
        expect(responseData.data.length).toBe(responseData.total);
    });

    // Bonus task
    await test.step('Validate data types', async () => {
        expect(typeof responseData.page).toBe('number');
        expect(responseData.page).toBe(expectedData.page);
        expect(typeof responseData.per_page).toBe('number');
        expect(responseData.per_page).toBe(expectedData.per_page);
        expect(typeof responseData.total).toBe('number');
        expect(responseData.total).toBe(expectedData.total);
        expect(typeof responseData.total_pages).toBe('number');
        expect(responseData.total_pages).toBe(expectedData.total_pages);
        expect(typeof responseData.data).toBe('object');
        expect(responseData.data).toEqual(expectedData.data);
        expect(typeof responseData.data[0].id).toBe('number');
        expect(typeof responseData.data[0].email).toBe('string');
        expect(typeof responseData.data[0].first_name).toBe('string');
        expect(typeof responseData.data[0].last_name).toBe('string');
        expect(typeof responseData.data[0].avatar).toBe('string');
    });
});