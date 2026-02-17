import { exit } from "process";
import { findExecutable } from "./utils/findExecutable.js";
import fs from "fs";

export const builtins = {
  exit: () => {
    exit();
  },
  echo: (args) => {
    console.log(args.join(" "));
  },
  pwd: () => {
    console.log(process.cwd());
  },
  cd: (args) => {
      if (!args || args.length === 0) {
          return;
      }

        const target = args[0];
        
        // only handle absolute path for now
      if (target.startsWith("/")) {
          try {
              if (fs.existsSync(target) && fs.statSync(target).isDirectory) {
                  process.chdir(target);
              } else {
                  console.log(`cd: ${target}: No such file or directory`);
              }
          } catch {
              console.log(`cd: ${target}: No such file or directory`);
            }
        }
    
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
