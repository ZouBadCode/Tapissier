export function CreateOverlayForEvent(){
    console.log('createoverlay')
    const inserted_html = document.getElementById('view');
    const html_info = inserted_html.getBoundingClientRect();
    const overlay = document.createElement('div')
    overlay.id = 'overlay_event';
    overlay.style.position = 'fixed';
    overlay.style.width = `${html_info.width}px`;
    overlay.style.height = `${html_info.height}px`;
    overlay.style.left = `${html_info.left}px`;
    overlay.style.top = `${html_info.top}px`;
    overlay.style.display = 'none';
    overlay.style.zIndex = '101'
    document.body.appendChild(overlay);
}