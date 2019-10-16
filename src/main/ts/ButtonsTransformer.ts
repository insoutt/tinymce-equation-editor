export interface ButtonConfig {
    text: string;
    cmd: number;
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
            if (typeof button !== "object") {
                throw "Button must be an object";
            } else if (typeof button.text === "undefined") {
                throw "You must define text property of button";
            } else if (typeof button.text !== "string") {
                throw "text property of button must be a string";
            } else if (typeof button.cmd === "undefined") {
                return {
                    text: button.text,
                    cmd: button.text
                };
            } else if (typeof button.cmd !== "string") {
                throw "cmd property of button must be a string";
            }

            return {
                text: button.text,
                cmd: button.cmd
            };
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
                cmd: button
            };
        });
    }
}
