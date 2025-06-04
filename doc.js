/**
 * 获取文档内容
 * @returns
 */
function getContent() {
    var html;
    var currentUrl = window.location.href;
    var editorDocument;
    console.log('currentUrl:', currentUrl)
    if (currentUrl.startsWith('https://docs.popo.netease.com/lingxi/') || currentUrl.startsWith('https://docs.popo.netease.com/team/')) {
        var iframes = document.querySelectorAll('iframe');
        window.open(iframes[0].src, '_blank');
        return '请在新打开的窗口获取';
    }

    if (currentUrl.startsWith('https://office.netease.com/doc/')) {
        var iframes = document.querySelectorAll('iframe');
        editorDocument = iframes[0].contentDocument;
    }

    if (currentUrl.startsWith('https://office.netease.com/doc-editor')) {
        editorDocument = document;
    }

    html = editorDocument.querySelector('.bulb-editor').innerHTML;
    // console.log('html', html)
    return html;

    // segmentDocument(editorDocument.querySelector('.bulb-editor'))
    // return segmentDocument(editorDocument.querySelector('.bulb-editor'));

    /**
     * HTML分段
     * @param {*} doc 
     * @returns 
     */
    function segmentDocument(doc) {
        // console.log('segmentDocument', doc)
        var maxLength = 5000;
        var currentLength = 0;
        var segments = [];
        var text = ''
        for (var i = 0; i < doc.childNodes.length; i++) {
            var node = doc.childNodes[i];
            if (currentLength + node.outerHTML.length > maxLength) {
                segments.push(text);
                // console.log('text', text)
                // console.log('-'.repeat(20) + text.length)
                text = node.outerHTML
                currentLength = node.outerHTML.length;
            } else {
                text = text + node.outerHTML
                currentLength = currentLength + node.outerHTML.length;
            }
        }
        segments.push(text);
        // console.log('segments', segments)
        return segments;
    }
}