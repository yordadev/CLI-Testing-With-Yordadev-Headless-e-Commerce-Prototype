const {Command, flags} = require('@oclif/command')
var request = require("request");
const fs = require('fs');

class AccountCommand extends Command {
  async run() {
    const {flags} = this.parse(AccountCommand)

    fs.readFile('env.json', (err, data) => {
        if (err) throw err;
        let env = JSON.parse(data);



        var default_headers, site_root = 'http://yorda.devs';

        default_headers = {
            'Content-Type': 'application/json',
            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
            // 'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Authorization': 'Bearer ' + env.access
        };
        request({
            url: site_root + '/api/platform/account/details',
            headers: default_headers,
            method: 'GET',
        }, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                
            } else {
                
            }
        })

    });



  }
}

AccountCommand.description = `Retrieve your account data.
...
Extra documentation goes here
`

AccountCommand.flags = {
  
}

module.exports = AccountCommand
