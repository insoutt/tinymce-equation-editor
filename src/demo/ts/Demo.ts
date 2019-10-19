import Plugin from "../../main/ts/Plugin";

declare let tinymce: any;

Plugin();

init("textarea.tinymce", false);
init("div.inline", true);

function init(selector, inline: boolean) {
    tinymce.init({
        selector: selector,
        inline: inline,
        plugins: "code mathquill-editor",
        toolbar: "mathquill-editor",
        content_css: "mathquill/mathquill.css",
        mathquill_editor_group: "advanced"
    });
}
