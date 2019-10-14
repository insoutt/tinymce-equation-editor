declare const tinymce: any;

const setup = (editor, url) => {
    editor.addCommand("mceMathquill", function(data) {
        // data contenido de execCommand(data)
        console.log("add command mceMathquill", data);
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

    editor.ui.registry.addButton("tinymce-mathquill-plugin", {
        title: "Editor de ecuaciones",
        text: "f(x)",
        onAction: () => {
            // tslint:disable-next-line:no-console
            editor.execCommand("mceMathquill");
        }
    });
};

export default () => {
    tinymce.PluginManager.add("tinymce-mathquill-plugin", setup);
};
