// 新增 mouse down 事件處理器
export function initializeMouseDragForResizeContainer() {
    // 初始化變數來保存移動狀態
    let isMiddleMouseButtonDown = false;
    let initialX, initialY;
    let initialLeft, initialTop;
    const resizeContainer = document.getElementById('resize_container');
    
    document.addEventListener('mousedown', function(event) {
        // 僅在鼠標中鍵按下時啟用
        if (event.button === 1) {
            console.log(event)
            isMiddleMouseButtonDown = true;
            initialX = event.clientX;
            initialY = event.clientY;
            const computedStyle = window.getComputedStyle(resizeContainer);
            initialLeft = parseInt(computedStyle.left, 10) || 0;
            initialTop = parseInt(computedStyle.top, 10) || 0;
            event.preventDefault(); // 防止預設行為
            document.body.style.cursor = "grabbing"
        }
    });

    document.addEventListener('mousemove', function(event) {
        if (isMiddleMouseButtonDown) {
            const deltaX = event.clientX - initialX;
            const deltaY = event.clientY - initialY;
            resizeContainer.style.left = initialLeft + deltaX + 'px';
            resizeContainer.style.top = initialTop + deltaY + 'px';
        }
    });

    document.addEventListener('mouseup', function(event) {
        if (event.button === 1) {
            isMiddleMouseButtonDown = false;
            document.body.style.cursor = "default"
        }
    });
}