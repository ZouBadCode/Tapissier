async function createButton(event, parent) {
    var btn = document.createElement('button');
    btn.innerHTML = '新按鈕';
    const id =  await getBtnId();
    console.log(id)
    setElementStyleBTN(btn, event, id, "button");
    parent.appendChild(btn);
}




async function getBtnId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get-id?value=button');
        if (response.ok) {
            const data = await response.json();
            return data.id;
        } else {
            throw new Error('Failed to fetch ID');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function setElementStyleBTN(element, event, ID, elename) {
                
    const inserted_html = document.getElementById('view');
    const insert_scroll = inserted_html.contentWindow
    const html_info = inserted_html.getBoundingClientRect();
    element.id = `${elename}-${ID}(autoID)`
    element.style.position = 'absolute';
    element.style.left = event.offsetX - html_info.left + insert_scroll.scrollX - window.scrollX + 'px';
    element.style.top = event.offsetY - html_info.top + insert_scroll.scrollY - window.scrollY + 'px';
    console.log(element.style.left, element.style.top,event.offsetX,event.offsetY,html_info.left,html_info.top,inserted_html.scrollLeft,inserted_html.scrollTop )
    element.style.padding = '10px';
    element.style.backgroundColor = 'lightcoral';
    element.style.color = 'white';
    element.style.border = 'none';
    element.style.borderRadius = '5px';
    element.style.cursor = 'pointer';
    element.style.zIndex = '99';
}