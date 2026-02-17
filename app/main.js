const { exit } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});


rl.prompt();


rl.on("line", (command) => {
  command.trim();

  if (command.length === 0) {
    rl.prompt();
    return;
  }

  if (command == 'exit') {
    exit();
  }

  console.log(`${command}: command not found`);
  
  rl.prompt();
});

