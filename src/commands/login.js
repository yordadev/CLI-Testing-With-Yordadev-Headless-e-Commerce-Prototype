const {Command, flags} = require('@oclif/command')
var request = require("request");
const fs = require('fs');
const {cli} = require('cli-ux')

class LoginCommand extends Command {
  async run() {
    
    const {flags} = this.parse(LoginCommand)

    const input = await cli.prompt('Enter your password', { type: 'hide', required: true })

    var default_headers, site_root = 'http://yorda.devs';

    default_headers = {
        'Content-Type': 'application/json',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
        // 'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0'
    };
    request({
        url: site_root + '/api/platform/account/login',
        headers: default_headers,
        method: 'POST',
        json: {
            email: flags.email,
            password: input
        }
    }, function(err, res, body) {
        if (!err && res.statusCode == 200) {

        let dev = { 
            name: body['payload']['name'],
            access: body['payload']['token'],
            expires: body['payload']['expires']
        };
         
        let data = JSON.stringify(dev, null, 2);
        
        fs.writeFile('config.json', data, (err) => {
            if (err) throw err;
            console.log('\nStatus: ' + body['status'] + "\n");
            console.log('Logged in. See yordadev-cli --help');
        });
        
        
        } else {
          cli.action.stop(body['payload'].message)
          console.log('\n\nLogin Failed. See documentation for help\n');
          const broswer =  cli.url('Documentation', 'https://docs.yordadev.com \n')
        }
    })

  }
}

LoginCommand.description = `Login to your account.
...
Extra documentation goes here
`

LoginCommand.flags = {
  email: flags.string({char: 'e', description: 'Email Address'})
}

module.exports = LoginCommand
