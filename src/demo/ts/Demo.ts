import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

init('textarea.tinymce', false);
init('div.inline', true);

function init(selector, inline: boolean) {
    tinymce.init({
        selector,
        inline,
        plugins: 'code equation-editor',
        toolbar: 'equation-editor',
        content_css: [
            'https://unpkg.com/mathlive@0.35.0/dist/mathlive.core.css',
            'https://unpkg.com/mathlive@0.35.0/dist/mathlive.css'
        ],
        equation_editor_group: 'advanced',
        equation_editor_config: {
            mathlive_config: {
                smartMode: true,
            },
        },

    });
}
