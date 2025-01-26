// Optional JS functionality to add animations or effects on the page
window.onload = function () {
    const projectSections = document.querySelectorAll('.project');

    projectSections.forEach(section => {
        section.addEventListener('mouseover', () => {
            section.style.transform = 'scale(1.05)';
        });

        section.addEventListener('mouseout', () => {
            section.style.transform = 'scale(1)';
        });
    });
}
