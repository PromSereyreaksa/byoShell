import { exit } from "process";
import readline from "readline";
import fs from "fs";
import path from "path";

// Builtin commands
const builtins = {
  exit: () => {
    exit();
  },
  echo: (args) => {
    console.log(args.join(" "));
  },
  type: (args) => {
    if (args.length === 0) {
      console.log("type: missing argument");
      return;
    }

    const command = args[0];

    // check if its a builtin
    if (command in builtins) {
      console.log(`${command} is a shell builtin`);
      return;
    }

    // get path dir
    const PATH = process.env.PATH || "";
    const dirs = PATH.split(":");

    // search in each PATH dir
    for (const dir of dirs) {
      const fullPath = path.join(dir, command);

      if (fs.existsSync(fullPath)) {
        try {
          fs.accessSync(fullPath, fs.constants.X_OK); // check if it has executable permission
          console.log(`${command} is ${fullPath}`);
          return;
        } catch {}
      }
    }

    // not found
    console.log(`${command}: not found`);
  },
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
  exit();
});
