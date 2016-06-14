runner.defineTest("Builder Application", function (t: Blend.testing.TestRunner) {

    class TestApp extends Blend.builder.Application {

        public run() {
            var me = this;

            var t1 = me.checkTypeScriptSanity();
            t.assertTrue(t1.success, "TypeScript OK");

            me.minTypeScriptVersion = "2.0"
            var t2 = me.checkTypeScriptSanity();
            t.assertFalse(t2.success, "TypeScript Not OK");

            var t3 = me.checkCompassSanity();
            t.assertTrue(t1.success, "Compass OK");

            var t4 = me.buildSources(__dirname + '/../fixtures/badcode');
            t.assertFalse(t4.success, "Bad Code OK");

            var t5 = me.buildSources(__dirname + '/../fixtures/goodcode');
            t.assertTrue(t5.success, "Good Code OK");

        }

    }

    var app = new TestApp();
    app.run();

    t.done();
});
