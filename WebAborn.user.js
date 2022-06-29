// ==UserScript==
// @name           WebAborn
// @version        19.20220629035616
// @namespace      http://webaborn.herokuapp.com
// @description    Reduce the situation you see disagreeable texts in the way replacing to some word.  ('aborn' means 'purge and unable to read'.)
// @include        *
// ==/UserScript
(function () {
  const abornString = 'あぼ～ん';
  const ng_words = ['\u751f','\u6b7b'];
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