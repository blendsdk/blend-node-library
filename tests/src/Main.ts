import * as Testing from "./TestRunner";
require("../tests/sanity-test");
require("../tests/filesystem-test");
require("../tests/builder-application-test");
Testing.runner.run();