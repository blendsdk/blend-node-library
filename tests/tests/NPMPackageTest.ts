runner.defineTest("Filesystem", function (t: Blend.testing.TestRunner) {


    var package = new Blend.NPMPackage(__dirname + "/../../");

    t.assertEquals(package.name, "blend-node-library", "package read");


    t.done();
});
