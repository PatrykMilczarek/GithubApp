module.exports = {
    "setupFiles": [
        "<rootDir>/test-shim.js",
        "<rootDir>/test-setup.js"
      ],
      "moduleNameMapper": {
        "\\.(css|scss)$": "identity-obj-proxy"
      },
      "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
      ],
      "transform": {
        "^.+\\.(ts|tsx)$": "<rootDir>/test-preprocessor.js"
      },
      "testMatch": [
        "**/__tests__/*.(ts|tsx|js)"
      ]
  }