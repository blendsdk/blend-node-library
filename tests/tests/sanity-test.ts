runner.defineTest("Sanity Test", function (t: Blend.testing.TestRunner) {
    t.assertTrue(true, "Sanity check");
    t.done();
});

runner.defineTest("Sanity Test", function (t: Blend.testing.TestRunner) {
    t.assertTrue(false, "Sanity check");
    t.done();
});
