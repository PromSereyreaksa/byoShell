import { exit } from "process";
import { findExecutable } from "./utils/findExecutable.js";

export const builtins = {
  exit: () => {
    exit();
  },
  echo: (args) => {
    console.log(args.join(" "));
  },
  type: (args) => {
    if (!args || args.length === 0) {
      console.log("type: missing argument");
      return;
    }

    const command = args[0];

    // check if its a builtin
    if (command in builtins) {
      console.log(`${command} is a shell builtin`);
      return;
    }

    // search PATH
    const fullPath = findExecutable(command);
    if (fullPath) {
      console.log(`${command} is ${fullPath}`);
    } else {
      console.log(`${command}: not found`);
    }
  },
};
