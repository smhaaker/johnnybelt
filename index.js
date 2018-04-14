const Raspi = require('raspi-io');
const keypress = require('keypress');
const five = require('johnny-five');
const board = new five.Board({
    io: new Raspi()
});

// motorRight dir: 'P1-11' pwm: 'P1-12'
// motorLeft dir 'P1-36' pwm: 'P1-35'

board.on("ready", function() {

    var motors = new five.Motors([
	{ pins: {  dir: 'P1-11', pwm: 'P1-12' }, invertPWM: true},
	{ pins: { dir: 'P1-36', pwm: 'P1-35'}, invertPWM: true }
    ]);

    board.repl.inject({
	motors: motors
    });

    // Use REPL if you want to go further
//    console.log("Done auto-driving! Use `motors` to control motors in REPL");
    
    
 //   console.log("Full speed ahead!");
 //   motors.forward(255);
 //   board.wait(5000, function () {
//	motors.stop();
 //   });

    function controller(ch, key) {
	if (key) {
	    if (key.name === "space") {
//		motors.a.stop();
		//		motors.b.stop();
		motors.stop();
	    }
	    if (key.name === "up") {
//		motors.a.rev(speed);
		//		motors.b.fwd(speed);
		motors.forward(255);
	    }
	    if (key.name === "down") {
		motors[0].forward(speed);
		motors[1].reverse(speed);
	    }
	    if (key.name === "right") {
		motors[0].forward(200);
		motors[1].reverse(200);
	    }
	    if (key.name === "left") {
		motors.a.rev(speed * 0.75);
		motors.b.rev(speed * 0.75);
	    }

	    commands = [].slice.call(arguments);
	} else {
	    if (ch >= 1 && ch <= 9) {
		speed = five.Fn.scale(ch, 1, 9, 0, 255);
		controller.apply(null, commands);
	    }
	}
    }

    keypress(process.stdin);

    process.stdin.on("keypress", controller);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    
    
//    motors.stop();
});
