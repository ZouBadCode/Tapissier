async function createButton(event, parent) {
    var btn = document.createElement('button');
    btn.innerHTML = '新按鈕';
    const id =  await getBtnId();
    console.log(id)
    setElementStyle(btn, event, id, "button");
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