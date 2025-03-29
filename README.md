# Lidhium JS

[![npm version](https://img.shields.io/npm/v/lidhium.svg)](https://www.npmjs.com/package/lidhium)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/lidhium.svg)](https://www.npmjs.com/package/lidhium)
[![GitHub issues](https://img.shields.io/github/issues/lidhishc/lidhium)](https://github.com/lidhishc/lidhium/issues)

A powerful CLI tool for creating and managing micro-frontend applications.

## Features

- 🚀 Quick setup for micro-frontend applications
- 🛠 Supports Vue3
- 📦 Built-in Webpack configuration
- 🔄 Seamless module federation
- 📈 Scalable architecture for growing applications
- ⚙️ Single configuration file for all apps

## Installation

```bash
npm install -g lidhium
```

## Usage

### Create a new project

```bash
lidhium init my-app
```

### Generate a new micro-frontend app

```bash
lidhium generate app-name 3000
```

> **Note:** The first app you generate will always be of type `host`.

### Start Micro App

```bash
yarn start app-name
```

### Build for production

```bash
yarn build app-name
```

### Start Dev-Tool

```bash
yarn dev-tool
```

## Commands

| Command    | Description                       |
| ---------- | --------------------------------- |
| `init`     | Initialize a new project          |
| `generate` | Generate a new micro-frontend app |
| `start`    | Start development server          |
| `build`    | Build for production              |
| `expose`   | Expose components from the app    |
| `bind`     | Bind other micro-frontend app     |
| `dev-tool` | Start dev-tool                    |

> **Note:** The `expose` and `bind` commands should be run inside the micro-frontend app folder.

## Support

- Vue3
- Webpack

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Lidhish C](https://github.com/lidhishc)

## Links

- [NPM Package](https://www.npmjs.com/package/lidhium)
- [GitHub Repository](https://github.com/lidhishc/lidhium)
- [Issues](https://github.com/lidhishc/lidhium/issues)
