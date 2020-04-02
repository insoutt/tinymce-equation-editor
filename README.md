# TinyMCE Equation Editor

## What is this?

Equation Editor plugin for [TinyMCE](http://www.tinymce.com/) that uses [MathLive](https://mathlive.io).

![Screenshot](screenshot.png)

Available commands: https://mathlive.io/reference.html

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
            url: 'editor/equation_editor.html', // URL of equation editor Page
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


## Development

Download or clone the repository and then run the following commands:

```
yarn
```
```
yarn start
```
```
node_modules/http-server/bin/http-server
```

And visit http://localhost:8080/src/demo/html/ to test the editor


### Testing

Run `yarn unit`

### Pull Requests

Please open your pull requests!

### License
The TinyMCE plugin is open-sourced software licensed under the [MIT license](https://github.com/insoutt/tinymce-equation-editor/blob/master/LICENSE).

### Notes
- This plugin was inspired in ![Foraker TinyMCE Equation Editor](https://github.com/foraker/tinymce_equation_editor)
