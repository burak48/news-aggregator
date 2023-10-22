# news-aggregator (React + TypeScript + Vite)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Demo

Try ~~[here](https://news-aggregator-henna.vercel.app/)~~ - it for now locally

## Project Setup

### Clone the repository:

```sh
git clone https://github.com/burak48/news-aggregator.git
```

### Install the dependencies:

```sh
npm install
```

### Set up environment variables:

Create a `.env` file at the root of the project and add the following environment variables:

- VITE_APP_NEWSAPI_API_URL=https://newsapi.org
- VITE_APP_NEWSAPI_KEY=your-newsapi-key
- VITE_APP_THEGUARDIAN_API_URL=https://content.guardianapis.com
- VITE_APP_THEGUARDIAN_API_KEY=your-theguardian-api-key
- VITE_APP_NEWYORKTIMES_API_URL=https://api.nytimes.com
- VITE_APP_NEWYORKTIMES_API_KEY=your-newyorktimes-api-key

### Start the server:

```sh
npm run dev
```

### Dockerization

- Navigate to the project's root directory.
- Build the Docker image using `docker build -t news-aggregator:v1.0 .`
- Run the Docker compose environment using `docker-compose up`
- Access the React app in a web browser at `http://localhost:5173`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
