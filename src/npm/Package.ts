import * as Blend from "../Blend";

export class Package {

    public name: string;
    public version: string;
    public description: string;

    constructor(folder?: string) {

        if (folder) {
            var me = this,
                fs = new Blend.Filesystem(),
                pfile = fs.makePath(folder + "/package.json");
            if (fs.fileExists(pfile)) {
                var p = require(pfile);
                Object.keys(p).forEach(function (prop: string) {
                    (<any>me)[prop] = p[prop];
                });
            }
        }
    }

}
