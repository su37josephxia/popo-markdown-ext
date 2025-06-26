
const PopoTableRule = {
    install(turndownService, log) {

        // 支持表格转换
        turndownService.addRule('table', {
            filter: ['table'],
            replacement: function (content, node) {
                // 提取表头和数据行
                // const headerRow = node.querySelectorAll('tbody tr')[0];
                // const bodyRows = node.querySelectorAll('tbody tr'); // 支持 tbody

                const [headerRow, ...bodyRows] = node.querySelectorAll('tbody tr');

                let markdown = '|';
                if (headerRow) {
                    // 表格开始
                    // 处理表头
                    const headerCells = headerRow.querySelectorAll('th, td');            // 支持 th
                    headerCells.forEach(cell => {
                        markdown += cell.textContent.trim() + '|';
                    });            // 处理表头
                    markdown += '\n|';            // 处理表头
                    headerCells.forEach(cell => {
                        markdown += '---|';
                    });            // 处理表头
                    markdown += '\n';            // 处理表头
                }
                // 处理数据行
                bodyRows.forEach(row => {

                    markdown += '|';
                    const cells = row.querySelectorAll('th, td'); // 支持 th
                    cells.forEach(cell => {
                        markdown += cell.textContent.trim() + '|';
                    });
                    markdown += '\n';
                });            // 处理数据行
                return markdown;
            }
        })


    }
}

