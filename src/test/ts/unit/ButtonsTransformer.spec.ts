import { expect, assert } from "chai";
import ButtonsTransformer from "../../../main/ts/ButtonsTransformer";
require("ts-node").register({
    project: null
});

describe("Test ButtonsTransformer", function() {
    it("check string to array", function() {
        const transformer = new ButtonsTransformer("+ \\times");

        expect(transformer.transform()).to.eql([
            {
                text: "+",
                cmd: "+"
            },
            {
                text: "\\times",
                cmd: "\\times"
            }
        ]);
    });

    it("check array transform", function() {
        const transformer = new ButtonsTransformer([
            {
                text: "y^x",
                cmd: "^"
            },
            {
                text: "\\sqrt{x}",
                cmd: "\\sqrt"
            }
        ]);

        expect(transformer.transform()).to.eql([
            {
                text: "y^x",
                cmd: "^"
            },
            {
                text: "\\sqrt{x}",
                cmd: "\\sqrt"
            }
        ]);
    });

    it("check array transform adds cmd property", function() {
        const transformer = new ButtonsTransformer([
            {
                text: "y^x"
            },
            {
                text: "\\sqrt{x}"
            }
        ]);

        expect(transformer.transform()).to.eql([
            {
                text: "y^x",
                cmd: "y^x"
            },
            {
                text: "\\sqrt{x}",
                cmd: "\\sqrt{x}"
            }
        ]);
    });
});

describe("Test ButtonsTransformer fails", function() {
    it("check empty string", function() {
        const transformer = new ButtonsTransformer("");

        // expect(transformer.transform).to.throw(
        //     "You must define at least 1 button"
        // );
        assert.throws(
            () => transformer.transform(),
            "You must define at least 1 button"
        );
    });
});
