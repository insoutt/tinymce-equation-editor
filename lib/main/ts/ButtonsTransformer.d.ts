import { ButtonConfig } from './ButtonsTransformer';
export interface ButtonConfig {
    text: string;
    latex: string;
    cmd: boolean;
}
export default class ButtonsTransformer {
    private buttons;
    private readonly SEPARATOR;
    constructor(buttons: any);
    transform(): Array<ButtonConfig>;
    private parseArray;
    private parseString;
}
