const electron = require('electron');

const electronAppUniversalProtocolClient = require('electron-app-universal-protocol-client').default;

electron.app.on('ready', async () => {
  const window = new electron.BrowserWindow();
  window.loadURL('https://google.com');

  electronAppUniversalProtocolClient.on(
    'request',
    async (requestUrl) => {

      // Handle the request

      await electron.dialog.showMessageBox(
        window,
        {
          message: `Request received: ${requestUrl}`,
        }
      );
    },
  );

  await electronAppUniversalProtocolClient.initialize({
    protocol: 'your-app-id',
    mode: 'development', // If running in dev mode, otherwise use 'production' or skip
  });

  // From now accessing URL like your-app-id://test?foo=bar should open your app and trigger the 'request' event
});
