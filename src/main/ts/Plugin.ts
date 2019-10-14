declare const tinymce: any;

const setup = (editor, url) => {
    console.log("editor", editor);

    editor.addCommand("mathquill-window", function(data) {
        // data contenido de execCommand(data)
        console.log("add command mathquill-window", data);
        editor.windowManager.openUrl(
            {
                url: "equation_editor.html",
                title: "Equation Editor",
                width: 820,
                height: 400
            },
            {
                custom_param: 1
            }
        );
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
