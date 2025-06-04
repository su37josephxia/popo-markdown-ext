



async function convertHTMLToMarkdown(content, log) {
    log(1)

    const turndownService = new TurndownService({
        headingStyle: 'atx', // 使用 # 符号表示标题（如 # H1, ## H2）
        hr: '---',           // 水平线使用 ---
        bulletListMarker: '-', // 无序列表使用 -
    });

    // 添加自定义代码块转换规则
    PopoCodeRule.install(turndownService);
    PopoTableRule.install(turndownService);
    PopoHeaderRule.install(turndownService);
    PopoListRule.install(turndownService);

    const markdown = turndownService.turndown(content);

    log(markdown);

    return markdown;
}