
const PopoCodeRule = {
    install(turndownService) {

        // 添加自定义代码块转换规则
        turndownService.addRule('customCodeBlock', {
            filter: function (node) {
                // 匹配 <div data-block-type="code"> 结构
                return (
                    node.nodeName === 'DIV' &&
                    node.getAttribute('data-block-type') === 'code'
                );
            },
            replacement: function (content, node, options) {
                // 提取语言类型（如果有）
                // 清理内容中的 HTML 标签和空白
                let cleanContent = content
                    .trim()
                    .replaceAll('自动换行\n', '')
                    .replaceAll('\n\n', '')
                // 返回转换后的 Markdown 代码块
                return `\`\`\`${cleanContent}\n\`\`\`\n`;
            }
        });

        // 代码块语言标记
        turndownService.addRule('customCodeBlock', {
            filter: function (node) {
                // 匹配 <div data-block-type="code"> 结构
                return (
                    node.nodeName === 'DIV' && node.getAttribute('class') &&
                    node.getAttribute('class').indexOf('code-language-change-btn') > -1
                );
            },
            replacement: function (content, node, options) {
                // 提取语言类型（如果有）
                return `${content}\n`
            }
        })
        // code标签
        turndownService.addRule('customCodeBlock', {
            filter: function (node) {
                // 匹配 <div data-block-type="code"> 结构
                return (
                    node.nodeName === 'CODE'
                );
            },
            replacement: function (content, node, options) {
                // 提取语言类型（如果有）
                return `${content}`
            }
        })

        turndownService.addRule('customCodeBlock', {
            filter: function (node) {
                // 匹配 <div data-block-type="code"> 结构
                return (
                    node.nodeName === 'PRE'
                );
            },
            replacement: function (content, node, options) {
                // 提取语言类型（如果有）
                return `${content} \n`
            }
        })

    }
}

