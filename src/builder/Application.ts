import * as Blend from "../Blend";
import { ExecueResult } from "../Typings";
import colors = require("colors");

/**
 * Base class for creating a code builder application
 */
export abstract class Application extends Blend.console.Application {

    protected minTypeScriptVersion: string;
    protected minCompassVersion: string;
    protected projectFolder: string;
    protected minTSLintVersion: string;

    public constructor(projectFolder: string) {
        super();
        var me = this;
        me.minTypeScriptVersion = "1.8.10";
        me.minCompassVersion = "1.0.3";
        me.minTSLintVersion = "3.10.2";
        me.projectFolder = me.filesystem.makePath(projectFolder);
    }

    protected compareVersion(version1: string, version2: string): number {
        var cv = require("compare-version");
        return cv(version1, version2);
    }

    /**
     * Build the themes and styles used external Compass
     */
    protected buildStyles(configRbFolder: string) {
        var me = this;
        me.print("Building Themes and Styles, ");
        var res = me.childProcess.execute("compass", ["compile"], { cwd: configRbFolder });
        if (res.stdout.trim().indexOf("error") === -1) {
            me.printDone();
            return true;
        } else {
            me.printError(res.stdout.toString());
            return false;
        }
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
        if (result.stdout.toString().trim() === "") {
            res.success = true;
            res.result = true;
        } else {
            res.result = result.stdout;
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
     * Checks if compass exists and it is the correct version.
     */
    protected checkTSLintSanity() {
        var me = this, res: ExecueResult = {
            success: false,
            result: null
        }
        var result = me.childProcess.execute("tslint", ["-v"], { cwd: __dirname });
        if (!result.error) {
            var stdout = result.stdout.trim();
            var ver = me.compareVersion(me.minTSLintVersion, stdout);
            if (ver === 0 || ver === -1) {
                res.success = true;
                res.result = true;
            } else {
                res.result = "Invalid TSLint version! Found " + stdout + ", but we require as least " + me.minTSLintVersion;
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
        me.println(colors.green("DONE."));
    }

    /**
     * Print ALL DONE
     */
    protected printAllDone() {
        var me = this;
        me.println(colors.green("ALL DONE."));
    }

    /**
     * Print an error message in red
     */
    protected printError(message: string) {
        var me = this;
        me.println(colors.red("ERROR: " + message));
    }

}

