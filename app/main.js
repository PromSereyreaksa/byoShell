const { exit } = require("process");
const readline = require("readline");

// Builtin commands
const builtins = {
  exit: () => {
    process.exit(0);
  },
  echo: (args) => {
    console.log(args.join(" "));
  },
  type: (args) => {
    if (args.lenght === 0) {
      console.log("type: missing argument");
    }

    const command = args[0];
    command in builtins ? console.log(`${command} is a shell builtin`) : console.log(`${command}: not found`); 
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

// show $ initial prompt
rl.prompt();

rl.on("line", (input) => {
  const trimmed = input.trim();

  // if user enter just go back to $ prompt
  if (!trimmed) {
    rl.prompt();
    return;
  }

  // .split(/\s+/) splits the string into an array of words, using any amount of whitespace as the separator
  const [cmd, ...args] = trimmed.split(/\s+/);

  if (builtins[cmd]) {
    builtins[cmd](args);
  } else {
    console.log(`${cmd}: command not found`);
  }

  rl.prompt();
});

rl.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});
