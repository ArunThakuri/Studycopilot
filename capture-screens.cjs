const { chromium } = require('playwright');

const captures = [
  { id: '5c337e5f-b6a0-4698-a147-6ca6a33e8557', view: 'landing' },
  { id: '14f978fa-8a79-4c3d-bfad-7d5036fe1ed7', view: 'login' },
  { id: 'e3ce87f1-b0e4-4ef5-b42c-2b984162bb51', view: 'signup' },
  { id: 'f88ec7c5-ef6d-424c-b10e-f6b4cd120913', view: 'forgot-password' },
  { id: '3ae7109f-925f-476b-9540-99d5287728d8', view: 'dashboard' },
  { id: '26477e82-c349-45a5-a0c7-990a0f24c4f5', view: 'select-subject' },
  { id: '7730289a-d3d4-4f17-939d-d443494ff9ce', view: 'create-subject' },
  { id: '14deba0a-196a-4094-9e65-fc4bc0210d04', view: 'units-dashboard' },
  { id: '79dd2c78-e9aa-46c6-a8cd-da9e875a169e', view: 'create-unit' },
  { id: 'deaf01c7-59ec-4415-9e1c-a1951de5f997', view: 'learning-modules' },
  { id: '6a441240-8325-43c9-a4a8-db8d77577a9e', view: 'profile' },
  { id: '9c584276-ac3b-4dc3-a430-9bf4fdb8fd92', view: 'unit-text' },
  { id: 'dab95240-a59e-46e0-ba69-d3922d30c35e', view: 'audio-lesson' },
  { id: '5c025746-a4fe-4e5e-8e1a-3c6912c9db24', view: 'vocabulary' },
  { id: '657e5033-5452-41cb-9765-0af320cb21f5', view: 'summary' },
  { id: '6656d71a-6068-4d65-81ac-13bf509103f7', view: 'exercises' },
  { id: 'cd06f196-2d87-47a4-b5fb-4d29c1f91aba', view: 'interactive' },
  { id: '68699e01-ba77-4398-9024-9894b9478287', view: 'practice' },
  { id: 'd4183b65-d988-461c-860a-72af50ff6661', view: 'model-question' },
  { id: '5817448f-fdf7-4d05-8684-fb9d433a9bfc', view: 'markdown-editor' },
  { id: 'ccc04b61-86b2-4a62-b849-67d169e624df', view: 'admin-panel', extra: '&admin=1' },
  { id: 'b8aa6735-025b-4eb8-8da5-f4e76bfc3303', view: 'reset-password' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const cap of captures) {
    const page = await context.newPage();
    const extra = cap.extra || '';
    const url = `http://localhost:5173/#view=${cap.view}&demo=1${extra}&figmacapture=${cap.id}&figmaendpoint=https%3A%2F%2Fmcp.figma.com%2Fmcp%2Fcapture%2F${cap.id}%2Fsubmit&figmadelay=2000`;
    console.log(`Capturing ${cap.view} ...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(6000);
      console.log(`  ${cap.view} captured.`);
    } catch (e) {
      console.error(`  ${cap.view} failed: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('All captures submitted.');
}

run().catch(console.error);
