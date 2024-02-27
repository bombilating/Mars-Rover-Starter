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
    let testCommands = [new Command('1', '2'), new Command('MODE_CHANGE')]
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(10);
    expect(testRover.receiveMessage(testMessage)["message"]).toBe('Hello world');
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testCommands = [new Command("STATUS_CHECK"), new Command('3')]
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(10);
    expect(testRover.receiveMessage(testMessage)["results"].length).toBe(2)
  });

  it("responds correctly to the status check command", function() {
    let testCommands = [new Command("STATUS_CHECK")]
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(87382098);
    let testObj = testRover.receiveMessage(testMessage)["results"][0]["roverStatus"]
    expect(testObj["mode"]).toBe("NORMAL");
    expect(testObj["generatorWatts"]).toBe(110);
    expect(testObj["position"]).toBe(87382098);
  })

  it("responds correctly to the mode change command", function() {
    let testCommands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(87382098);
    let testObj = testRover.receiveMessage(testMessage)["results"][0]
    expect(testObj["completed"]).toBe(true)
    expect(testRover.mode).toBe("LOW_POWER");
  })

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testCommands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 5)];
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(87382098);
    let testObj = testRover.receiveMessage(testMessage)["results"]
    expect(testObj[1]["completed"]).toBe(false)
    expect(testRover.position).toBe(87382098);
  });

  it("responds with the position for the move command", function() {
    let testCommands = [new Command("MOVE", 5)];
    let testMessage = new Message('Hello world', testCommands);
    let testRover = new Rover(87382098);
    let testObj = testRover.receiveMessage(testMessage)["results"]
    expect(testObj[0]["completed"]).toBe(true)
    expect(testRover.position).toBe(5);
  })
})
