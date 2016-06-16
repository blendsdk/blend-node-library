import childProcess = require("child_process");
import { ExecuteReturns } from "./Typings";
import * as Blend from "./Blend";

export class ChildProcess {

    /**
     * Helper utility to append .cmd or .bat to a command for Windows
     */
    public makeCommand(command: string, type: string = "cmd"): string {
        return Blend.isWindows ? `${command}.${type}` : command;
    }

    /**
     * Executes an external utility and returns the results as an ExecuteReturns object
     */
    public execute(command: string, args?: string[], options?: childProcess.ExecOptions): ExecuteReturns {
        var me = this, res: ExecuteReturns = childProcess.spawnSync(command, args, options);
        res.stdout = res.stdout !== null ? res.stdout.toString() : "";
        return res;
    }

}