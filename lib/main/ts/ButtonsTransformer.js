"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ButtonsTransformer = /** @class */ (function () {
    function ButtonsTransformer(buttons) {
        this.SEPARATOR = ' ';
        this.buttons = buttons;
    }
    ButtonsTransformer.prototype.transform = function () {
        if (typeof this.buttons === 'string') {
            return this.parseString();
        }
        else if (this.buttons instanceof Array) {
            return this.parseArray();
        }
        else {
            throw new Error('Buttons must be a string or array');
        }
    };
    ButtonsTransformer.prototype.parseArray = function () {
        if (this.buttons.length === 0) {
            throw new Error('You must define at least one button');
        }
        return this.buttons.map(function (button) {
            var btn = {
                text: '',
                latex: '',
                cmd: false,
            };
            // Text property
            if (typeof button !== 'object') {
                throw new Error('Button must be an object');
            }
            else if (typeof button.text === 'undefined') {
                throw new Error('You must define text property of button');
            }
            else if (typeof button.text !== 'string') {
                throw new Error('text property of button must be a string');
            }
            else {
                btn.text = button.text;
            }
            // Latex property
            if (typeof button.latex === 'undefined') {
                btn.latex = button.text;
            }
            else if (typeof button.latex !== 'string') {
                throw new Error('latex property of button must be a string');
            }
            else {
                btn.latex = button.latex;
            }
            // Cmd property
            if (typeof button.cmd === 'undefined') {
                btn.cmd = false;
            }
            else if (typeof button.cmd !== 'boolean') {
                throw new Error('cmd property must be boolean');
            }
            else {
                btn.cmd = button.cmd;
            }
            return btn;
        });
    };
    ButtonsTransformer.prototype.parseString = function () {
        if (this.buttons.length === 0) {
            throw new Error('You must define at least 1 button');
        }
        var buttonsArray = this.buttons.split(this.SEPARATOR);
        return buttonsArray.map(function (button) {
            return {
                text: button,
                latex: button,
                cmd: false,
            };
        });
    };
    return ButtonsTransformer;
}());
exports.default = ButtonsTransformer;
//# sourceMappingURL=ButtonsTransformer.js.map