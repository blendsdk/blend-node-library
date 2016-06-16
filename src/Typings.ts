/**
 * @interface
 * Interface for implementing a logger component
 */
export interface LoggerInterface {

    open(): any;

    close(): any;

    log(type: string, message: string, context?: any): any;

    warn(message: string, context?: any): any;

    error(message: string, context?: any): any;

    info(message: string, context?: any): any;

    debug(message: string, context?: any): any;
}

export interface ExecuteReturns {
    pid: number;
    output: string[];
    stdout: any;
    stderr: any;
    status: number;
    signal: string;
    error: Error;
}

export interface ExecuteResult {
    success: boolean;
    result: any;
}
