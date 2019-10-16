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
                latex: "+"
            },
            {
                text: "\\times",
                latex: "\\times"
            }
        ]);
    });

    it("check array transform", function() {
        const transformer = new ButtonsTransformer([
            {
                text: "y^x",
                latex: "^"
            },
            {
                text: "\\sqrt{x}",
                latex: "\\sqrt"
            }
        ]);

        expect(transformer.transform()).to.eql([
            {
                text: "y^x",
                latex: "^"
            },
            {
                text: "\\sqrt{x}",
                latex: "\\sqrt"
            }
        ]);
    });

    it("check array transform adds latex property", function() {
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
                latex: "y^x"
            },
            {
                text: "\\sqrt{x}",
                latex: "\\sqrt{x}"
            }
        ]);
    });

    it("check array transform remove keys", function() {
        const transformer = new ButtonsTransformer([
            {
                text: "y^x",
                other: "1"
            },
            {
                text: "\\sqrt{x}",
                other: "1"
            }
        ]);

        expect(transformer.transform()).to.eql([
            {
                text: "y^x",
                latex: "y^x"
            },
            {
                text: "\\sqrt{x}",
                latex: "\\sqrt{x}"
            }
        ]);
    });
});

describe("Test ButtonsTransformer fails", function() {
    it("check empty string", function() {
        const transformer = new ButtonsTransformer("");
        assert.throws(
            () => transformer.transform(),
            "You must define at least 1 button"
        );
    });

    it("constructor must be string or array", function() {
        const transformer = new ButtonsTransformer(1);
        assert.throws(
            () => transformer.transform(),
            "Buttons must be a string or array"
        );
    });

    it("array without buttons", function() {
        const transformer = new ButtonsTransformer([]);
        assert.throws(
            () => transformer.transform(),
            "You must define at least one button"
        );
    });

    it("buttons without text propery", function() {
        const transformer = new ButtonsTransformer([
            {},
            { latex: "1" },
            { any: "1" }
        ]);
        assert.throws(
            () => transformer.transform(),
            "You must define text property of button"
        );
    });

    it("value of text propery as int", function() {
        const transformer = new ButtonsTransformer([{ text: 1 }]);
        assert.throws(
            () => transformer.transform(),
            "text property of button must be a string"
        );
    });

    it("value of text propery as object", function() {
        const transformer = new ButtonsTransformer([{ text: {} }]);
        assert.throws(
            () => transformer.transform(),
            "text property of button must be a string"
        );
    });

    it("value of latex propery as int", function() {
        const transformer = new ButtonsTransformer([{ text: "1", latex: 1 }]);
        assert.throws(
            () => transformer.transform(),
            "latex property of button must be a string"
        );
    });

    it("value of latex propery as object", function() {
        const transformer = new ButtonsTransformer([{ text: "1", latex: {} }]);
        assert.throws(
            () => transformer.transform(),
            "latex property of button must be a string"
        );
    });

    it("button as int", function() {
        const transformer = new ButtonsTransformer([1]);
        assert.throws(
            () => transformer.transform(),
            "Button must be an object"
        );
    });

    it("button is not an object ", function() {
        const transformer = new ButtonsTransformer([{ text: "1" }, 1, ""]);
        assert.throws(
            () => transformer.transform(),
            "Button must be an object"
        );
    });
});
