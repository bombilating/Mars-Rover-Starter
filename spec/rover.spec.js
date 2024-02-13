const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let test = new Rover(10);
    expect(test['position']).toBe(10);
    expect(test['mode']).toBe('NORMAL');
    expect(test['generatorWatts']).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let testCommands = [new Command('1', '2'), new Command('3')]
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(10);
    expect(testRover.receiveMessage(testMessage)[]).toBe();
  })
});
