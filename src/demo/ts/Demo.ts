import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

init('textarea.tinymce', false);
init('div.inline', true);

function init(selector, inline: boolean) {
    tinymce.init({
        selector,
        inline,
        plugins: 'code mathquill-editor',
        toolbar: 'mathquill-editor',
        content_css: 'https://unpkg.com/mathlive/dist/mathlive.css',
        mathquill_editor_group: 'advanced',
    });
}
