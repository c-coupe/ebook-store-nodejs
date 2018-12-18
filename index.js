let fs = require('fs');
let readline = require('readline');
let rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

const productsFile = __dirname + '/data/products.json';

function showProducts(err, products) {
    if (err) {
        return callback(err);
    }

    console.log("Bienvenue. Voici les produits disponibles :");
    products.forEach((product) => {
        var name = (`${product.name}, de ${product.author}`).padEnd(40);
        console.log(`${product.id} - ${name} / ${product.EUR_price} / ${product.orders_count}`);
    })
}


function orderProduct(err, product) {
    if (err) {
        return callback(err);
    }

    console.log("Bienvenue. Voici les produits disponibles :");
    products.forEach((product) => {
        var name = (`${product.name}, de ${product.author}`).padEnd(40);
        console.log(`${product.id} - ${name} / ${product.EUR_price} / ${product.orders_count}`);
    })
}

function getAllProducts(callback) {
    fs.readFile(productsFile, 'utf-8', (err, content) => {
        if (err) {
            return callback(err);
        }

        try {
            callback(null, JSON.parse(content));
        } catch (err) {
            return callback(err);
        }
    });
}

function orderProduct(err, products, id, callback) {
    if (err) {
        return callback(err);
    }

    var found = products.find(product => product.id === id)

    if ('undefined' == typeof found) {
        return callback('Product not found.');
    }

    found.orders_count++;
    fs.writeFile(productsFile, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            return callback(err);
        }
    });

    console.log(`Commande terminée. Voici votre fichier : ${found.file_link}`);
}

function orderProductById(id) {
    getAllProducts(function (err, products) {
        if (err) {
            return console.log(err);
        }

        orderProduct(null, products, id, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
}

function waitForOrder() {
    rl.on('line', function (line) {
        var re = /i want product (\d*)/i;
        var found = line.match(re);

        if (null !== found) {
            orderProductById(parseInt(found[1]));
        }
    });
}

(function () {
    getAllProducts(showProducts);
    waitForOrder();
})();