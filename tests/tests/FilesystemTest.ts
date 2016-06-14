runner.defineTest("Filesystem", function (t: Blend.testing.TestRunner) {

    var fs = new Blend.Filesystem();

    t.assertExists(fs, "Fs exists");

    if (Blend.isWindows) {
        t.assertNotEquals(fs.makePath("a/b"), "a\\b", "Path correct on windows");
    } else {
        t.assertNotEquals(fs.makePath("a\\b"), "a/b", "Path correct on *nix");
    }

    t.assertTrue(fs.fileExists(__dirname + "/tests.js"), "File exists");
    t.assertFalse(fs.fileExists(__dirname + "/test.js"), "File not exists");


    t.assertTrue(fs.directoryExists(__dirname), "Dir exists");
    t.assertFalse(fs.directoryExists(__dirname + "/a"), "Dir not exists");


    t.done();
});
