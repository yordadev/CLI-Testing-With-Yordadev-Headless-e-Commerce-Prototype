const {Command, flags} = require('@oclif/command')
var request = require("request");
const {cli} = require('cli-ux')
const fs = require('fs');

class AccountCommand extends Command {
  async run() {
    cli.action.start('Attempting to Find Your Account')
    const {flags} = this.parse(AccountCommand)

    fs.readFile('config.json', (err, data) => {
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
            followRedirect :false,
            headers: default_headers,
            method: 'GET',
        }, function(err, res, body) {
            if (!err && res.statusCode == 200) {
                body = JSON.parse(body)
                

                cli.action.stop("Account Retrieved")

                let tree = cli.tree()

                tree.insert('oversight')
                let subtree = cli.tree()
                subtree.insert("HTTPS Status Code: " + body.status)
                subtree.insert("SSL Enabled: " + '<not checked yet>')
                subtree.insert("challenged: " + '<not checked yet>')
                tree.nodes.oversight.insert('security', subtree)

                tree.insert('account')
                subtree = cli.tree()
                subtree.insert("name: " + body.payload.account.name)
                subtree.insert("email: " + body.payload.account.email)
                tree.nodes.account.insert('account_id: ' + body.payload.account.account_id, subtree)



                tree.insert('shops')            
                
                if(Object.keys(body.payload.shops).length > 0){
                    for(let x = 0; x < Object.keys(body.payload.shops).length; x++){
                        let subtree = cli.tree()
                        subtree.insert(body.payload.shops[x].name)
                        subtree.insert(body.payload.shops[x].description)
                        tree.nodes.shops.insert(body.payload.shops[x].shop_id, subtree)
                    }
                }

                if(Object.keys(body.payload.shops).length < 1){

                
                    let subtree = cli.tree()
                    subtree.insert("You currently do not have any shops created.")
                    subtree.insert("<alias> shops -m create -n <name> -d <short_description>")                    
                    tree.nodes.shops.insert("0 of 1 shops available", subtree)
                 
                }

                tree.display()
 
            
            } else {
                console.log('\nStatus: ' + body['status'] + "\n")
                console.log(body['payload'] + "\n\n")
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
