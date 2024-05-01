async function createDiv(event, parent) {
    var div = document.createElement('div');
    div.innerHTML = '新 Div';
    const id =  await getDivId();
    console.log(id)
    setElementStyle(div, event, id, "div");
    parent.appendChild(div);
}




// 假設 iframe 的 id 是 'targetFrame'
const iframe = document.getElementById('view');

function divAddSync(){
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    console.log('test')
    // 創建一個 MutationObserver 來監聽 DOM 變更
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'DIV') {
                        // 偵測到新的 div 元素，將更動發送到伺服器
                        console.log('New div added:', node);
                        
                    }
                });
            }
        });
    });

    // 配置 observer 以監聽子元素的增加
    const config = { childList: true, subtree: true };
    observer.observe(iframeDocument.body, config);
};

// 定義一個函數來將變更發送到伺服器
function updateServer(data) {
    fetch('https://your-server.com/api/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ htmlContent: data })
    })
    .then(response => response.json())
    .then(data => console.log('Server response:', data))
    .catch(error => console.error('Error updating server:', error));
}

async function getDivId() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get-id?value=div');
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
