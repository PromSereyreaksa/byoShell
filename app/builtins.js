import { exit } from "process";
import { findExecutable } from "./utils/findExecutable.js";
import fs from "fs";
import path from "path"

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

    // resolve relative paths against current working dir
    // The process.cwd() method returns the current working directory of the Node.js process.
    const resolvedPath = path.resolve(process.cwd(), target); // handles absolute path, relative paths, ./ , ../, nested relative path atuomatically

    try {
      // so we are checking if the resolvedPath exist existsSync will return true
      // and statSync will check if it is a directory
      if (
        fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory
      ) {
        // The process.chdir() method changes the current working directory of the Node.js process or throws an exception if doing so fails (for instance, if the specified directory does not exist).
        process.chdir(resolvedPath); //if true we change directory to the path
      } else {
        console.log(`cd: ${target}: No such file or directory`);
      }
    } catch {
      console.log(`cd: ${target}: No such file or directory`);
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
