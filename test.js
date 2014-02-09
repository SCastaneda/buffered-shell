var bread = require('./bread');

var path       = "/Users/sam/projects/node/buffered-shell";
var delimiter  = "\n";
var batch_size = 10;

var test = bread({ cwd: path }, "cat *.js");
test.start();

test.on('data', function(data) {
    console.log(" ----hi---- ");
    console.log(data);
});

test.on('end', function() {
    console.log("end event was emitted");
    process.exit();
})