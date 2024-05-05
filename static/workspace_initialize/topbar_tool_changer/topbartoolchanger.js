export function topbartoolchanger(){
    const buttons = document.querySelectorAll('.topbar_button');
    const panels = document.querySelectorAll('.panel');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            panels.forEach((panel, panelIndex) => {
                if (index === panelIndex) {
                    if (panel.classList.contains('show')) {
                        panel.classList.remove('show');
                    } else {
                        panel.classList.add('show');
                    }
                } else {
                    panel.classList.remove('show');
                }
            });
        });
    });
}
