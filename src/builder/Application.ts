
namespace Blend.builder {

    /**
     * Base class for creating a code builder application
     */
    export abstract class Application extends Blend.system.Application {

        protected minTypeScriptVersion: string;
        protected minCompassVersion: string;

        public constructor() {
            super();
            var me = this;
            me.minTypeScriptVersion = "1.8.10";
            me.minCompassVersion = "1.0.3";
        }

        protected compareVersion(version1: string, version2: string): number {
            var cv = require("compare-version");
            return cv(version1, version2);
        }

        /**
         * Build the TS sources, both framework and tests
         */
        protected buildSources(tsConfigColder: string): ExecueResult {
            var me = this, res: ExecueResult = {
                success: false,
                result: null
            };
            var result = me.childProcess.execute("tsc", [], { cwd: tsConfigColder });
            if (!result.error) {
                if (result.stdout.indexOf("error") !== -1) {
                    res.result = result.stdout;
                } else {
                    res.result = true;
                    res.result = true;
                }
            } else {
                res.result = result.error.message;
            }
            return res;
        }

        /**
         * Checks if TypeScript exists and it is the correct version.
         */
        protected checkTypeScriptSanity(): ExecueResult {
            var me = this, res: ExecueResult = {
                success: false,
                result: null
            };
            var result = me.childProcess.execute("tsc", ["-v"], { cwd: __dirname });
            if (!result.error) {
                var parts: Array<string> = result.stdout.trim().split(" ");
                if (parts.length !== 2) {
                    res.result = "Could not recognize TypeScript!";
                } else {
                    var ver = me.compareVersion(me.minTypeScriptVersion, parts[1]);
                    if (ver === 0 || ver === -1) {
                        res.success = true;
                        res.result = true;
                    } else {
                        res.result = "Invalid TypeScript version! Found " + parts[1] + ", but we require as least " + me.minTypeScriptVersion;
                    }
                }
            } else {
                res.result = result.error.message;
            }
            return res;
        };

        /**
         * Checks if compass exists and it is the correct version.
         */
        protected checkCompassSanity(): ExecueResult {
            var me = this, res: ExecueResult = {
                success: false,
                result: null
            }
            var result = me.childProcess.execute("compass", ["-v"], { cwd: __dirname });
            if (!result.error) {
                var parts: Array<string> = result.stdout.split("\n");
                if (parts.length < 1) {
                    res.result = "Could not recognize Compass!";
                } else {
                    parts = parts[0].split(" ");
                    if (parts.length !== 3) {
                        res.result = "Could not read Compass version!";
                    } else {
                        var ver = me.compareVersion(me.minCompassVersion, parts[1])
                        if (ver === 0 || ver === -1) {
                            res.success = true;
                            res.result = true;
                        } else {
                            res.result = "Invalid Compass version! Found " + parts[1] + ", but we require as least " + me.minCompassVersion;
                        }
                    }
                }
            } else {
                res.success = false;
                res.result = result.error.message;
            }
            return res;
        }

        /**
         * Print DONE
         */
        protected printDone() {
            var me = this;
            me.println(me.colors.green("DONE."));
        }

        /**
         * Print ALL DONE
         */
        protected printAllDone() {
            var me = this;
            me.println(me.colors.green("ALL DONE."));
        }

    }

}