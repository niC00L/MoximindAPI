import { test, expect } from '@playwright/test';
import users from '../test-data/users-post.json';
import { z } from 'zod';

const RESPONSE_TIME_THRESHOLD = 150; // in milliseconds
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const postResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    job: z.string(),
    createdAt: z.string().regex(DATE_REGEX),
    _meta: z.object({}).optional()
});

for (const user of users) {
    test(`POST /api/users creates a user - ${user.name}`, async ({ request }) => {
        const response = await request.post('/api/users', { data: user });
        
        const responseData = await response.json();
        await test.step('Validate response status and data', async () => {
            expect(response.status()).toBe(201);
            const result = postResponseSchema.safeParse(responseData);
            expect(result.success, result.error?.message).toBe(true);
            expect(responseData.name).toBe(user.name);
            expect(responseData.job).toBe(user.job);
        });
        
        await test.step('Validate response time', async () => {
            const responseTime = response.timing().responseEnd - response.timing().requestStart;
            console.log(`Response time for user ${user.name}: ${responseTime} ms`);
            expect(responseTime).toBeLessThan(RESPONSE_TIME_THRESHOLD);
        });
    });
}