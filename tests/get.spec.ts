import { test, expect } from '@playwright/test';
import expectedData from '../test-data/users-get-response.json';
import { z } from 'zod';

const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.string().url()
});

const userResponseSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(userSchema)
});

test('GET /api/users returns expected users', async ({ request }) => {
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
        const result = userResponseSchema.safeParse(responseData);
        expect(result.success, result.error?.message).toBe(true);
    });
});