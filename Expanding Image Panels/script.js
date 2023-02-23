const panels = document.querySelectorAll('.panel'); // query selector allows us to select a class from the html
// puts all panels into an array when using querySelectorAll

panels.forEach((panel) => {
    panel.addEventListener('click', () => { // calling a funciton on a click move this out later
        removeActiveClass();
        panel.classList.add('active');
    })
    
})

function removeActiveClass() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}

