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
        alert('需要跳转至灵犀文档才能运行，请在新打开的页面中点击插件获取！')
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
}