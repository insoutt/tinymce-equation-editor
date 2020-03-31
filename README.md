# TinyMCE Equation Editor

## What is this?

Equation Editor plugin for [TinyMCE](http://www.tinymce.com/) that uses [MathLive](https://mathlive.io).

![Screenshot](screenshot.png)

Available commands: https://mathlive.io/reference.html

## How do I use it?

Run the command:

```
yarn start
```
```
node_modules/http-server/bin/http-server
```

And visit http://localhost:8080/src/demo/html/ to test the editor

## Usage

Move the folder `dist/equation-editor/` into TinyMCE plugin directory (`tinymce/plugins/`) and add the plugin in your TinyMCE configuration.

```html
<script type="text/javascript">
    tinymce.init({
        selector: 'textarea',
        plugins: ['equation-editor'],
        toolbar: 'equation-editor',
    });
</script>
```

## Configuration

The configuration options for `equation-editor` plugin are:

```html
<script type="text/javascript">
    tinymce.init({
        selector: 'textarea',
        plugins: ['equation-editor'],
        toolbar: 'equation-editor',
        equation_editor_config: {
            url: 'editor/equation_editor.html',
            origin: document.location.origin,
            title: 'Equation Editor',
            space_after_content: '&nbsp;',
            btn_cancel_text: 'Cancel',
            btn_ok_text: 'Insert',
        },
        equation_editor_group: 'basic',
        equation_editor_button_groups: {
            basic: [
                {
                    name: 'Numbers',
                    buttons: '1 2 3 4 \\pm \\dot',
                },
            ],
        },
        equation_editor_button_bar: '1 2 3 4 \\pm \\dot',
    });
</script>
```

For advanced buttons you can use an object of buttons in `equation_editor_button_groups`

```js
equation_editor_button_groups: {
    basic: [{
        name: 'Numbers',
        buttons: [
            {
                text: '0',
                cmd: false,
            },
            {
                text: '\\sqrt{x}',
                latex: '\\sqrt',
                cmd: true,
            },
        ],
    },]
}
```

And also in `equation_editor_button_bar`

```js
equation_editor_button_bar: [
    {
        text: '0',
    },
    {
        text: '\\sqrt{x}',
        latex: '\\sqrt',
        cmd: true,
    },
];
```

## How do I contribute?

### Local Setup

Clone the repo:

`git clone git@github.com:your_github_username/mathquill_editor.git`
Run yarn: `yarn`

Run `yarn start`

Publish `yarn build`

### Testing

Run `yarn unit`

### Pull Requests

Please open your pull requests!

