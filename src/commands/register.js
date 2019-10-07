const {Command, flags} = require('@oclif/command')
var request = require("request");
const fs = require('fs');
const {cli} = require('cli-ux')

class RegisterCommand extends Command {
  async run() {
    const {flags} = this.parse(RegisterCommand)
    
    

    var default_headers, site_root = 'http://yorda.devs';

    default_headers = {
        'Content-Type': 'application/json',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
        // 'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0'
    };
    request({
        url: site_root + '/api/platform/account/register',
        headers: default_headers,
        method: 'POST',
        json: {
            name: flags.name,
            email: flags.email,
            password: flags.password,
            c_password: flags.c_password
        }
    }, function(err, res, body) {
        if (!err && res.statusCode == 200) {

          
            let dev = { 
                name: body['payload']['name'],
                access: body['payload']['token'],
                expires: body['payload']['expires']
            };
            
            if(dev.access){
              
              let data = JSON.stringify(dev, null, 2);
              
              fs.writeFile('config.json', data, (err) => {
                  if (err) throw err;
                  console.log('\nStatus: ' + body['status'] + "\n")
                  console.log('Logged in. See yordadev-cli --help');
              });
            }
            
        } else {
          console.log('\nStatus: ' + body['status'] + "\n")
          console.log(body['payload'])
        }
    });
    

  }
}

RegisterCommand.description = `Register to your account.
...
Extra documentation goes here
`

RegisterCommand.flags = {
  
  name: flags.string({char: 'n', description: 'Name'}),
  email: flags.string({char: 'e', description: 'Email Address'}),
  password: flags.string({char: 'p', description: 'Password'}),
  c_password: flags.string({char: 'c', description: 'Confirm your password'})

}

module.exports = RegisterCommand
