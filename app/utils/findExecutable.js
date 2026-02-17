import fs from "fs";
import path from "path";

export function findExecutable(command) {
    const PATH = process.env.path || "";
    const dirs = PATH.split(":");

    for (const dir of dirs) {
        const fullPath = path.join(dir, command);
        if (fs.existsSync(fullPath)) {
            try {
                fs.accessSync(fullPath, fs.constants.x_OK);
                return fullPath;
            } catch {
                // if empty skip
            }
        }
    }

    return null;
}