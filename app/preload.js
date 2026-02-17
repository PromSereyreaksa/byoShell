const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendInput: (data) => ipcRenderer.send("shell-input", data),
  onOutput: (callback) =>
    ipcRenderer.on("shell-output", (_, data) => callback(data)),
});
