# Moxymind technical task
This repository contains the implementation of API test automation tasks for Moxymind. 

## Tech Stack
- Node.js
- Playwright
- TypeScript
- dotenv

## Installation

Install [node.js](https://nodejs.org/) v18 or newer

Clone the repository (or download manually):
```bash
git clone https://github.com/niC00L/MoximindAPI.git
```
Navigate to the project root folder and install dependencies:

```bash
npm install
npx playwright install
```

Create a `.env` file in the project root with your reqres API key. You can edit the provided example.env file.:

```bash
REQRES_API_KEY=your_api_key_here
```
## Usage
You can run tests from project root folder by using these commands:

- ```npm run test```: Run all tests
- ```npm run test:report```: Show report