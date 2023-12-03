const electron = require('electron');

const electronAppUniversalProtocolClient = require('electron-app-universal-protocol-client').default;

// Usually you want to run only one instance of your app to handle all requests in one context

if (!electron.app.requestSingleInstanceLock()) {
  electron.app.exit(0);
}

electron.app.on('ready', async () => {
  // Prepare your application, create windows etc.

  const window = new electron.BrowserWindow();
  window.loadURL('https://google.com');

  // When you're ready to handle protocol requests, register the handler and initialize the client

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
    mode: 'development', // Make sure to use 'production' when script is executed in bundled app
  });

  // At this point accessing URLs like your-app-id://test?foo=bar should open your app and trigger the 'request' event
});
