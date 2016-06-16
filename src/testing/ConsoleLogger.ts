import colors = require("colors");
import * as Blend from "../Blend";
import { LoggerInterface } from "../Typings";

export class ConsoleLogger implements LoggerInterface {

    private numAsserts = 0;
    private numPasses = 0;
    private numFailed = 0;

    constructor() {
        var me = this;
    }

    open(): any {
        var me = this;
        me.info("Starting at " + (new Date()));
    }

    close(): any {
        this.info(`${this.numAsserts} ASSERTS, ${this.numPasses} PASSED, ${this.numFailed} FAILED`);
    }

    private updateCounts(type: string) {

        var me = this;
        if (type === 'pass' || type === 'fail') {
            me.numAsserts += 1;
            if (type === 'pass') {
                me.numPasses += 1;
            } else {
                me.numFailed += 1;
            }
        }
    }

    log(type: string, message: string, context?: any): any {
        var me = this;
        me.updateCounts(type);
        if (type === 'fail') {
            Blend.println(colors.white.bgRed(`${context.test} ${message} ${JSON.stringify(context, null, 2)}`));
        } else if (type === "pass") {
            process.stdout.write(colors.white.bgGreen("."))
        } else if (type !== "pass") {
            Blend.println(type + " " + message);
        }
    }

    warn(message: string, context?: any): any {
        var me = this;
        this.log(colors.magenta("WARN"), message, context);
    }

    error(message: string, context?: any): any {
        this.log("error", message, context);
    }

    info(message: string, context?: any): any {
        var me = this;
        me.log(colors.white.bgBlue("info"), message, context);
    }

    debug(message: string, context?: any): any {
        this.log("debug", message, context);
    }

}
