declare const tinymce: any;
declare const document: any;

const setup = (editor, url) => {
    editor.addCommand("mathquill-window", function(data) {
        let settings = editor.settings.mathquill_editor_config;
        let groups = editor.settings.mathquill_editor_button_groups;
        let btnBar = editor.settings.mathquill_editor_button_bar;

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
            height: 400
        });
        iframe = document.querySelector("iframe[src='equation_editor.html']");
        setTimeout(() => {
            iframe.contentWindow.postMessage(
                {
                    mathquill_editor_group:
                        editor.settings.mathquill_editor_group,
                    mathquill_editor_button_bar:
                        editor.settings.mathquill_editor_button_bar,
                    mathquill_editor_button_groups:
                        editor.settings.mathquill_editor_button_groups
                },
                settings.origin
            );
        }, 1000);
    });

    editor.ui.registry.addButton("mathquill-editor", {
        title: "Editor de ecuaciones",
        text: "f(x)",
        onAction: () => {
            // tslint:disable-next-line:no-console
            editor.execCommand("mathquill-window");
        }
    });
};

export default () => {
    tinymce.PluginManager.add("mathquill-editor", setup);
};
