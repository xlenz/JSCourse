var listFiles = require('./program06_module.js');

listFiles(process.argv[2], process.argv[3], function (err, data) {
    if (err)
        return console.error('listFiles error: ', err);
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
    }
});
