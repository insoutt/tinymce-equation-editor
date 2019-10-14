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
        tinyUi.sClickOnToolbar('click tinymce-mathquill-plugin button', 'button:contains("tinymce-mathquill-plugin button")'),
        tinyApis.sAssertContent('<p>content added from tinymce-mathquill-plugin</p>')
      ]))
    ], onSuccess, onFailure);
  }, {
    plugins: 'tinymce-mathquill-plugin',
    toolbar: 'tinymce-mathquill-plugin'
  }, success, failure);
});
