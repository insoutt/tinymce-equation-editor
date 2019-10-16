import ButtonsTransformer from "./ButtonsTransformer";
import { ButtonConfig } from "./ButtonsTransformer";
import { window } from "@ephox/dom-globals";
import { Transform } from "stream";

declare const tinymce: any;
declare const document: any;

interface Group {
    name: string;
    buttons: Array<ButtonConfig>;
}

const setup = (editor, url) => {
    editor.addCommand("mathquill-window", function(data) {
        let settings = editor.settings.mathquill_editor_config;
        let groups = editor.settings.mathquill_editor_button_groups;
        let btnBar = editor.settings.mathquill_editor_button_bar;
        var latex = "";
        if (typeof settings === "undefined") {
            settings = {
                url: "equation_editor.html",
                origin: document.location.origin
            };
        } else if (typeof settings.url === "undefined") {
            throw "Url property must be specified in mathquill_editor_config";
        } else if (typeof settings.origin === "undefined") {
            throw "Origin property must be specified in mathquill_editor_config";
        }

        if (typeof groups === "undefined") {
            groups = {
                basic: [
                    {
                        name: "Numbers",
                        buttons: "1 2 3 4 5 6 7 8 9 0"
                    },
                    {
                        name: "Arithmetic and Units",
                        buttons:
                            "+ - \\times \\div \\pm \\overline \\cdot / $ \\degree %"
                    }
                ],
                intermediate: [
                    {
                        name: "Exponents, Roots, Logs",
                        buttons: [
                            {
                                text: "y^x",
                                latex: "^"
                            },
                            {
                                text: "\\sqrt{x}",
                                latex: "\\sqrt"
                            },
                            {
                                text: "\\nthroot[3]{x}",
                                latex: "\\thirdroot"
                            },
                            {
                                text: "\\nthroot[n]{x}",
                                latex: "\\nthroot"
                            },
                            {
                                text: "e^x"
                            },
                            {
                                text: "\\ln"
                            },
                            {
                                text: "\\log"
                            },
                            {
                                text: "\\log_b"
                            }
                        ]
                    },
                    {
                        name: "Relations",
                        buttons:
                            "= \\neq \\sim \\not\\sim \\lt \\gt \\approx \\not\\approx \\le \\ge \\simeq \\not\\simeq \\therefore"
                    }
                ]
            };
        }

        if (typeof btnBar === "undefined") {
            btnBar = "\\times y^2";
        }

        console.log("add command mathquill-window", data);
        var iframe = editor.windowManager.openUrl({
            url: settings.url,
            title: "Equation Editor",
            width: 820,
            height: 400,
            buttons: [
                {
                    type: "cancel",
                    text: "cancel"
                },
                {
                    type: "custom",
                    text: "insert",
                    primary: true
                }
            ],
            onAction: () => {
                editor.windowManager.close();
                console.log("latex", latex);
            },
            onMessage: (instance, data) => {
                switch (data.mceAction) {
                    case "mathquill-update":
                        latex = data.latex;
                        break;
                }
            }
        });
        iframe = document.querySelector("iframe[src='" + settings.url + "']");
        const buttonBar = new ButtonsTransformer(
            editor.settings.mathquill_editor_button_bar
        ).transform();

        let buttonGroups = editor.settings.mathquill_editor_button_groups;

        for (const groupName in buttonGroups) {
            if (!buttonGroups.hasOwnProperty(groupName)) continue;

            let buttonGroup = buttonGroups[groupName];

            if (!(buttonGroup instanceof Array)) {
                throw "Groups must be an array ";
            }

            let transformGroup: Array<Group> = buttonGroup.map(group => {
                if (typeof group.name === "undefined") {
                    throw "You must define group name property";
                } else if (typeof group.name !== "string") {
                    throw "Group name must be string";
                } else if (typeof group.buttons === "undefined") {
                    throw "You must define buttons property";
                }

                let buttons = new ButtonsTransformer(group.buttons).transform();
                return {
                    name: group.name,
                    buttons: buttons
                };
            });

            buttonGroups[groupName] = transformGroup;
        }

        iframe.onload = function() {
            iframe.contentWindow.postMessage(
                {
                    mathquill_editor_group:
                        editor.settings.mathquill_editor_group,
                    mathquill_editor_button_bar: buttonBar,
                    mathquill_editor_button_groups: buttonGroups
                },
                settings.origin
            );
        };
    });

    editor.ui.registry.addButton("mathquill-editor", {
        title: "Editor de ecuaciones",
        text: "f(x)",
        onAction: () => {
            editor.execCommand("mathquill-window");
        }
    });
};

export default () => {
    tinymce.PluginManager.add("mathquill-editor", setup);
};
