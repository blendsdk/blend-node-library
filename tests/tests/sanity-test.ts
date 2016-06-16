import * as Blend from "blend-node-library";
import { runner } from "../src/TestRunner";

runner.defineTest("Sanity Test", function (t: Blend.testing.TestRunner) {
    t.assertTrue(true, "Sanity check");
    t.done();
});
