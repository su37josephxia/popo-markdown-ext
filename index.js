

var activeTab = null;
document.addEventListener('DOMContentLoaded', function () {
  getActiveTab();
  const getTitleButton = document.getElementById('getTitleButton');
  const titleDisplay = document.getElementById('titleDisplay');

  getTitleButton.addEventListener('click', function () {

    titleDisplay.textContent = 'GO正在获取...'
    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab.id },
        func: getContent,
      },
      async (injectionResults) => {
        if (chrome.runtime.lastError) {
          // 如果有错误，例如权限不足或目标页面不允许脚本注入
          titleDisplay.textContent = `错误: ${chrome.runtime.lastError.message}`;
          console.error(chrome.runtime.lastError.message);
        } else if (injectionResults && injectionResults.length > 0 && injectionResults[0].result) {
          const content = injectionResults[0].result;
          // console.log('content', content)
          const markdown = await convertHTMLToMarkdown(content, console.log)

          titleDisplay.textContent = `HTML获取成功,已复制到剪贴板`;
          // 复制到剪贴板
          navigator.clipboard.writeText(markdown)
          // .then(
          //   function () {
          //     copyButton.textContent = '已复制';
          //     setTimeout(function () {
          //       copyButton.textContent = '复制';
          //     }, 2000);
          //   },
          //   function (err) {
          //     console.error('无法复制到剪贴板: ', err);
          //   }
          // );
          // 你也可以使用 alert(pageTitle); 来弹窗显示
          // alert(pageTitle);
        } else {
          titleDisplay.textContent = '未能获取到标题。';
        }
      }
    );
  });
});


function getActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) {
      titleDisplay.textContent = '错误：找不到活动标签页。';
      return;
    }
    activeTab = tabs[0];

    // 确保 activeTab.id 存在
    if (activeTab.id === undefined) {
      titleDisplay.textContent = '错误：活动标签页没有 ID。';
      return;
    }

    function log(...args) {
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          func: (...args) => console.log(...args),
          args: args
        },
      )
    }
    console.log = log;
  });
}