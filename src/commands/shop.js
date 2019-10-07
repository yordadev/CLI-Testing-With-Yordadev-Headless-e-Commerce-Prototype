const {Command, flags} = require('@oclif/command')
var request = require("request");
const {cli} = require('cli-ux')
const fs = require('fs');

class ShopCommand extends Command {
  async run() {
    cli.action.start('Attempting to Create Your Shop')
    const {flags} = this.parse(ShopCommand)



    switch(flags.method){
        case('create'):
            
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
                    url: site_root + '/api/platform/shop/' + flags.method,
                    
                    headers: default_headers,
                    method: 'POST',
                    json: {
                        name: flags.name,
                        description: flags.description,
                        challenge: flags.challenge,
                        dns: flags.dns
                    }
                }, function(err, res, body) {
                   
                    if (!err && res.statusCode == 200) {

                        let storeStoreInfo = { 
                            name: env.name,
                            access: env.access,
                            expires: env.expires,
                            shops: body.payload
                        };
                         
                        let data = JSON.stringify(storeStoreInfo, null, 2);
                        
                        fs.writeFile('config.json', data, (err) => {
                            if (err) throw err;
                            
                           
                            data = JSON.parse(data)
                
                         
                            cli.action.stop("Shop Successfully Created.")
            
                            let tree = cli.tree()
            
                            tree.insert('oversight')
                            let subtree = cli.tree()
                            subtree.insert("HTTPS Status Code: " + body.status)
                            subtree.insert("SSL Enabled: " + '<not checked yet>')
                            subtree.insert("challenged: " + '<not checked yet>')
                            tree.nodes.oversight.insert('security', subtree)
            
                            tree.insert('shops')

            
                 
                            
     
                                                        
                            subtree = cli.tree()
                            subtree.insert("shop_id: " + data['shops'].shop_id)
                            subtree.insert("name: " + data['shops'].name)
                            subtree.insert("description: " + data['shops'].description)
                            tree.insert("shops", subtree)
                            
                            
                            subtree = cli.tree()
                            subtree.insert("account: access account information.")
                            subtree.insert("logout: remove access token from this application.")
                            tree.insert("related commands", subtree)
                            
                        
                            


                
                            
            
                            
                            
            
                            tree.display()
             

                        });
                        
                    
                    } else {
                        cli.action.stop(body['error'])
                        console.log('\nStatus: ' + body['status'] + "\n")
                        console.log(body['payload'])
                        console.log("\n")
                        
                    }
                })

            });

            
            break;
    }







  }
}

ShopCommand.description = `Retrieve your Shop data.
...
Extra documentation goes here
`

ShopCommand.flags = {
    method: flags.string({char: 'm', description: 'Method'}),
    name: flags.string({char: 'n', description: 'Name of the Shop/Business'}),
    description: flags.string({char: 'd', description: 'Short description of the purpose of this shop.'}),
    challenge: flags.string({char: 'c', description: 'A challenge code to verify your dns'}),
    dns: flags.string({char: 'l', description: 'Your DNS location'})
  }

module.exports = ShopCommand
