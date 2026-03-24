<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8e1dac5a-4b9c-4f0b-a48b-e36a11ee13ff

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy with GitHub Pages

This repository is configured to deploy automatically from GitHub Actions.

1. Push this project to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to the `main` branch, or run the `Deploy to GitHub Pages` workflow manually from the `Actions` tab.

After deployment, the site URL will be:

`https://aduck097.github.io/stsich-demo/`
