class Rover    {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage(message) { 
      let messageName = message.name
      let commandResults = []
      for(let i = 0; i < message.commands.length; i++) {
         if (message.commands[i]["commandType"] === "STATUS_CHECK") {
            commandResults.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
         } else {
            if (message.commands[i]["commandType"] === "MODE_CHANGE") {
               this.mode = message.commands[i]["value"]
               commandResults.push({completed: true})
            } else {
               if (message.commands[i]["commandType"] === "MOVE") {
                  if(this.mode === "NORMAL") {
                     this.position = message.commands[i]["value"]
                     commandResults.push({completed: true})
                  } else {
                     commandResults.push({completed: false})
                     }
               } else {
               commandResults.push({completed: false})
               }
          }
         }
      }
      return {message: messageName, results: commandResults}
   }
}
module.exports = Rover;