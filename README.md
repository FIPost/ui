[![Publish Docker image](https://github.com/FIPost/ui/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/FIPost/ui/actions/workflows/docker-publish.yml)
[![Build image](https://github.com/FIPost/ui/actions/workflows/build.yml/badge.svg)](https://github.com/FIPost/ui/actions/workflows/build.yml)
![ipost-logo](https://github.com/FIPost/docs/blob/master/assets/logo-name.png?raw=true)

# ui
<h3 align="center">
  <a href="https://github.com/FIPost/docs">Documentation</a>
</h3>

VueJS front-end for the logistal process of managing packages.

## Getting Started
Install node modules.
```zsh
npm install
```

Serve VueJS
```zsh
npm run serve
```

## Getting Started with Docker
The docker image used in this build uses a Nginx webserver to serve the SPA VueJS content on port `80`.

```zsh
docker build -t ui .
docker run -p 80:80 --name ui-app ui
```
