import { Pipeline, Logger, GeneralSteps } from '@ephox/agar';
import { TinyLoader, TinyApis } from '@ephox/mcagar';
import { UnitTest } from '@ephox/bedrock';
import Plugin from '../../../main/ts/Plugin';

// This an example of a browser test of the editor.
UnitTest.asynctest('browser.PluginTest', (success, failure) => {
    Plugin();

    TinyLoader.setup(
        (editor, onSuccess, onFailure) => {
            const tinyApis = TinyApis(editor);

            Pipeline.async(
                {},
                [
                    Logger.t(
                        'test equation-insert command',
                        GeneralSteps.sequence([
                            tinyApis.sExecCommand('equation-insert', {
                                html:
                                    '<var>y</var><span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup"><var>x</var></span></span>',
                                latex: 'y^x',
                            }),
                            tinyApis.sAssertContent(
                                '<p><span class="mq-math-mode" data-latex="y^x" contenteditable="false"><var>y</var><span class="mq-supsub mq-non-leaf mq-sup-only"><span class="mq-sup"><var>x</var></span></span></span>&nbsp;<br data-mce-bogus="1"></p>'
                            ),
                        ])
                    ),
                ],
                onSuccess,
                onFailure
            );
        },
        {
            plugins: 'equation-editor',
            toolbar: 'equation-editor',
        },
        success,
        failure
    );
});

