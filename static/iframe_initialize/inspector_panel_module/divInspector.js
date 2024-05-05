export function populatePanelWithEventTargetAttributes(event, shadow_panel) {

    let shadow_panel_html = shadow_panel
    console.log(shadow_panel)
    console.log(shadow_panel_html)
    const targetId = event.target.id;
    const targetClass = event.target.className;
    const targetStyle = event.target.style;

    shadow_panel_html.innerHTML = `
    <style>
        #div_id{
            display: flex;
            flex-direction: column;
        }
        #id_name{
            margin-top: -16px;
            width: 150px;
            height: 30px;
            border-radius: 8px;
            border: 1px solid black;
            text-align: right;
            display: flex;
            align-items: center;
        }
    </style>
    <div id="panel">
        <div id="div_id">
        <p id="id_title">ID</p>
        <div id="id_name">${targetId}</div>
    </div>
        <p>Class: ${targetClass}</p>
        <p>Style: ${targetStyle}</p>
    `;

}