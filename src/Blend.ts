namespace Blend {

    export const isWindows = /^win/.test(process.platform);

        /**
         * Writes message to screen with newline
         */
        export function println(message: string) {
            process.stdout.write(message + (Blend.isWindows ? "\r\n" : "\n"));
        }

        /**
         * Writes a message to screen without newline
         */
        export function print(message: string) {
            process.stdout.write(message);
        }
}