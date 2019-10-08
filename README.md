yordadev-cli [wip]
============

This is a NodeJS Command Line Interface build on oclif to interact with yordadev's Headless eCommerce Platform. See documentation for more information.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/yordadev-cli.svg)](https://npmjs.org/package/yordadev-cli)
[![Downloads/week](https://img.shields.io/npm/dw/yordadev-cli.svg)](https://npmjs.org/package/yordadev-cli)
[![License](https://img.shields.io/npm/l/yordadev-cli.svg)](https://github.com/yordadev/yordadev-cli/blob/master/package.json)

<!-- toc -->
# Usage
## Installing CLI
```sh
cd <path> && git clone https://github.com/yordadev/yordadev-cli.git .
npm install
yordadev-cli --help
```
If you recieve symlink error, on `npm install` add additional flag `--no-bin-links`.

### Setting up your own workflow alias
```sh
alias <desiredAlias>='yordadev-cli'
<desiredAlias> --help
```


## Configuring
Login and Register generate a config.json file. Aint no worries. Keep this file safe while token is active.

<!-- usage -->
# Available Commands
<!-- commands -->
## Login
`yordadev-cli login -e test@user.com`
## Register
`yordadev-cli register -e test@user.com`
## Account
`yordadev-cli account`

## Shop
### Create a Shop
`yordadev-cli shop -m create`
