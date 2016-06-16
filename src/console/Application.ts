namespace Blend.console {

    export abstract class Application {

        protected filesystem: Blend.Filesystem;
        protected childProcess: Blend.ChildProcess;
        protected colors: any;

        public constructor() {
            var me = this;
            me.filesystem = new Blend.Filesystem();
            me.childProcess = new Blend.ChildProcess();
            me.colors = require("colors");
        }

        public abstract run(): void

        /**
         * Writes message to screen with newline
         */
        protected println(message: string) {
            Blend.println(message);
        }

        /**
         * Writes a message to screen without newline
         */
        protected print(message: string) {
            Blend.print(message);
        }

    }

}