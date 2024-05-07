import {populatePanelWithEventTargetAttributes} from './inspector_panel_module/divInspector.js'


let isFocus = false
let ifSame = false
let element_click = null

export function highlightElementInIframe(iframe ,panel) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const insert_html = document.getElementById('view')
    const insert_html_window = insert_html.contentWindow
    // 给 canvas 元素指定唯一的 id
    const canvasId = 'highlight-canvas(tag_system_generate)';
    let canvas = null;

    // 在 iframe 内部为每个元素添加 mouseover 和 mouseleave 事件监听器
    iframeDoc.addEventListener('mouseover', function (event) {

        const element = event.target
        console.log(element)
        // 如果 canvas 尚未创建，则创建并设置 id
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = canvasId;
            iframeDoc.body.appendChild(canvas);
        }

        const rect = element.getBoundingClientRect();

        // 使用 switch 语句处理不同元素的鼠标悬停
        switch (element.tagName.toLowerCase()) {
            case 'html':
                // 对于 <html> 元素，隐藏 canvas
                canvas.style.display = 'none';
                break;

            case 'body':
                // 对于 <body> 元素，设置特定的 canvas 样式
                canvas.width = rect.width + 10;
                canvas.height = rect.height + 10;
                canvas.style.position = 'absolute';
                canvas.style.left = `${rect.left + insert_html_window.scrollX - 5}px`;
                canvas.style.top = `${rect.top + insert_html_window.scrollY - 5}px`;
                canvas.style.pointerEvents = 'none';
                canvas.style.display = 'block';
                break;

            default:
                // 对于其他元素，设置默认的 canvas 样式
                canvas.width = rect.width + 10;
                canvas.height = rect.height + 10;
                canvas.style.position = 'absolute';
                canvas.style.left = `${rect.left + insert_html_window.scrollX +  - 5}px`;
                canvas.style.top = `${rect.top + insert_html_window.scrollY - 5}px`;
                canvas.style.pointerEvents = 'none';
                canvas.style.display = 'block';
                console.log('add')
                if (!element.hasAttribute('event-added')) {
                    // 添加事件監聽器
                    element.addEventListener('click', clickdiv(event, panel));
                }
                    // 標記已添加監聽器
                element.setAttribute('event-added', 'true');
                break;
        }



        // 如果 canvas 是显示状态，则绘制红框
        if (canvas.style.display === 'block') {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            // 创建线性渐变对象
            const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            // 添加紫色和蓝色的颜色渐变
            gradient.addColorStop(0, 'purple');
            gradient.addColorStop(1, 'blue');
            context.strokeStyle = gradient;
            context.lineWidth = 6;
            context.strokeRect(0, 0, canvas.width, canvas.height);
        }
    });

    iframeDoc.addEventListener('mouseout', function (event) {
        // 通过唯一的 id 删除 canvas 元素
        const canvasToRemove = iframeDoc.getElementById(canvasId);
        if (canvasToRemove && isFocus == false) {
            canvasToRemove.remove();
            canvas = null;
        }
    });
}

function clickdiv(event_element, panel){
    return function(){
        if (element_click){
            console.log(element_click, event_element.target)
            if (element_click == event_element.target){
                ifSame = true;
            }
            else{
                element_click = event_element.target;
                ifSame = false;
            }
        }else{
            element_click = event_element.target;
        }

        if (!ifSame){
            isFocus = true;
            console.log(event_element);
            console.log(panel)
            populatePanelWithEventTargetAttributes(event_element, panel);
        }   
    }
}

