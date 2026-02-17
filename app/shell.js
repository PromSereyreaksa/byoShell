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

  rl.prompt();

  rl.on("line", (input) => {
    const trimmed = input.trim();

    if (!trimmed) {
      rl.prompt();
      return;
    }

    const [cmd, ...args] = trimmed.split(/\s+/);

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
