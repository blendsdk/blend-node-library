import * as Blend from "blend-node-library";
import { runner } from "../src/TestRunner";

runner.defineTest("makePath", function (t: Blend.testing.TestRunner) {
    var fs = new Blend.Filesystem();
    if (Blend.isWindows) {
        t.assertEquals(fs.makePath("/a/b/c"), "\\a\\b\\c", "Paty fixed");
    } else {
        t.assertTrue(true, "Skipped");
    }
    t.done();
});
