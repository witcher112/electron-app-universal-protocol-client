import * as electron from 'electron';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

const bindings = require(`./bindings`);

type ElectronAppUniversalProtocolClientEvents = {
  request: (requestUrl: string) => void;
}

class ElectronAppUniversalProtocolClient extends (EventEmitter as new () => TypedEmitter<ElectronAppUniversalProtocolClientEvents>) {

  private isInitialized: boolean = false;

  async initialize(
    {
      protocol,
      mode,
    }: {
      protocol: string;
      mode?: `development` | `production`;
    },
  ) {

    if (this.isInitialized) {

      throw new Error(`ElectronAppUniversalProtocolClient is already initialized.`);
    }

    await electron.app.whenReady();

    if (os.platform() === `darwin`) {

      if (mode === `development`) {

        const electronBundlePath = path.resolve(
          process.execPath,
          `..`,
          `..`,
          `..`,
        );

        const electronBundleInfoPlistFilePath = path.resolve(
          electronBundlePath,
          `Contents`,
          `Info.plist`,
        );

        const electronBundleInfoPlistOriginalFilePath = path.resolve(
          electronBundlePath,
          `Contents`,
          `Info.plist.original`,
        );

        let electronBundleInfoPlistContents: string;

        if (fs.existsSync(electronBundleInfoPlistOriginalFilePath)) {

          electronBundleInfoPlistContents = fs.readFileSync(
            electronBundleInfoPlistOriginalFilePath,
            `utf8`,
          );

        } else {

          electronBundleInfoPlistContents = fs.readFileSync(
            electronBundleInfoPlistFilePath,
            `utf8`,
          );

          fs.writeFileSync(
            electronBundleInfoPlistOriginalFilePath,
            electronBundleInfoPlistContents,
          );
        }

        electronBundleInfoPlistContents = electronBundleInfoPlistContents.replace(
          `com.github.Electron`,
          `com.github.${protocol}`,
        );

        electronBundleInfoPlistContents = electronBundleInfoPlistContents.replace(
          /<\/dict>\n<\/plist>/,
          [
            `    <key>CFBundleURLTypes</key>`,
            `    <array>`,
            `      <dict>`,
            `        <key>CFBundleURLName</key>`,
            `        <string>${protocol}</string>`,
            `        <key>CFBundleURLSchemes</key>`,
            `        <array>`,
            `          <string>${protocol}</string>`,
            `        </array>`,
            `      </dict>`,
            `    </array>`,
            `  </dict>`,
            `</plist>`,
          ].join(`\n`),
        );

        fs.writeFileSync(
          electronBundleInfoPlistFilePath,
          electronBundleInfoPlistContents,
        );

        bindings.setDevAppAsDefaultProtocolClient(
          electronBundlePath,
          protocol,
        );
      }

      electron.app.setAsDefaultProtocolClient(protocol);

      electron.app.on(
        `open-url`,
        (
          _event,
          url,
        ) => {

          if (url.startsWith(protocol)) {

            this.emit(`request`, url);
          }
        },
      );

      electron.app.on(
        `open-file`,
        (
          _event,
          url,
        ) => {

          if (url.startsWith(protocol)) {

            this.emit(`request`, url);
          }
        },
      );

    } else {

      if (mode === `development`) {

        electron.app.setAsDefaultProtocolClient(
          protocol,
          process.execPath,
          [
            path.resolve(process.argv[1]),
          ],
        );

      } else {

        electron.app.setAsDefaultProtocolClient(
          protocol,
          process.execPath,
          [],
        );
      }
    }

    electron.app.on(
      `second-instance`,
      (
        _event,
        argv,
      ) => {

        const secondInstanceRequestUrl = argv.find(
          (arg) => arg.startsWith(`${protocol}`),
        );

        if (secondInstanceRequestUrl !== undefined) {

          this.emit(`request`, secondInstanceRequestUrl);
        }
      },
    );

    const mainInstanceRequestUrl = process.argv.find(
      (arg) => arg.startsWith(`${protocol}`),
    );

    if (mainInstanceRequestUrl !== undefined) {

      this.emit(`request`, mainInstanceRequestUrl);
    }

    this.isInitialized = true;
  }
}

export default new ElectronAppUniversalProtocolClient();
