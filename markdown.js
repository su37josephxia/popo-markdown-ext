



async function convertHTMLToMarkdown(content, log) {
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


/**
 * 将文本内容下载为文件
 * @param {string} content - 要下载的文本内容
 * @param {string} [fileName='download.txt'] - 下载的文件名，默认为'download.txt'
 * @param {string} [fileType='text/plain'] - 文件类型，默认为纯文本
 */
function downloadTextAsFile(content, fileName = 'download.txt', fileType = 'text/plain') {
    // 创建Blob对象存储文本内容
    const blob = new Blob([content], { type: fileType });

    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // 模拟点击下载
    document.body.appendChild(link);
    link.click();

    // 清理DOM和释放URL对象
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function downloadImageByUrl(url, fileName) {
    // 创建一个临时的 a 标签
    const link = document.createElement('a');
    link.style.display = 'none'; // 隐藏标签
    document.body.appendChild(link); // 将标签添加到页面中

    try {
        // 创建 XMLHttpRequest 对象获取图片二进制数据
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob'; // 设置响应类型为二进制流


        xhr.onload = function () {
            if (xhr.status === 200) {
                // 创建 Blob 对象
                const blob = xhr.response;
                // 创建可下载的 URL
                const blobUrl = URL.createObjectURL(blob);

                // 设置 a 标签的属性
                link.href = blobUrl;
                link.download = fileName; // 设置下载文件名

                // 触发下载
                link.click();

                // 释放资源
                URL.revokeObjectURL(blobUrl);
            }
        };

        xhr.onerror = function () {
            console.error('图片下载失败');
        };

        xhr.send();
    } catch (error) {
        console.error('处理 URL 时出错:', error);
    } finally {
        // 移除临时标签
        document.body.removeChild(link);
    }
}

function parseMarkdownImages(markdown, callback) {
    // 将 Markdown 文本按行分割
    const lines = markdown.split('\n');

    // 定义图片标记的正则表达式
    // 匹配标准 Markdown 图片语法: ![alt](url)
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;

    // 匹配 HTML 图片标签: <img src="url" alt="alt">
    const htmlImgRegex = /<img\s+[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/gi;

    // 用于存储修改后的 Markdown 内容
    const modifiedLines = [...lines];

    // 逐行检查
    lines.forEach((line, index) => {
        // 检查是否包含标准 Markdown 图片语法
        let match;
        while ((match = imgRegex.exec(line)) !== null) {
            const alt = match[1]; // 图片替代文本
            const originalUrl = match[2]; // 原始图片 URL

            // 调用回调函数，传递图片信息和行号
            const imageInfo = {
                type: 'markdown',
                alt,
                url: originalUrl,
                line: index + 1,
                content: line,
                originalContent: line,
                startIndex: match.index,
                endIndex: match.index + match[0].length
            };

            // 获取回调函数返回的新 URL
            const newUrl = callback(imageInfo);

            // 如果回调返回了新 URL，则替换原 Markdown 中的 URL
            if (newUrl && newUrl !== originalUrl) {
                // 构建新的图片标记
                const newImgTag = `![${alt}](${newUrl})`;
                // 替换当前行中的图片标记
                modifiedLines[index] = modifiedLines[index].replace(match[0], newImgTag);
            }
        }

        // 重置正则表达式，以便在同一行中查找 HTML 图片标签
        imgRegex.lastIndex = 0;

        // 检查是否包含 HTML 图片标签
        while ((match = htmlImgRegex.exec(line)) !== null) {
            const originalUrl = match[1]; // 原始图片 URL

            // 从 HTML 标签中提取 alt 属性（如果存在）
            const altMatch = line.match(/alt\s*=\s*["']([^"']+)["']/i);
            const alt = altMatch ? altMatch[1] : '';

            // 调用回调函数，传递图片信息和行号
            const imageInfo = {
                type: 'html',
                alt,
                url: originalUrl,
                line: index + 1,
                content: line,
                originalContent: line,
                startIndex: match.index,
                endIndex: match.index + match[0].length
            };

            // 获取回调函数返回的新 URL
            const newUrl = callback(imageInfo);

            // 如果回调返回了新 URL，则替换原 Markdown 中的 URL
            if (newUrl && newUrl !== originalUrl) {
                // 构建新的图片标签（保留其他属性）
                const newImgTag = match[0].replace(
                    /src\s*=\s*["'][^"']+["']/,
                    `src="${newUrl}"`
                );
                // 替换当前行中的图片标签
                modifiedLines[index] = modifiedLines[index].replace(match[0], newImgTag);
            }
        }
    });

    // 返回修改后的 Markdown 内容
    return modifiedLines.join('\n');
}

// 使用示例
function handleImage(imageInfo) {
    console.log(`在第 ${imageInfo.line} 行发现图片: ${imageInfo.url}`);
    console.log(`图片类型: ${imageInfo.type}`);
    console.log(`替代文本: ${imageInfo.alt}`);

    // 示例：修改图片 URL（例如添加前缀或替换域名）
    let newUrl = imageInfo.url;
    newUrl = `${Date.now()}.png`

    downloadImageByUrl(imageInfo.url, newUrl);


    console.log(`新的图片 URL: ${newUrl}`);
    console.log('----------------------');

    // 返回新的 URL（如果不想修改，返回 null 或 undefined）
    return newUrl;
}