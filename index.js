const csvWriter = require('csv-write-stream')
const { OS2LServer } = require("os2l");
const fs = require("fs");

const writer = csvWriter({
    // separator: ',',
    // newline: '\n',
    headers: ["hello", "foo"]
})
writer.pipe(fs.createWriteStream('out.csv'))

// All options are optional
let server = new OS2LServer({
    port: 5000 // TCP Port to listen on
});

// Register events
server.on("error", err => {
    console.error(err);
});

server.on("btnOn", name => {
    if (name == "fog") {
        // ... code for starting a fog machine
        server.feedback("fog", "on");
    }
});

server.on("btnOff", name => {
    if (name == "fog") {
        // ... code for stopping a fog machine
        server.feedback("fog", "off");
    }
});

server.on("beat", data => {
    console.log('beat:', JSON.stringify(data))
    // Toggle light or something
});

// Start the server
server.start().then(() => {
    console.log("Server is now listening on port: ", server.port);
});

console.log('writing test file')
writer.write(['world', 'bar'])
console.log('written out.csv')
writer.end()