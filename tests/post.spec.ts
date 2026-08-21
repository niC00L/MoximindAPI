import { test, expect } from '@playwright/test';;
import users from '../test-data/users-post.json';

const RESPONSE_TIME_THRESHOLD = 150; // in milliseconds

for (const user of users) {
    test(`POST user to api - ${user.name}`, async ({ request }) => {
        const response = await request.post('/api/users', { data: user });
        
        const responseData = await response.json();
        await test.step('Validate response status, and data', async () => {
            expect(response.status()).toBe(201);
            expect(Object.keys(responseData).sort()).toEqual(['createdAt', 'id', 'job', 'name', '_meta'].sort());
            expect(responseData).toMatchObject({
                id: expect.any(String),
                createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/),
                name: user.name,
                job: user.job
            });
        });
        
        await test.step('Validate response time', async () => {
            const responseTime = response.timing().responseEnd - response.timing().requestStart;
            console.log(`Response time for user ${user.name}: ${responseTime} ms`);
            expect(responseTime).toBeLessThan(RESPONSE_TIME_THRESHOLD);
        });
    });
}