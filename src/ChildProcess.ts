interface ExecuteReturns {
    pid: number;
    output: string[];
    stdout: any;
    stderr: any;
    status: number;
    signal: string;
    error: Error;
}

interface ExecuteOptions {
    cwd?: string;
    input?: string;
    stdio?: any;
    env?: any;
    uid?: number;
    gid?: number;
    timeout?: number;
    killSignal?: string;
    maxBuffer?: number;
    encoding?: string;
    shell?: boolean | string;
}

namespace Blend {

    export class ChildProcess {

        protected childProcess: any;

        constructor() {
            var me = this;
            me.childProcess = require("child_process");
        }

        /**
         * Executes an external utility and returns the results as an ExecuteReturns object
         */
        public execute(command: string, args?: string[], options?: ExecuteOptions): ExecuteReturns {
            var me = this;
            return <ExecuteReturns>me.childProcess.spawnSync(command, args, options);
        }

    }
}