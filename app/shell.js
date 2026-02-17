import readline from "readline";
import { spawn } from "child_process";
import { builtins } from "./builtins.js";
import { findExecutable } from "./utils/findExecutable.js";

export function startShell() {
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

    const [cmd, ...args] = trimmed.split(/\s+/);

    if (builtins[cmd]) {
      builtins[cmd](args);
      rl.prompt();
    } else {
      const executable = findExecutable(cmd);
      if (!executable) {
        console.log(`${cmd}: command not found`);
        rl.prompt();
      } else {
        const child = spawn(executable, args, { stdio: "inherit" });
        child.on("exit", () => rl.prompt());
      }
    }
  });

  rl.on("SIGINT", () => {
    rl.close();
  });
}
