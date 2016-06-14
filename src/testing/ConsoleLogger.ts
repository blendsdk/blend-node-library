
namespace Blend.testing {

    export class ConsoleLogger implements LoggerInterface {

        private numAsserts = 0;
        private numPasses = 0;
        private numFailed = 0;
        private colors: any;

        constructor() {
            var me = this;
            me.colors = require("colors");
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
                console.log(me.colors.white.bgRed(`${context.test} ${message} ${JSON.stringify(context, null, 2)}`));
            } else if (type === "pass") {
                process.stdout.write(me.colors.white.bgGreen("."))
            } else if (type !== "pass") {
                console.log(type, message);
            }
        }

        warn(message: string, context?: any): any {
            var me = this;
            this.log(me.colors.magenta("WARN"), message, context);
        }

        error(message: string, context?: any): any {
            this.log("error", message, context);
        }

        info(message: string, context?: any): any {
            var me = this;
            me.log(me.colors.white.bgBlue("info"), message, context);
        }

        debug(message: string, context?: any): any {
            this.log("debug", message, context);
        }

    }

}