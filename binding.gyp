{
  "targets": [
    {
      "target_name": "electron-app-universal-protocol-client",
      "sources": [],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "libraries": [],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS",
      ],
      "conditions": [
        [
          'OS=="win"',
          {
            "sources": [
              "./src/lib-windows.cc"
            ],
          },
        ],
        [
          'OS=="mac"',
          {
            "sources": [
              "./src/lib-macos.mm"
            ],
            "xcode_settings": {
              "OTHER_CPLUSPLUSFLAGS": ["-std=c++14", "-stdlib=libc++"],
              "OTHER_LDFLAGS": ["-framework CoreFoundation"],
              "MACOSX_DEPLOYMENT_TARGET": "10.10",
            },
          },
        ],
        [
          'OS=="linux"',
          {
            "sources": [
              "./src/lib-linux.cc"
            ],
          },
        ]
      ],
    },
  ],
}