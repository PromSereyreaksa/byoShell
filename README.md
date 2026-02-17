# byoShell

A minimal POSIX‑compliant shell built from scratch in JavaScript — a playground for shell internals, command parsing, and process management, whilst following Codecrafters' "Build Your Own Shell" Challenge.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)  
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
[![Shell](https://img.shields.io/badge/Shell-BF3030?style=for-the-badge&logo=gnubash&logoColor=white)](https://en.wikipedia.org/wiki/Unix_shell)  

---

### **Learning Resources**

I’m learning shell internals, process management, and command parsing while building this project. Key resources I’m following include:  

- [Codecrafters – Build Your Own Shell](https://app.codecrafters.io/courses/shell/overview) – hands-on challenge teaching **command parsing, REPLs, builtin commands, and process execution**.  
- [POSIX Shell Specification](https://pubs.opengroup.org/onlinepubs/9699919799/) – for understanding **shell syntax and behavior**.  
- [Node.js Child Processes](https://nodejs.org/api/child_process.html) – to learn **spawning and managing external commands** in JavaScript.  

---

## **About**

byoShell is my personal project to **build a lightweight shell from scratch** and understand how **command-line interpreters** work under the hood.  

Instead of relying on existing shells like Bash or Zsh, this project implements:

- Parsing user input into commands and arguments  
- Running **builtin commands** (`cd`, `pwd`, `echo`, etc.)  
- Executing **external programs** using Node.js  
- A **REPL loop** that continuously reads, evaluates, and executes commands  

This provides a foundation for experimenting with shell behavior, process management, and command-line tools.

---

## **Core Concepts**

- REPL (Read-Eval-Print Loop) design  
- Command parsing and tokenization  
- Builtin command implementation  
- Spawning and managing child processes in Node.js  
- Event-driven JavaScript with asynchronous process handling  

---

## **Tech Stack**

- **Node.js**  
- **JavaScript (CommonJS modules as used by CodeCrafters)**  
- **POSIX Shell concepts**  

---

© 2026 Prom Sereyreaksa
