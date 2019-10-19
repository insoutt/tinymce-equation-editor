"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Plugin_1 = require("../../main/ts/Plugin");
Plugin_1.default();
init('textarea.tinymce', false);
init('div.inline', true);
function init(selector, inline) {
    tinymce.init({
        selector: selector,
        inline: inline,
        plugins: 'code mathquill-editor',
        toolbar: 'mathquill-editor',
        content_css: 'mathquill/mathquill.css',
        mathquill_editor_group: 'advanced',
    });
}
//# sourceMappingURL=Demo.js.map