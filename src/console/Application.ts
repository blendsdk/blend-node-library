import * as Blend from "../Blend";

export abstract class Application {

    protected filesystem: Blend.Filesystem;
    protected childProcess: Blend.ChildProcess;

    public constructor() {
        var me = this;
        me.filesystem = new Blend.Filesystem();
        me.childProcess = new Blend.ChildProcess();
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

    /**
     * Get the home folder of the current user
     */
    protected getUserHomeFolder() {
        return process.env.HOME || process.env.USERPROFILE;
    }
}
