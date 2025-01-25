const fs = require('fs');
const {createCanvas, loadImage} = require('canvas')

let names = fs.readdirSync('./sprites').filter(x=>x.endsWith('.png'));

names.forEach(x=>{
    if (!fs.existsSync(`sprites/${x.split('.png')[0]}`)) {
        fs.mkdirSync(`sprites/${x.split('.png')[0]}`);
    }
    console.log(x);
    loadImage(`sprites/${x}`).then(img => {
        let cvs = createCanvas(32, 32);
        let ctx = cvs.getContext('2d');

        ctx.drawImage(img, 0, 0);
        let buffer = cvs.toBuffer('image/png');

        fs.writeFileSync(`sprites/${x.split('.png')[0]}/${x.split('.png')[0] + '-0.png'}`, buffer)

        ctx.clearRect(0, 0, 32, 32)
        ctx.save();

        ctx.rotate(270 * Math.PI / 180);
        ctx.translate(-32, 0);

        ctx.drawImage(img, 0, 0);
        buffer = cvs.toBuffer('image/png');

        fs.writeFileSync(`sprites/${x.split('.png')[0]}/${x.split('.png')[0] + '-1.png'}`, buffer)

        ctx.restore()
        ctx.clearRect(0, 0, 32, 32)

        ctx.rotate(180 * Math.PI / 180);
        ctx.translate(-32, -32);

        ctx.drawImage(img, 0, 0);
        buffer = cvs.toBuffer('image/png');

        fs.writeFileSync(`sprites/${x.split('.png')[0]}/${x.split('.png')[0] + '-2.png'}`, buffer)

        ctx.restore()
        ctx.clearRect(0, 0, 32, 32)

        ctx.rotate(270 * Math.PI / 180);
        // ctx.translate(32, 32);

        ctx.drawImage(img, -32, 0);
        buffer = cvs.toBuffer('image/png');

        fs.writeFileSync(`sprites/${x.split('.png')[0]}/${x.split('.png')[0] + '-3.png'}`, buffer)
    })

    fs.rmSync(`sprites/${x}`);
})

let sprites = fs.readdirSync('./sprites')

fs.writeFileSync('./spriteList.js', `let names = [${sprites.filter(x=>!x.endsWith('.png')).map(x=>[`'${x}/${x}-0'`,`'${x}/${x}-1'`,`'${x}/${x}-2'`,`'${x}/${x}-3'`].join(',')).join(',')}]`)