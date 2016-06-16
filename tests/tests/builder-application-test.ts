import * as Blend from "blend-node-library";
import { runner } from "../src/TestRunner";

runner.defineTest("bump package version", function (t: Blend.testing.TestRunner) {

    class App extends Blend.builder.Application {

        public run() {
            var me = this;
            var cp = new Blend.ChildProcess();
            me.filesystem.remove(me.filesystem.makePath(__dirname + "/package.json"));
            cp.execute(cp.makeCommand("npm"), ["init", "-y"], { cwd: __dirname });
            me.bumpPackageVersion("major", __dirname);
            me.bumpPackageVersion("minor", __dirname);
            var actual = me.bumpPackageVersion("patch", __dirname).result;
            t.assertEquals(actual, "v2.1.1", "version bumped");
            t.done();
        }
    }

    var app = new App(__dirname);
    app.run();
});
