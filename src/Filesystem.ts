namespace Blend {

    /**
     * The Filesystem component provides basic utilities for the filesystem.
     */
    export class Filesystem {

        protected fs: any;
        protected path: any;
        protected fse: any;

        public constructor() {
            var me = this;
            me.fs = require("fs");
            me.path = require("path");
            me.fse = require("fs-extra");
        }

        /**
         * Converts the '/' to the corresponding path separator on the current OS
         */
        protected makePath(value: string): string {
            var me = this;
            return value.replace("/", me.path.sep);
        }

        /**
         * Checks if a given fileExists
         */
        protected fileExists(path: string) {
            var me = this;
            try {
                var stat = me.fs.statSync(path);
                if (stat) {
                    return stat.isFile();
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }

        /**
         * Checks if a goven directory exists
         */
        protected dirExists(path: string): boolean {
            var me = this;
            try {
                var stat = me.fs.statSync(path);
                if (stat) {
                    return stat.isDirectory();
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }

        /**
         * Copy a file or a folder from source to dest
         */
        protected copyFile(source: string, dest: string): boolean {
            var me = this,
                s = me.makePath(source),
                d = me.makePath(dest);
            me.fse.copySync(s, d);
            return me.fileExists(dest);
        }

        /**
         * Recursively reads files from a given folder and applies a filter to
         * be able to exclude some files.
         */
        protected findFiles(dir: string, filter: Function): Array<string> {
            var me = this,
                results: Array<string> = [];
            filter = filter || function (fname: string) {
                return true;
            };
            var list = me.fs.readdirSync(dir);
            list.forEach(function (file: string) {
                file = dir + "/" + file;
                var stat = me.fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    results = results.concat(me.findFiles(file, filter));
                } else {
                    if (filter(file) === true) {
                        results.push(file);
                    }
                }
            });
            return results;
        }

        /**
         * Removes and recreates a folder.
         */
        protected reCreateFolder(folder: string) {
            var me = this;
            if (me.dirExists(folder)) {
                me.fse.removeSync(folder);
            }
            me.fs.mkdirSync(folder);
        }

    }
}