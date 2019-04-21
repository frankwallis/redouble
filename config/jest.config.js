module.exports = {
  "rootDir": '../',
  "collectCoverageFrom": [
    "src/**/*.{re,ml}"
  ],
  "setupFiles": [

  ],
  "testMatch": [
    "<rootDir>/src/**/*Tests.{re}"
  ],
  "moduleFileExtensions": [
    "re",
    "ml",
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx"
  ],
  "testEnvironment": "node",
  "testURL": "http://localhost",
  "transform": {
    '^.+\\.css$': 'jest-css',
    "^.+\\.(re|ml)$": "bs-loader"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|re|ml)$"
  ]
}