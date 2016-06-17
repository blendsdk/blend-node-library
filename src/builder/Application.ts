import * as Blend from "../Blend";
import { ExecuteResult } from "../Typings";
import colors = require("colors");
import path = require("path");
import uglifyJS = require("uglify-js");
import uglifyCSS = require("uglifycss");
import compareVersion = require("compare-version");
import child_process = require("child_process");

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
        me.projectFolder = me.filesystem.makePath(projectFolder, true);
    }

    /**
     * Bumps a package version without git tag
     */
    protected bumpPackageVersion(semver: string, folder: string): ExecuteResult {
        var me = this, res: ExecuteResult = {
            success: false,
            result: null
        };
        var result = me.childProcess.execute(me.childProcess.makeCommand("npm"), ["version", semver, "--no-git-tag-version"], { cwd: folder });
        if (!result.error) {
            res.success = true;
            res.result = result.stdout.toString().trim();
        } else {
            res.result = result.stdout;
        }
        return res;
    }

    /**
     * Compare two version strings
     */
    protected compareVersion(version1: string, version2: string): number {
        return compareVersion(version1, version2);
    }

    /**
     * Minifies a JS file
     */
    protected minifyJSFileTo(source: string, dest: string, options: any = {}) {
        var me = this,
            result = uglifyJS.minify(source, options);
        me.filesystem.writeFileText(dest, result.code);
    }

    /**
     * Minifies a CSS file
     */
    protected minifyCSSFileTo(source: string, dest: string, options: any = {}) {
        var me = this,
            result = uglifyCSS.processFiles([source], options);
        me.filesystem.writeFileText(dest, result);
    }

    /**
     * Find all CSS files recursively in a given folder
     */
    protected findCSSFiles(folder: string): Array<string> {
        var me = this, extname: string;
        return me.filesystem.findFiles(folder, function (file: string) {
            extname = path.extname(file);
            return extname === ".css";
        });
    }

    /**
     * Build the themes and styles used external Compass
     */
    protected buildStyles(configRbFolder: string) {
        var me = this;
        me.print("Building Themes and Styles, ");
        var res = me.childProcess.execute(me.childProcess.makeCommand("compass", "bat"), ["compile"], { cwd: configRbFolder });
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
    protected buildSources(tsConfigColder: string): ExecuteResult {
        var me = this, res: ExecuteResult = {
            success: false,
            result: null
        };
        var result = me.childProcess.execute(me.childProcess.makeCommand("tsc"), [], { cwd: tsConfigColder });
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
    protected checkTypeScriptSanity(): ExecuteResult {
        var me = this, res: ExecuteResult = {
            success: false,
            result: null
        };
        var result = me.childProcess.execute(me.childProcess.makeCommand("tsc"), ["-v"], { cwd: me.projectFolder });
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
    protected checkCompassSanity(): ExecuteResult {
        var me = this, res: ExecuteResult = {
            success: false,
            result: null
        }
        var result = me.childProcess.execute(me.childProcess.makeCommand("compass", "bat"), ["-v"], { cwd: me.projectFolder });
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
        var me = this, res: ExecuteResult = {
            success: false,
            result: null
        }
        var result = me.childProcess.execute(me.childProcess.makeCommand("tslint"), ["-v"], { cwd: me.projectFolder });
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

    /**
     * Gets the current git branch name
     */
    protected getGitCurrentBranchName(repoFolder: string): string {
        return child_process.execSync("git rev-parse --abbrev-ref HEAD", {
            cwd: repoFolder
        }).toString().trim();
    }

    /**
     * Check if the current git branch is clean
     */
    protected isGitRepositoryClean(repoFolder: string): boolean {
        var me = this;
        return child_process.execSync("git status --porcelain", {
            cwd: repoFolder
        }).toString().trim() === "";
    }

    /**
     * Commit all and tag a repository
     */
    protected gitCommitAndTag(tag: string, message: string) {
        var me = this,
            options = { cwd: me.projectFolder };
        me.childProcess.execute("git", ["add", "."], options);
        me.childProcess.execute("git", ["commit", "-a", `-m${message}`], options);
        me.childProcess.execute("git", ["tag", tag], options);
    }

    /**
     * Gets a npm config value
     */
    protected getNpmConfig(key: string) {
        return child_process.execSync(`npm config get ${key}`).toString().trim();
    }

    /**
     * sets a npm config value
     */
    protected setNpmConfig(key: string, value: any) {
        return child_process.execSync(`npm config set ${key} ${value}`).toString().trim();
    }

}

