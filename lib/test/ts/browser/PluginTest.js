"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agar_1 = require("@ephox/agar");
var mcagar_1 = require("@ephox/mcagar");
var bedrock_1 = require("@ephox/bedrock");
var Plugin_1 = require("../../../main/ts/Plugin");
// This an example of a browser test of the editor.
bedrock_1.UnitTest.asynctest('browser.PluginTest', function (success, failure) {
    Plugin_1.default();
    mcagar_1.TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = mcagar_1.TinyApis(editor);
        agar_1.Pipeline.async({}, [
            agar_1.Logger.t('test mathquill-insert command', agar_1.GeneralSteps.sequence([
                tinyApis.sExecCommand('mathquill-insert', {
                    html: '<var>y</var><span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup"><var>x</var></span></span>',
                    latex: 'y^x',
                }),
                tinyApis.sAssertContent('<p><var>y</var><span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup"><var>x</var></span></span><p>'),
            ])),
        ], onSuccess, onFailure);
    }, {
        plugins: 'mathquill-editor',
        toolbar: 'mathquill-editor',
    }, success, failure);
});
//# sourceMappingURL=PluginTest.js.map