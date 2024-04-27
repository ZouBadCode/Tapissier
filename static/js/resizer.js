document.addEventListener('DOMContentLoaded', () => {
    const ele = document.getElementById('resize_container');
    const view_frame = document.getElementById('view');
    let x = 0, y = 0, w = 0, h = 0;
    let currentResizer = null;

    const updateSize = (e) => {
        requestAnimationFrame(() => {
            if (currentResizer.classList.contains('resizer-r')) {
                const dx = e.clientX - x;
                ele.style.width = `${w + dx}px`;
            } else if (currentResizer.classList.contains('resizer-b')) {
                const dy = e.clientY - y;
                ele.style.height = `${h + dy}px`;
            }
        });
    };

    const mouseDownHandler = e => {
        x = e.clientX;
        y = e.clientY;
        const styles = window.getComputedStyle(ele);
        w = parseInt(styles.width, 10);
        h = parseInt(styles.height, 10);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        currentResizer = e.target;
    };

    const mouseMoveHandler = e => {
        updateSize(e);
        view_frame.classList.add("user-select-none");
    };

    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        view_frame.classList.remove("user-select-none");
    };

    const resizers = ele.querySelectorAll('.resizer');
    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', mouseDownHandler);
    });
});
