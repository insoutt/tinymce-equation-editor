import ButtonsTransformer from "./ButtonsTransformer";
import { ButtonConfig } from "./ButtonsTransformer";

declare const tinymce: any;
declare const document: any;

interface Group {
    name: string;
    buttons: Array<ButtonConfig>;
}

const setup = (editor, url) => {
    var settings = editor.settings.mathquill_editor_config;

    // mathquill_editor_config
    if (typeof settings === "undefined") {
        settings = {};
    } else if (typeof settings !== "object") {
        throw "'mathquill_editor_config' property must be an object";
    }

    // url
    if (typeof settings.url === "undefined") {
        settings.url = "equation_editor.html";
    } else if (typeof settings.url === "undefined") {
        throw "'url' property must be a string in mathquill_editor_config";
    }

    // origin
    if (typeof settings.origin === "undefined") {
        settings.origin = document.location.origin;
    } else if (typeof settings.origin === "undefined") {
        throw "'origin' property must be a string in mathquill_editor_config";
    }

    // title
    if (typeof settings.title === "undefined") {
        settings.title = "Equation Editor";
    } else if (typeof settings.title === "undefined") {
        throw "'title' property must be a string in mathquill_editor_config";
    }

    // space_after_content
    if (typeof settings.space_after_content === "undefined") {
        settings.space_after_content = "&nbsp;";
    } else if (typeof settings.space_after_content === "undefined") {
        throw "'space_after_content' property must be a string in mathquill_editor_config";
    }

    

    //----- Events -----//
    editor.on("init", () => {
        setOnClickMathquillContent(editor);
    });

    //----- Commands -----//
    editor.addCommand("mathquill-window", function(data:object = {}) {
        let groups = editor.settings.mathquill_editor_button_groups;
        let btnBar = editor.settings.mathquill_editor_button_bar;
        var htmlLatex = "";

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

        var iframe = editor.windowManager.openUrl({
            url: settings.url,
            title: settings.title,
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
                editor.execCommand("mathquill-insert", {
                    html: htmlLatex,
                    latex: data.latex,
                    currentTarget: data.currentTarget,
                });
                editor.windowManager.close();
            },
            onMessage: (instance, message) => {
                switch (message.mceAction) {
                    case "mathquill-update":
                        htmlLatex = message.html;
                        data.latex = message.latex;
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
                    throw "Group name must be a string";
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
                    mathquill_editor_button_groups: buttonGroups,
                    latex: data.latex
                },
                settings.origin
            );
        };
    });

    editor.addCommand("mathquill-insert", data => {
        if (!data) {
            return;
        }

        // Add div.mq-math-mode
        let htmlLatex = `
            <div class='mq-math-mode' data-latex='${data.latex}'>
                ${data.html}
            </div>${settings.space_after_content}`;

        if (data.currentTarget) {
            console.log('data.currentTarget', data.currentTarget);
            editor.selection.select(data.currentTarget);
        }
        editor.selection.setContent(htmlLatex);
        setOnClickMathquillContent(editor);

    });


    // Register button 
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

function setOnClickMathquillContent(editor) {
    let document = editor.getDoc();
    var mq = document.getElementsByClassName("mq-math-mode");
    // Add onclick listener to all mathquill content
    for (let i = 0; i < mq.length; i++) {
        const mathquillContent = mq[i];
        
        mathquillContent.contentEditable = "false";

        if(mathquillContent.onclick) continue;  

        mathquillContent.onclick = event => {
            event.stopPropagation();
            editor.execCommand(
                "mathquill-window",
                {
                    latex: event.currentTarget.dataset.latex,
                    currentTarget: event.currentTarget,
                }
            );       
        };
    }
}