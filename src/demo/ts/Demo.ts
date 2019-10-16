import Plugin from "../../main/ts/Plugin";

declare let tinymce: any;

Plugin();

init("div.inline", true);
init("textarea.tinymce", false);

function init(selector, inline: boolean) {
    tinymce.init({
        selector: selector,
        inline: inline,
        plugins: "code mathquill-editor",
        toolbar: "mathquill-editor",
        mathquill_editor_group: "basic",
        //mathquill_editor_button_bar: "\\times y^2",
        mathquill_editor_button_bar: [
            {
                text: "y^x",
                latex: "^",
                cmd: true
            },
            {
                text: "y^x",
                latex: "y^x"
            },
            {
                text: "\\sqrt{x}",
                latex: "\\sqrt",
                cmd: true
            }
        ],
        mathquill_editor_button_groups: {
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
                            latex: "^",
                            cmd: true
                        },
                        {
                            text: "\\sqrt{x}",
                            latex: "\\sqrt",
                            cmd: true
                        },
                        {
                            text: "\\nthroot[3]{x}",
                            latex: "\\thirdroot",
                            cmd: true
                        },
                        {
                            text: "\\nthroot[n]{x}",
                            latex: "\\nthroot",
                            cmd: true
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
        }
    });
}
