import readline from "readline";
import { spawn } from "child_process";
import { builtins } from "./builtins.js";
import { findExecutable } from "./utils/findExecutable.js";

function parseInput(input) {
  const args = []; // will be final array of parsed args
  let current = ""; // building current word
  let inSingleQuote = false; // track if we are inside a single quote '...' block or not

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "'") {
      inSingleQuote = !inSingleQuote; // Every time we hit a single quote ', we flip the inSingleQuote boolean
      continue; // not including the single quote itself
    }

    // Example : 'hello'
    /* First ' → inSingleQuote = true, skip '

    Add h, e, l, l, o → current = "hello"

    Last ' → inSingleQuote = false, skip ' */

    if (char === " " && !inSingleQuote) {
      if (current.length > 0) {
        args.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current.length > 0) {
    args.push(current);
  }

  return args;
}

export function startShell() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ ",
  });

  rl.prompt();

  rl.on("line", (input) => {
    const trimmed = input.trim();

    if (!trimmed) {
      rl.prompt();
      return;
    }

    const tokens = parseInput(trimmed);
    const cmd = tokens[0];
    const args = tokens.slice(1);

    if (builtins[cmd]) {
      builtins[cmd](args);
      rl.prompt();
    } else {
      // try direct execution first
      const child = spawn(cmd, args, { stdio: "inherit" });

      child.on("error", () => {
        // fallback to PATH search
        const executable = findExecutable(cmd);
        if (executable) {
          const child2 = spawn(executable, args, { stdio: "inherit" });
          child2.on("exit", () => rl.prompt());
        } else {
          console.log(`${cmd}: command not found`);
          rl.prompt();
        }
      });

      child.on("exit", () => rl.prompt());
    }
  });

  rl.on("SIGINT", () => {
    rl.close();
  });
}
