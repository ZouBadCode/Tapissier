document.addEventListener('DOMContentLoaded', () => {
    const ele = document.getElementById('resize_container');
    const view_frame = document.getElementById('view');
    let x = 0, y = 0, w = 0, h = 0;
    let currentResizer = null;

    const updateSize = (e) => {
        requestAnimationFrame(() => {
            if (currentResizer.classList.contains('resizer-r')) {
                showOverlayChange();
                const dx = e.clientX - x;
                ele.style.width = `${w + dx}px`;
            } else if (currentResizer.classList.contains('resizer-b')) {
                showOverlayChange();
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
        const overlay = document.getElementById('overlay_event');
        overlay.style.display = 'block';
        currentResizer = e.target;

    };

    function showOverlayChange(){
        const inserted_html = document.getElementById('view');
        const html_info = inserted_html.getBoundingClientRect();
        var overlay_drop_origin = document.getElementById('overlay_event');
        var overlay_drop = window.getComputedStyle(overlay_drop_origin);
        if (overlay_drop.width != `${html_info.width}px` || overlay_drop.height != `${html_info.height}px`){   
            overlay_drop_origin.style.width = `${html_info.width}px`;
            overlay_drop_origin.style.height = `${html_info.height}px`;
        }

    }
    function hideOverlay(){
        const overlay = document.getElementById('overlay_event');
        overlay.style.display = 'none';
    };


    const mouseMoveHandler = e => {
        console.log(e)
        updateSize(e);
        view_frame.classList.add("user-select-none");
    };

    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        hideOverlay();
        view_frame.classList.remove("user-select-none");

    };

    const resizers = ele.querySelectorAll('.resizer');
    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', mouseDownHandler);
    });
});
