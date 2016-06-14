namespace Blend {

    /**
     * The Filesystem component provides basic utilities for the filesystem.
     */
    export class Filesystem {

        public fs: any;
        public path: any;
        public fse: any;

        public constructor() {
            var me = this;
            me.fs = require("fs");
            me.path = require("path");
            me.fse = require("fs-extra");
        }

        /**
         * Converts the '/' to the corresponding path separator on the current OS
         */
        public makePath(value: string): string {
            var me = this;
            return value.replace("/", me.path.sep);
        }

        /**
         * Checks if a given fileExists
         */
        public fileExists(path: string) {
            var me = this;
            try {
                var stat = me.fs.statSync(me.makePath(path));
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
        public directoryExists(path: string): boolean {
            var me = this;
            try {
                var stat = me.fs.statSync(me.makePath(path));
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
        public copy(source: string, dest: string): boolean {
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
        public findFiles(dir: string, filter: Function): Array<string> {
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
        public reCreateFolder(folder: string) {
            var me = this;
            if (me.directoryExists(folder)) {
                me.fse.removeSync(folder);
            }
            me.fs.mkdirSync(folder);
        }


        /**
         * Reads the contents of a file as text
         */
        public readFileText(filename: string): string {
            var me = this;
            return me.fs.readFileSync(me.makePath(filename)).toString();
        }

        /**
         * Reads the contens of a file as text lines
         */
        public readFileLines(filename: string): Array<string> {
            var me = this;
            return me.readFileText(filename).split("\n");
        }

        /**
         * Writes text contents to a file
         */
        public writeFileText(filename: string, contents: string) {
            var me = this;
            me.fs.writeFileSync(me.makePath(filename), contents);
        }

        /**
         * Writes an array of string to a file
         */
        public writeFileLines(filename: string, lines: Array<string>) {
            var me = this;
            me.writeFileText(filename, lines.join("\n"));
        }

    }
}