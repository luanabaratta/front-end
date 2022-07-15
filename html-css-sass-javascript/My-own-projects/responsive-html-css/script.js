const btnMenu = document.querySelector('.navbar__mobile-btn');
const navbar = document.querySelector('.navbar__itens');

btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('mobile-menu');
})