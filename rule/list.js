
const PopoListRule = {
    install(turndownService) {

        // 添加自定义列表项转换规则
        turndownService.addRule('customListItem', {
            filter: function (node) {
                return (
                    node.nodeName === 'DIV' && node.getAttribute('class') &&
                    node.getAttribute('class').indexOf('item-list-placeholder') > -1
                );
            },
            replacement: function (content, node, options) {

                const level =
                    parseInt((node.style.left || '').replace('px', '')) / 28
                const indent = '  '.repeat(level);

                // 根据父节点ul或ol识别是否是有序列表
                const parentList = node.parentNode;
                if (parentList && parentList.nodeName === 'UL') {
                    return indent + '- ';
                }
                if (parentList && parentList.nodeName === 'OL') {
                    return indent + content + ' ';
                }
            }
        });


        turndownService.addRule('customListItem', {
            filter: function (node) {
                return (
                    node.nodeName === 'LI'
                );
            },
            replacement: function (content, node, options) {
                return `${content}`;
            }
        });

    }
}

