# Wrangler

Cloudflare Wrangler is a command-line tool (CLI) designed to help developers manage and deploy Cloudflare Workers, which are serverless functions that run at the edge of Cloudflare's network. It also manages Cloudflare services like KV Storage, Durable Objects, and R2.

It is made for developers to deploy their applications more easily towards the Cloudflare network so that you don't need to use their UI.

## Configuration
Wrangler optionally uses a configuration file to customize the development and deployment setup for a Worker. Make sure to not commit keys and/or information about wrangler. if required use the secret variables to deploy an application and/or a dot env file. a wrangler file is written in JSON or a TOML file. JSON is released since v3.91 so any versions before that should contain a wrangler.toml file.

An example JSON file can be found below
```json
{
  "name": "my-worker",
  "main": "src/index.js",
  "compatibility_date": "2022-07-12",
  "workers_dev": false,
  "route": {
    "pattern": "example.org/*",
    "zone_name": "example.org"
  },
  "kv_namespaces": [
    {
      "binding": "<MY_NAMESPACE>",
      "id": "<KV_ID>"
    }
  ],
  "env": {
    "staging": {
      "name": "my-worker-staging",
      "route": {
        "pattern": "staging.example.org/*",
        "zone_name": "example.org"
      },
      "kv_namespaces": [
        {
          "binding": "<MY_NAMESPACE>",
          "id": "<STAGING_KV_ID>"
        }
      ]
    }
  }
}
```

## Commands
Wrangler is a CLI tool that has a lot of commands to create, update or delete functions in the Cloudflare Network API. Most likely when having a configuration file you will need to 

Visit the following resources to learn more:
- [@official@Cloudflare - Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [@official@Cloudflare - Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/)
- [@video@Deploy your React App to Cloudflare Workers](https://www.youtube.com/watch?v=B2bLUc3iOsI)
