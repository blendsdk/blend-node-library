export const isWindows = /^win/.test(process.platform);

import * as console from "./console/console";
export { console };

import * as npm from "./npm/npm";
export { npm };

import * as builder from "./builder/builder";
export { builder };

export { Filesystem } from "./Filesystem";
export { ChildProcess} from "./ChildProcess";

/**
 * Writes message to screen with newline
 */
export function println(message: string) {
    process.stdout.write(message + (isWindows ? "\r\n" : "\n"));
}

/**
 * Writes a message to screen without newline
 */
export function print(message: string) {
    process.stdout.write(message);
}