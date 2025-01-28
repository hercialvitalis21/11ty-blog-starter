---
title: '## GitHub Copilot Chat'
---
## GitHub Copilot Chat

- Extension Version: 0.22.4 (prod)
- VS Code: vscode/1.96.0
- OS: Windows

## Network

User Settings:

```json
  "github.copilot.advanced": {
    "debug.useElectronFetcher": true,
    "debug.useNodeFetcher": false
  }
```

Connecting to <https://api.github.com>:

- DNS ipv4 Lookup: 140.82.114.6 (8 ms)
- DNS ipv6 Lookup: Error: getaddrinfo ENOTFOUND [api.github.com](http://api.github.com)
- Electron Fetcher (configured): HTTP 200 (258 ms)
- Node Fetcher: HTTP 200 (256 ms)
- Helix Fetcher: HTTP 200 (319 ms)

Connecting to <https://api.individual.githubcopilot.com/_ping:>

- DNS ipv4 Lookup: 140.82.112.22 (59 ms)
- DNS ipv6 Lookup: Error: getaddrinfo ENOTFOUND [api.individual.githubcopilot.com](http://api.individual.githubcopilot.com)
- Electron Fetcher (configured): HTTP 200 (261 ms)
- Node Fetcher: HTTP 200 (250 ms)
- Helix Fetcher: HTTP 200 (262 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).

<SwmMeta version="3.0.0"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
