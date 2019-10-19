import { Pipeline, Logger, GeneralSteps } from '@ephox/agar';
import { TinyLoader, TinyApis } from '@ephox/mcagar';
import { UnitTest } from '@ephox/bedrock';
import Plugin from '../../../main/ts/Plugin';
// This an example of a browser test of the editor.
UnitTest.asynctest('browser.PluginTest', function (success, failure) {
    Plugin();
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            Logger.t('test mathquill-insert command', GeneralSteps.sequence([
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