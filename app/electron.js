// app/electron.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "../public/index.html"));
}

// Start Electron
app.whenReady().then(createWindow);

// Quit app on all windows closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC: connect shell input/output
ipcMain.on("shell-input", (event, input) => {
  if (!global.shellProcess) return;
  global.shellProcess.stdin.write(input + "\n");
});

// Expose shell process globally
app.on("ready", () => {
  global.shellProcess = spawn("node", [path.join(__dirname, "main.js")], {
    stdio: "pipe",
  });

  global.shellProcess.stdout.on("data", (data) => {
    BrowserWindow.getAllWindows().forEach((win) =>
      win.webContents.send("shell-output", data.toString()),
    );
  });

  global.shellProcess.stderr.on("data", (data) => {
    BrowserWindow.getAllWindows().forEach((win) =>
      win.webContents.send("shell-output", data.toString()),
    );
  });
});
