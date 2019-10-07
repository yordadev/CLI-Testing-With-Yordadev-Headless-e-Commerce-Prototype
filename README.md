yordadev-cli
============

CLI to access ecomninja services.

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



## Configuring
Login and Register generate a config.json file. Aint no worries. Keep this file safe while token is active.

<!-- usage -->
# Commands
<!-- commands -->
##Authenication
### Login
`yordadev-cli login -e <email> -p <password>`
### Register
`yordadev-cli register -n <name> -e <email> -p <password> -c <confirmed password`
### Account
`yordadev-cli account`
