import { Pipeline, Logger, GeneralSteps } from '@ephox/agar';
import { TinyLoader, TinyApis, TinyUi } from '@ephox/mcagar';
import { UnitTest } from '@ephox/bedrock';
import Plugin from '../../../main/ts/Plugin';

// This an example of a browser test of the editor.
UnitTest.asynctest('browser.PluginTest', (success, failure) => {
  Plugin();

  TinyLoader.setup((editor, onSuccess, onFailure) => {
    const tinyUi = TinyUi(editor);
    const tinyApis = TinyApis(editor);

    Pipeline.async({}, [
      Logger.t('test click on button', GeneralSteps.sequence([
        tinyUi.sClickOnToolbar('click mathquill-editor button', 'button:contains("mathquill-editor button")'),
        tinyApis.sAssertContent('<p>content added from mathquill-editor</p>')
      ]))
    ], onSuccess, onFailure);
  }, {
    plugins: 'mathquill-editor',
    toolbar: 'mathquill-editor'
  }, success, failure);
});
