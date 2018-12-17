let fs = require('fs');



fs.readFile(__dirname + '/products.json', 'utf-8', (err, content) => {
    if (err) {
        console.log(err);
    }

    try {
        var books = JSON.parse(content);
        console.log(books)
    } catch (err) {
        console.log(err)
    }
    
});
