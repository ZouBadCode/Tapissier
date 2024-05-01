async function createH(event, parent) {
    var h = document.createElement('h1');
    h.innerHTML = '新h1(點擊修改h級別)';
    const id =  await getHid();
    console.log(id)
    setElementStyle(h, event, id, "h");
    parent.appendChild(h);
}




async function getHid() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get-id?value=H');
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