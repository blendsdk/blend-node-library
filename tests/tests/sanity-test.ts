import * as Blend from "blend-node-library";
import { runner } from "../src/TestRunner";

runner.defineTest("Sanity Test", function (t: Blend.testing.TestRunner) {
    t.assertTrue(true, "Sanity check");
    t.done();
});

runner.defineTest("Utils Sanity", function (t: Blend.testing.TestRunner) {

    class TS extends Blend.builder.Application {

        run() {
            var me = this;
            t.assertTrue(me.checkTypeScriptSanity().success, "Typescript exists");
            t.assertTrue(me.checkCompassSanity().success, "Compass exists");
            t.done();
        }
    }

    var test = new TS(__dirname);
    test.run();

});