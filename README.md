# Moxymind API Test Suite

Playwright-based API test automation for the [reqres.in](https://reqres.in) REST API, implemented as a Moxymind technical task.

## Test Coverage

### GET /api/users
- Returns HTTP 200
- `total` field matches expected value
- First and second user `last_name` match expected data
- `data` array length equals `total`
- Response field types (`page`, `per_page`, `total`, `total_pages`, `data[*]`) are validated

### POST /api/users
- Returns HTTP 201
- Response body contains `id`, `name`, `job`, `createdAt`, and `_meta`
- `id` is a string; `createdAt` matches ISO 8601 format
- Response reflects the submitted `name` and `job`
- Response time is under 150 ms
- Data-driven: runs against multiple users defined in `test-data/users-post.json`

## Tech Stack

| Tool | Version |
|---|---|
| Node.js | v18+ |
| Playwright | ^1.62 |
| TypeScript | via `@types/node` |
| dotenv | ^17 |
| zod | ^4 |

## Project Structure

```
tests/
├─ get.spec.ts    -> GET /api/users tests
└─ post.spec.ts   -> POST /api/users tests
test-data/
├─ users-get-response.json  -> Expected GET response data
└─ users-post.json          -> User payloads for POST tests
example.env       -> API key template
```

## Installation

1. Install [Node.js](https://nodejs.org/) v18 or newer.

2. Clone the repository:
   ```bash
   git clone https://github.com/niC00L/MoximindAPI.git
   cd MoximindAPI
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the project root (copy from `example.env`):
   ```bash
   REQRES_API_KEY=your_api_key_here
   ```
   Get a free API key at [reqres.in](https://reqres.in).

## Usage

Run from the project root:

| Command | Description |
|---|---|
| `npm test` | Run all tests |
| `npm run test:get` | Run GET tests from file get.spec.ts |
| `npm run test:post` | Run POST tests from file post.spec.ts |
| `npm run report` | Open the last HTML report |