const fs = require('fs');

let sprites = fs.readdirSync('./sprites')

fs.writeFileSync('./spriteList.js', `let names = [${sprites.filter(x=>!x.endsWith('.png')).map(x=>[`'${x}-0'`,`'${x}-1'`,`'${x}-2'`,`'${x}-3'`].join(',')).join(',')}]`)