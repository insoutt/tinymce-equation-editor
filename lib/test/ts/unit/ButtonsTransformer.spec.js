import { expect, assert } from 'chai';
import ButtonsTransformer from '../../../main/ts/ButtonsTransformer';
describe('Test ButtonsTransformer', function () {
    it('check string to array', function () {
        var transformer = new ButtonsTransformer('+ \\times');
        expect(transformer.transform()).to.eql([
            {
                text: '+',
                latex: '+',
                cmd: false,
            },
            {
                text: '\\times',
                latex: '\\times',
                cmd: false,
            },
        ]);
    });
    it('check array transform without cmd', function () {
        var transformer = new ButtonsTransformer([
            {
                text: 'y^x',
                latex: '^',
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt',
            },
        ]);
        expect(transformer.transform()).to.eql([
            {
                text: 'y^x',
                latex: '^',
                cmd: false,
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt',
                cmd: false,
            },
        ]);
    });
    it('check array transform with cmd', function () {
        var transformer = new ButtonsTransformer([
            {
                text: 'y^x',
                latex: '^',
                cmd: true,
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt',
                cmd: true,
            },
        ]);
        expect(transformer.transform()).to.eql([
            {
                text: 'y^x',
                latex: '^',
                cmd: true,
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt',
                cmd: true,
            },
        ]);
    });
    it('check array transform adds latex property', function () {
        var transformer = new ButtonsTransformer([
            {
                text: 'y^x',
            },
            {
                text: '\\sqrt{x}',
            },
        ]);
        expect(transformer.transform()).to.eql([
            {
                text: 'y^x',
                latex: 'y^x',
                cmd: false,
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt{x}',
                cmd: false,
            },
        ]);
    });
    it('check array transform remove keys', function () {
        var transformer = new ButtonsTransformer([
            {
                text: 'y^x',
                other: '1',
            },
            {
                text: '\\sqrt{x}',
                other: '1',
            },
        ]);
        expect(transformer.transform()).to.eql([
            {
                text: 'y^x',
                latex: 'y^x',
                cmd: false,
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt{x}',
                cmd: false,
            },
        ]);
    });
});
describe('Test ButtonsTransformer fails', function () {
    it('check empty string', function () {
        var transformer = new ButtonsTransformer('');
        assert.throws(function () { return transformer.transform(); }, 'You must define at least 1 button');
    });
    it('constructor must be string or array', function () {
        var transformer = new ButtonsTransformer(1);
        assert.throws(function () { return transformer.transform(); }, 'Buttons must be a string or array');
    });
    it('array without buttons', function () {
        var transformer = new ButtonsTransformer([]);
        assert.throws(function () { return transformer.transform(); }, 'You must define at least one button');
    });
    it('buttons without text propery', function () {
        var transformer = new ButtonsTransformer([
            {},
            { latex: '1' },
            { any: '1' },
        ]);
        assert.throws(function () { return transformer.transform(); }, 'You must define text property of button');
    });
    it('text propery as int', function () {
        var transformer = new ButtonsTransformer([{ text: 1 }]);
        assert.throws(function () { return transformer.transform(); }, 'text property of button must be a string');
    });
    it('cmd propery as int', function () {
        var transformer = new ButtonsTransformer([{ text: '1', cmd: 1 }]);
        assert.throws(function () { return transformer.transform(); }, 'cmd property must be boolean');
    });
    it('cmd propery as object', function () {
        var transformer = new ButtonsTransformer([{ text: '1', cmd: {} }]);
        assert.throws(function () { return transformer.transform(); }, 'cmd property must be boolean');
    });
    it('text propery as object', function () {
        var transformer = new ButtonsTransformer([{ text: {} }]);
        assert.throws(function () { return transformer.transform(); }, 'text property of button must be a string');
    });
    it('latex propery as int', function () {
        var transformer = new ButtonsTransformer([{ text: '1', latex: 1 }]);
        assert.throws(function () { return transformer.transform(); }, 'latex property of button must be a string');
    });
    it('latex propery as object', function () {
        var transformer = new ButtonsTransformer([{ text: '1', latex: {} }]);
        assert.throws(function () { return transformer.transform(); }, 'latex property of button must be a string');
    });
    it('button as int', function () {
        var transformer = new ButtonsTransformer([1]);
        assert.throws(function () { return transformer.transform(); }, 'Button must be an object');
    });
    it('button is not an object ', function () {
        var transformer = new ButtonsTransformer([{ text: '1' }, 1, '']);
        assert.throws(function () { return transformer.transform(); }, 'Button must be an object');
    });
});
//# sourceMappingURL=ButtonsTransformer.spec.js.map