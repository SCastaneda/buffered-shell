var exec         = require('child_process').exec;
var util         = require('util');
var assert       = require('assert');
var EventEmitter = require('events').EventEmitter;
var bread;
var Init;

module.exports = Init;

function Init(options,command, delimiter, size) {
    return new bread(options, command, delimiter, size);
}

function bread(options, command, delimiter, size) {
    // mandatory arguements
    assert(options.cwd !== undefined, "arguement 1 needs to at least have { cwd: '' } defined");
    assert(command     !== undefined, "arguement 2 (command) needs to be defined");

    // optional arguements
    size      = size      || 20;
    delimiter = delimiter || "\n";

    this.options   = options;
    this.command   = command;
    this.size      = size;
    this.delimiter = delimiter;

    EventEmitter.call(this);
}

function start() {

    var self = this;
    exec(this.command, this.options,
        function (error, stdout, stderr) {
            assert(error == null, error);

            var output = stdout.split(self.delimiter);
            var string = "";
            for(var i = 0; i < output.length; i++) {
                if( ( (i+1) % self.size) == 0 ) {
                    
                    self.emit('data', string);
                    string = "";
                }
                
                string += output[i] + self.delimiter; 
            }

            // send the last bits of data
            self.emit('data', string);
            self.emit('end');
        }
    );
}

util.inherits(bread, EventEmitter);

bread.prototype.start = start;
