/*
 * A simple example that builds and executes the following command:
 *
 *     rsync -avz --rsh 'ssh' /path/to/source you@server:/destination/path
 *
 * The `execute` method receives an Error object when an error ocurred, the
 * exit code from the executed command and the executed command as a String.
 *
 * The `shell` method is a shorthand for using `set('rsh', 'ssh')`.
 */

var Rsync = require('./node_modules/rsync/');
var output = '';
var errorOutput = '';
var cmd;
cmd = Rsync.build({
  source:      'http://house.batteryinteractive.com/iq/ui/0.0.4/*',
  destination: 'http://brianholden.us/again/',
  exclude:     ['.git'],
  shell: 'ssh'
});

cmd.execute(
  function(error, stdout, stderr) {
   // console.log("stderr: " + stderr + " " + stderr + " " + error);
    console.log(error);
    if (error) {
      console.log('Something went wrong: ' + error.message);
      // Parse the error output
      //var message = errorOutput.match(new RegExp('rsync error: .*', 'i'));
     // console.log('rsync message: ' + message);
    }
});
