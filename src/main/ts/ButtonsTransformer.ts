import { ButtonConfig } from "./ButtonsTransformer";
export interface ButtonConfig {
    text: string;
    latex: string;
    cmd: boolean;
}

export default class ButtonsTransformer {
    buttons: any;
    readonly SEPARATOR = " ";
    constructor(buttons: any) {
        this.buttons = buttons;
    }

    transform(): Array<ButtonConfig> {
        if (typeof this.buttons === "string") {
            return this.parseString();
        } else if (this.buttons instanceof Array) {
            return this.parseArray();
        } else {
            throw "Buttons must be a string or array";
        }
    }

    private parseArray(): Array<ButtonConfig> {
        if (this.buttons.length === 0) {
            throw "You must define at least one button";
        }
        return this.buttons.map(button => {
            let btn: ButtonConfig = {
                text: "",
                latex: "",
                cmd: false
            };

            // Text property
            if (typeof button !== "object") {
                throw "Button must be an object";
            } else if (typeof button.text === "undefined") {
                throw "You must define text property of button";
            } else if (typeof button.text !== "string") {
                throw "text property of button must be a string";
            } else {
                btn.text = button.text;
            }

            // Latex property
            if (typeof button.latex === "undefined") {
                btn.latex = button.text;
            } else if (typeof button.latex !== "string") {
                throw "latex property of button must be a string";
            } else {
                btn.latex = button.latex;
            }

            // Cmd property
            if (typeof button.cmd === "undefined") {
                btn.cmd = false;
            } else if (typeof button.cmd !== "boolean") {
                throw "cmd property must be boolean";
            } else {
                btn.cmd = button.cmd;
            }
            return btn;
        });
    }

    private parseString(): Array<ButtonConfig> {
        if (this.buttons.length === 0) {
            throw "You must define at least 1 button";
        }
        let buttonsArray = this.buttons.split(this.SEPARATOR);

        return buttonsArray.map(button => {
            return {
                text: button,
                latex: button,
                cmd: false
            };
        });
    }
}
