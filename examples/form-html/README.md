# Kontenbase Example - Form HTML

Kontenbase Example with plain form in HTML and JavaScript. No UI library or framework!

Setup the environment variable:

```sh
cp env.example.js env.js
```

Note that it's different with the most common `.env` because here we're not using any Node.js or server-side method.

Edit the `KONTENBASE_API_KEY` in the `env.js`:

```js
export const KONTENBASE_API_KEY = 'your-api-key-here'
```

Run the project live server via `http://localhost:3000`. It's mandatory because without a server, it will be blocked by CORS policy.

- With VS Code, you can use [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- With Node.js via terminal, you can use [live-server](https://www.npmjs.com/package/live-server)
