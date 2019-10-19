import ButtonsTransformer from "./ButtonsTransformer";
import { ButtonConfig } from "./ButtonsTransformer";

declare const tinymce: any;
declare const document: any;

interface Group {
    name: string;
    buttons: Array<ButtonConfig>;
}

interface DataMathquillWindow {
    latex?: string;
    currentTarget?: string;
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

    // btn_cancel_text
    if (typeof settings.btn_cancel_text === "undefined") {
        settings.btn_cancel_text = "Cancel";
    } else if (typeof settings.btn_cancel_text === "undefined") {
        throw "'btn_cancel_text' property must be a string in mathquill_editor_config";
    }

    // btn_ok_text
    if (typeof settings.btn_ok_text === "undefined") {
        settings.btn_ok_text = "Insert";
    } else if (typeof settings.btn_ok_text === "undefined") {
        throw "'btn_ok_text' property must be a string in mathquill_editor_config";
    }

    let groups = editor.settings.mathquill_editor_button_groups;
    let btnBar = editor.settings.mathquill_editor_button_bar;
    let groupName = editor.settings.mathquill_editor_group;
    var htmlLatex = "";

    if (typeof groupName === "undefined") {
        groupName = "basic";
    } else if (typeof groupName !== "string") {
        throw "'mathquill_editor_group' property must be a string";
    }

    if (typeof groups === "undefined") {
        groups = {
            basic: [
                {
                    name: "Numbers",
                    buttons: [
                        {
                            cmd: false,
                            text: "0"
                        },
                        {
                            cmd: false,
                            text: "1"
                        },
                        {
                            cmd: false,
                            text: "2"
                        },
                        {
                            cmd: false,
                            text: "3"
                        },
                        {
                            cmd: false,
                            text: "4"
                        },
                        {
                            cmd: false,
                            text: "5"
                        },
                        {
                            cmd: false,
                            text: "6"
                        },
                        {
                            cmd: false,
                            text: "7"
                        },
                        {
                            cmd: false,
                            text: "8"
                        },
                        {
                            cmd: false,
                            text: "9"
                        },
                        {
                            cmd: false,
                            text: ","
                        },
                        {
                            cmd: false,
                            text: "."
                        },
                        {
                            cmd: false,
                            text: "\\pi"
                        },
                        {
                            cmd: false,
                            text: "i"
                        },
                        {
                            cmd: false,
                            text: "e"
                        },
                        {
                            cmd: false,
                            text: "\\infty"
                        }
                    ]
                },
                {
                    name: "Arithmetic and Units",
                    buttons: [
                        {
                            cmd: false,
                            text: "+"
                        },
                        {
                            cmd: false,
                            text: "-"
                        },
                        {
                            cmd: false,
                            text: "\\times"
                        },
                        {
                            cmd: false,
                            text: "\\div"
                        },
                        {
                            cmd: false,
                            text: "\\pm"
                        },
                        {
                            cmd: true,
                            latex: "\\overline",
                            text: "\\overline{x}"
                        },
                        {
                            cmd: false,
                            text: "\\cdot"
                        },
                        {
                            cmd: true,
                            latex: "/",
                            text: "/"
                        },
                        {
                            cmd: false,
                            text: "$"
                        },
                        {
                            cmd: false,
                            text: "\\degree"
                        },
                        {
                            cmd: false,
                            text: "%"
                        }
                    ]
                }
            ],
            intermediate: [
                {
                    name: "Exponents, Roots, Logs",
                    buttons: [
                        {
                            cmd: true,
                            latex: "^",
                            text: "y^x"
                        },
                        {
                            cmd: true,
                            latex: "\\sqrt",
                            text: "\\sqrt{x}"
                        },
                        {
                            cmd: true,
                            latex: "\\thirdroot",
                            text: "\\nthroot[3]{x}"
                        },
                        {
                            cmd: true,
                            latex: "\\nthroot",
                            text: "\\nthroot[n]{x}"
                        },
                        {
                            cmd: false,
                            text: "e^x"
                        },
                        {
                            cmd: false,
                            text: "\\ln"
                        },
                        {
                            cmd: false,
                            text: "\\log"
                        },
                        {
                            cmd: false,
                            text: "\\log_b"
                        }
                    ]
                },
                {
                    name: "Relations",
                    buttons: [
                        {
                            cmd: false,
                            text: "="
                        },
                        {
                            cmd: false,
                            text: "\\neq"
                        },
                        {
                            cmd: false,
                            text: "\\sim"
                        },
                        {
                            cmd: false,
                            text: "\\not\\sim"
                        },
                        {
                            cmd: false,
                            text: "\\lt"
                        },
                        {
                            cmd: false,
                            text: "\\gt"
                        },
                        {
                            cmd: false,
                            text: "\\approx"
                        },
                        {
                            cmd: false,
                            text: "\\not\\approx"
                        },
                        {
                            cmd: false,
                            text: "\\le"
                        },
                        {
                            cmd: false,
                            text: "\\ge"
                        },
                        {
                            cmd: false,
                            text: "\\simeq"
                        },
                        {
                            cmd: false,
                            text: "\\not\\simeq"
                        },
                        {
                            cmd: false,
                            text: "\\therefore"
                        }
                    ]
                },
                {
                    name: "Geometry",
                    buttons: [
                        {
                            cmd: false,
                            text: "\\rightarrow"
                        },
                        {
                            cmd: false,
                            text: "\\leftrightarrow"
                        },
                        {
                            cmd: true,
                            latex: "\\overline",
                            text: "\\overline{AB}"
                        },
                        {
                            cmd: true,
                            latex: "\\overarc",
                            text: "\\overarc{AB}"
                        },
                        {
                            cmd: false,
                            text: "\\parallel"
                        },
                        {
                            cmd: false,
                            text: "\\perp"
                        },
                        {
                            cmd: false,
                            text: "\\angle"
                        },
                        {
                            cmd: false,
                            text: "m\\angle"
                        },
                        {
                            cmd: false,
                            text: "\\bigtriangleup"
                        },
                        {
                            cmd: false,
                            text: "▱"
                        },
                        {
                            cmd: false,
                            text: "\\bigodot"
                        }
                    ]
                },
                {
                    name: "Groups",
                    buttons: [
                        {
                            cmd: true,
                            latex: "(",
                            text: "(\\cdot)"
                        },
                        {
                            cmd: true,
                            latex: "[",
                            text: "[\\cdot]"
                        },
                        {
                            cmd: true,
                            latex: "|",
                            text: "|\\cdot|"
                        },
                        {
                            cmd: false,
                            text: "(x,y)"
                        },
                        {
                            cmd: false,
                            text: "[x,y]"
                        },
                        {
                            cmd: false,
                            text: "(x,y]"
                        },
                        {
                            cmd: false,
                            text: "[x,y)"
                        }
                    ]
                }
            ],
            advanced: [
                {
                    name: "Trigonometry",
                    buttons: [
                        {
                            cmd: false,
                            text: "\\sin"
                        },
                        {
                            cmd: false,
                            text: "\\sec"
                        },
                        {
                            cmd: false,
                            text: "\\sin^{-1}"
                        },
                        {
                            cmd: false,
                            text: "\\sec^{-1}"
                        },
                        {
                            cmd: false,
                            text: "\\cos"
                        },
                        {
                            cmd: false,
                            text: "\\csc"
                        },
                        {
                            cmd: false,
                            text: "\\cos^{-1}"
                        },
                        {
                            cmd: false,
                            text: "\\csc^{-1}"
                        },
                        {
                            cmd: false,
                            text: "\\tan"
                        },
                        {
                            cmd: false,
                            text: "\\cot"
                        },
                        {
                            cmd: false,
                            text: "\\tan^{-1}"
                        },
                        {
                            cmd: false,
                            text: "\\cot^{-1}"
                        }
                    ]
                },
                {
                    name: "Statistics",
                    buttons: [
                        {
                            cmd: false,
                            text: "\\mu"
                        },
                        {
                            cmd: false,
                            text: "\\sigma"
                        },
                        {
                            cmd: false,
                            text: "\\overline{x}"
                        },
                        {
                            cmd: false,
                            text: "\\overline{y}"
                        },
                        {
                            cmd: false,
                            text: "x^i"
                        },
                        {
                            cmd: false,
                            text: "x_i"
                        },
                        {
                            cmd: false,
                            text: "x!"
                        },
                        {
                            cmd: false,
                            text: "\\Sigma"
                        }
                    ]
                },
                {
                    name: "Greek",
                    buttons: [
                        {
                            cmd: false,
                            text: "\\alpha"
                        },
                        {
                            cmd: false,
                            text: "\\beta"
                        },
                        {
                            cmd: false,
                            text: "\\gamma"
                        },
                        {
                            cmd: false,
                            text: "\\delta"
                        },
                        {
                            cmd: false,
                            text: "\\theta"
                        },
                        {
                            cmd: false,
                            text: "\\pi"
                        }
                    ]
                },
                {
                    name: "Calculus",
                    buttons: [
                        {
                            cmd: false,
                            text: "\\int"
                        },
                        {
                            cmd: false,
                            text: "\\int_{a}^{b}"
                        },
                        {
                            cmd: false,
                            text: "dx"
                        },
                        {
                            cmd: false,
                            text: "\\frac{d}{dx}"
                        },
                        {
                            cmd: false,
                            text: "\\lim_{x \\to \\infty}",
                            text: "\\lim"
                        },
                        {
                            cmd: false,
                            text: "\\sum_{i=1}^{n}",
                            text: "\\sum"
                        },
                        {
                            cmd: false,
                            text: "\\infty"
                        }
                    ]
                }
            ]
        };
    }

    if (typeof btnBar === "undefined") {
        btnBar = [
            {
                text: "+"
            },
            {
                text: "-"
            },
            {
                text: "\\times"
            },
            {
                text: "\\div"
            },
            {
                text: "y^x",
                latex: "^",
                cmd: true
            },
            {
                text: "\\sqrt{x}",
                latex: "\\sqrt",
                cmd: true
            },
            {
                latex: "\\nthroot",
                text: "\\nthroot[x]{y}",
                cmd: true
            },
            {
                latex: "\\log_b",
                text: "\\log_b",
                cmd: false
            },
            {
                text: "e^x"
            }
        ];
    }

    //----- Events -----//
    editor.on("init", () => {
        setOnClickMathquillContent(editor);
    });

    //----- Commands -----//
    editor.addCommand("mathquill-window", function(
        data: DataMathquillWindow = {}
    ) {
        var iframe = editor.windowManager.openUrl({
            url: settings.url,
            title: settings.title,
            width: 820,
            height: 400,
            buttons: [
                {
                    type: "cancel",
                    text: settings.btn_cancel_text
                },
                {
                    type: "custom",
                    text: settings.btn_ok_text,
                    primary: true
                }
            ],
            onAction: () => {
                editor.execCommand("mathquill-insert", {
                    html: htmlLatex,
                    latex: data.latex,
                    currentTarget: data.currentTarget
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
        const buttonBar = new ButtonsTransformer(btnBar).transform();

        for (const groupName in groups) {
            if (!groups.hasOwnProperty(groupName)) continue;

            let buttonGroup = groups[groupName];

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

            groups[groupName] = transformGroup;
        }

        iframe.onload = function() {
            iframe.contentWindow.postMessage(
                {
                    mathquill_editor_group: groupName,
                    mathquill_editor_button_bar: buttonBar,
                    mathquill_editor_button_groups: groups,
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

        // Add span.mq-math-mode
        let htmlLatex = `
            <span class='mq-math-mode' data-latex='${data.latex}'>
                ${data.html}
            </span>${settings.space_after_content}`;

        if (data.currentTarget) {
            console.log("data.currentTarget", data.currentTarget);
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
    console.log("elements", mq);

    // Add onclick listener to all mathquill content
    for (let i = 0; i < mq.length; i++) {
        const mathquillContent = mq[i];

        mathquillContent.contentEditable = "false";
        if (mathquillContent.onclick) continue;

        mathquillContent.onclick = event => {
            console.log("click", event);

            event.stopPropagation();
            editor.execCommand("mathquill-window", {
                latex: event.currentTarget.dataset.latex,
                currentTarget: event.currentTarget
            });
        };
    }
}
