// ==UserScript==
// @name           WebAborn_hand100red
// @version        1.0
// @namespace      https://github.com/hand100red/SampleCodeRepository/blob/master/WebAborn.user.js
// @description    Reduce the situation you see disagreeable texts in the way replacing to some word.  ('aborn' means 'purge and unable to read'.)
// @author         hand100red
// @grant          none
// @include        *
// ==/UserScript==
(function () {
/*
  //このファイルの内容をGreasemonkeyで作成したユーザースクリプトに貼り付けることで使用できます。
  //You can use it by pasting the contents of this file into a user script created with Greasemonkey.
  //右記のサイトで作成した元々の内容は以下のとおりです。URL: "https://webaborn.herokuapp.com/"
  //The original contents created on the site on the right are listed below. URL: "https://webaborn.herokuapp.com/"
// @name           WebAborn
// @version        19.20220629102316
// @namespace      http://webaborn.herokuapp.com
// @description    Reduce the situation you see disagreeable texts in the way replacing to some word.  ('aborn' means 'purge and unable to read'.)
*/
  const abornString = 'あぼ～ん';
  //以下は\uで始まるユニバーサル文字で設定されていますが、日本語や英語をそのまま設定しても動作します。
  //The following is set with universal characters starting with \ u, but it will work even if Japanese or English is set as it is.
  //動作しない場合は、改行文字 \u000D\u000A や \r\n が含まれていないことを確認してください。
  //If it doesn't work, make sure the the newline character \u000D\u000A or \r\n is not included.
  const ng_words = ['\u751f','\u6b7b']; //←左記は例です。 <- The left is an example.
  var webaborn = function(node){
    var candidates = document.evaluate('.//text()[not(parent::style) and not(parent::textarea) and not(parent::script)]', node, null, 6, null);
    var i, j, lenC, lenNG, txt;
    for (i=0, lenC=candidates.snapshotLength; i<lenC; i++) {
      txt = candidates.snapshotItem(i).nodeValue;
      for (j=0, lenNG=ng_words.length; j<lenNG; j++){
        if(txt.indexOf(ng_words[j]) >= 0){
          candidates.snapshotItem(i).nodeValue = abornString; break;
        }
      }
    }
    candidates = document.evaluate('.//input[not(@type="text")]/@value | .//img/@alt | .//*/@title | .//a/@href', node, null, 6, null);
    for (i=0, lenC=candidates.snapshotLength; i<lenC; i++) {
      txt = candidates.snapshotItem(i).value;
      for (j=0; j<lenNG; j++){
        if(txt.indexOf(ng_words[j]) >= 0){
          candidates.snapshotItem(i).value = abornString; break;
        }
      }
    }
  };

  var nodeText = document.evaluate('//text()', document, null, 6, null);
  var nodePre = document.evaluate('//pre', document, null, 6, null);
  if (nodeText.snapshotLength===1 && nodePre.snapshotLength===1){
    var del = nodeText.snapshotItem(0);
    var lines = del.nodeValue.split(/\r?\n/);
    var ins = document.createElement('pre');
    ins.style.whiteSpace = 'pre-wrap';
    del.parentNode.replaceChild(ins, del);
    var i, len;
    for(i=0, len=lines.length; i<len; i++){
      ins.appendChild(document.createTextNode(lines[i]));
      ins.appendChild(document.createElement('br'));
    }
  }

  webaborn(document);
  document.addEventListener('DOMNodeInserted', function(e){ webaborn(e.target); }, false);
  document.addEventListener('DOMCharacterDataModified', function(e){ webaborn(e.target); }, false);
  document.addEventListener('DOMAttrModified', function(e){ webaborn(e.target); }, false);
})();
