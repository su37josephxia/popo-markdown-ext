
const PopoHeaderRule = {
    install(turndownService) {
        // H1 ~ H6 标题转换规则
        turndownService.addRule('customHeading', {
            filter: function (node) {
                // 匹配 <div level="h1" type="heading"> 结构
                return (
                    node.nodeName === 'DIV' &&
                    node.getAttribute('data-block-type') === 'heading' &&
                    /^h[1-6]$/.test(node.getAttribute('data-heading-level'))
                );
            },
            replacement: function (content, node, options) {
                // 获取 level 属性值（h1~h6）
                const level = node.getAttribute('data-heading-level').replace('h', '');
                // 根据 level 生成对应数量的 # 符号
                const headingPrefix = '#'.repeat(parseInt(level));
                // 返回转换后的 Markdown 标题（添加前后换行）
                return `${headingPrefix} ${content}\n`;
            }
        });
    }
}

