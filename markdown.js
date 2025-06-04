

async function convertHTMLToMarkdown(content, log) {
    // log('contet', content)


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

    // log(2)
    const markdown = turndownService.turndown(content);
    log(markdown);
}


// /**
//  * 简化代码结构
//  * @description 清理无用 HTML 中的标签和属性
//  * @param {string} html - 要清理的 HTML 字符串
//  * @returns {string} 清理后的 HTML 字符串
//  */
// function cleanHTML(html) {
//     // 配置 DOMPurify 的白名单
//     const config = {
//         // ALLOWED_TAGS: ['table', 'div', 'tr', 'td', 'img'], // 允许所有标签
//         // ALLOW_ATTR: ['data-block-type', 'data-heading-level'],
//         FORBID_ATTR: ['class', 'tabindex', 'style', 'data-bulb-node-id', 'data-focus-offset-x', 'data-float', 'data-heading-fold', 'height'],
//     };

//     // 使用 DOMPurify 清理 HTML
//     let clean = DOMPurify.sanitize(html, config);

//     // 将 data-block-type 转换为 type
//     const typeRegex = /data-block-type="([^"]+)"/g;
//     const typeRegex2 = /data-heading-level="([^"]+)"/g;
//     clean = clean.replace(typeRegex, 'type="$1"');
//     clean = clean.replace(typeRegex2, 'level="$1"');
//     // console.log('clean3:', clean3)
//     // 去掉空格与换行符
//     return clean.replace(/\s+/g, ' ').trim();

// }
