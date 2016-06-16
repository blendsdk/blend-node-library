import childProcess = require("child_process");
import { ExecuteReturns } from "./Typings";

export class ChildProcess {

    /**
     * Executes an external utility and returns the results as an ExecuteReturns object
     */
    public execute(command: string, args?: string[], options?: childProcess.ExecOptions): ExecuteReturns {
        var me = this, res: ExecuteReturns = childProcess.spawnSync(command, args, options);
        res.stdout = res.stdout !== null ? res.stdout.toString() : "";
        return res;
    }

}