import Plugin from '../../main/ts/Plugin';
Plugin();
init('textarea.tinymce', false);
init('div.inline', true);
function init(selector, inline) {
    tinymce.init({
        selector: selector,
        inline: inline,
        plugins: 'code mathquill-editor',
        toolbar: 'mathquill-editor',
        content_css: 'editor/mathquill/mathquill.css',
        mathquill_editor_group: 'advanced',
    });
}
//# sourceMappingURL=Demo.js.map