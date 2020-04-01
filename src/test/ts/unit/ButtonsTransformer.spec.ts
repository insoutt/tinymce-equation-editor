import { expect, assert } from 'chai';
import ButtonsTransformer from '../../../main/ts/ButtonsTransformer';

describe('Test ButtonsTransformer', function () {
    it('check string', function () {
        const transformer = new ButtonsTransformer('+ \\times');

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

    it('check array of strings', function () {
        const transformer = new ButtonsTransformer(['+', '\\times']);

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

    it('check array of strings and objects', function () {
        const transformer = new ButtonsTransformer([
            '+',
            {
                text: '\\times',
                latex: '\\times',
                cmd: false,
            },
        ]);

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
        const transformer = new ButtonsTransformer([
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
        const transformer = new ButtonsTransformer([
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
        const transformer = new ButtonsTransformer([
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
        const transformer = new ButtonsTransformer([
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
        const transformer = new ButtonsTransformer('');
        assert.throws(
            () => transformer.transform(),
            'You must define at least 1 button'
        );
    });

    it('constructor must be string or array', function () {
        const transformer = new ButtonsTransformer(1);
        assert.throws(
            () => transformer.transform(),
            'Buttons must be a string or array'
        );
    });

    it('array without buttons', function () {
        const transformer = new ButtonsTransformer([]);
        assert.throws(
            () => transformer.transform(),
            'You must define at least one button'
        );
    });

    it('buttons without text propery', function () {
        const transformer = new ButtonsTransformer([
            {},
            { latex: '1' },
            { any: '1' },
        ]);
        assert.throws(
            () => transformer.transform(),
            'You must define text property of button'
        );
    });

    it('text propery as int', function () {
        const transformer = new ButtonsTransformer([{ text: 1 }]);
        assert.throws(
            () => transformer.transform(),
            'text property of button must be a string'
        );
    });

    it('cmd propery as int', function () {
        const transformer = new ButtonsTransformer([{ text: '1', cmd: 1 }]);
        assert.throws(
            () => transformer.transform(),
            'cmd property must be boolean'
        );
    });

    it('cmd propery as object', function () {
        const transformer = new ButtonsTransformer([{ text: '1', cmd: {} }]);
        assert.throws(
            () => transformer.transform(),
            'cmd property must be boolean'
        );
    });

    it('text propery as object', function () {
        const transformer = new ButtonsTransformer([{ text: {} }]);
        assert.throws(
            () => transformer.transform(),
            'text property of button must be a string'
        );
    });

    it('latex propery as int', function () {
        const transformer = new ButtonsTransformer([{ text: '1', latex: 1 }]);
        assert.throws(
            () => transformer.transform(),
            'latex property of button must be a string'
        );
    });

    it('latex propery as object', function () {
        const transformer = new ButtonsTransformer([{ text: '1', latex: {} }]);
        assert.throws(
            () => transformer.transform(),
            'latex property of button must be a string'
        );
    });

    it('button as int', function () {
        const transformer = new ButtonsTransformer([1]);
        assert.throws(
            () => transformer.transform(),
            'Button must be an object'
        );
    });

    it('button is not an object ', function () {
        const transformer = new ButtonsTransformer([{ text: '1' }, 1, '']);
        assert.throws(
            () => transformer.transform(),
            'Button must be an object'
        );
    });
});
