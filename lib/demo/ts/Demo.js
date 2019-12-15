import Plugin from '../../main/ts/Plugin';
Plugin();
init('textarea.tinymce', false);
init('div.inline', true);
function init(selector, inline) {
    tinymce.init({
        selector: selector,
        inline: inline,
        plugins: 'code equation-editor',
        toolbar: 'equation-editor',
        content_css: 'https://unpkg.com/mathlive/dist/mathlive.css',
        equation_editor_group: 'advanced',
    });
}
//# sourceMappingURL=Demo.js.map