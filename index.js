/*translate import*/
import i18Obj from './translate.js';

/*init local storage variables*/
let lang = 'en';
let theme = 'dark';




/*burger-menu*/
let buttonMenu = document.querySelector('.burger-menu');
let siteNav = document.querySelector('.site-nav');
let menuItem = document.querySelector('.nav-list');

function show() {
    buttonMenu.classList.toggle('active');
    siteNav.classList.toggle('active');
}

buttonMenu.addEventListener('click', show);
menuItem.addEventListener('click', show);


/*portfolio*/
const portfolioButtons = document.querySelectorAll('.portfolio-button');
const portfolioButtonsContainer = document.querySelector('.portfolio-buttons');
const portfolioImages = document.querySelectorAll('.portfolio-image');

portfolioButtonsContainer.addEventListener('click', changeImage);
    function changeImage(event) {
        if (event.target.classList.contains('portfolio-button')) {    
            portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);          
        }  
}

portfolioButtonsContainer.addEventListener('click',addStyleCurrentButton);
function addStyleCurrentButton(event) {
    portfolioButtons.forEach(i => i.classList.remove('checked'));
    event.target.classList.add('checked');         
}
    

/*language button*/
const languageButtonContainer = document.querySelector('.language-check');
const languageButtons = document.querySelectorAll('.button-lang');

languageButtonContainer.addEventListener('click',addStyleLangButton);
function addStyleLangButton(event) {
    languageButtons.forEach(i => i.classList.remove('checked'));
    event.target.classList.add('checked');
}

/*translate*/
const buttonLangEn = document.querySelector('.button-en');
const buttonLangRu = document.querySelector('.button-ru');
const getAllElementAttrI18 = document.querySelectorAll('[data-i18]');

buttonLangRu.addEventListener('click', () => getTranslate('ru'));
buttonLangEn.addEventListener('click', () => getTranslate('en'));

function getTranslate(language) {
        getAllElementAttrI18.forEach(el => el.placeholder ? el.placeholder = i18Obj[`${language}`][el.dataset.i18] : el.textContent = i18Obj[`${language}`][el.dataset.i18]);
}


/*change color theme*/
const buttonChangeColorThemeContainer = document.querySelector('.button-change-color-theme-container');
const buttonChangeColorThemeWhite = document.querySelector('.button-color-theme-white');
const buttonChangeColorThemeDark = document.querySelector('.button-color-theme-dark');
const addClassWhiteTheme = document.querySelectorAll('.color-theme');

buttonChangeColorThemeWhite.addEventListener('click', changeColorTheme);
buttonChangeColorThemeDark.addEventListener('click', changeColorTheme);

function changeColorTheme() {
    addClassWhiteTheme.forEach(cls => cls.classList.toggle('white-theme'));
    portfolioButtons.forEach(cls => cls.classList.toggle('white-theme'));
}

buttonChangeColorThemeContainer.addEventListener('click', changeThemeButton);

function changeThemeButton(event) {
    if (event.target.classList.contains('button-color-theme-white')) {
        buttonChangeColorThemeWhite.classList.add('button-color-hidden');
        buttonChangeColorThemeDark.classList.add('button-color-display');
        buttonChangeColorThemeDark.classList.remove('button-color-hidden');
    } else if (event.target.classList.contains('button-color-theme-dark')) {
        buttonChangeColorThemeDark.classList.add('button-color-hidden');
        buttonChangeColorThemeWhite.classList.remove('button-color-hidden');
        buttonChangeColorThemeWhite.classList.add('button-color-display');
        }
    }
    

/*local storage*/
buttonLangRu.addEventListener('click', () => lang = 'ru');
buttonLangEn.addEventListener('click', () => lang = 'en');

buttonChangeColorThemeWhite.addEventListener('click', () => theme = 'dark');
buttonChangeColorThemeDark.addEventListener('click', () => theme = 'white');


function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
    }
   
    if(localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    //changeColorTheme(theme); 
  }

};

window.addEventListener('load', getLocalStorage);


/*media request 768px change color menu*/
let mediaRequest = window.matchMedia("(max-width: 768px)");
let getSiteNav = document.querySelector('.site-nav');
let getBurgerLine = document.querySelectorAll('.burger-line');


function checkMediaRequest(mediaRequest) {
    if (mediaRequest) { 
        /*change color burger menu*/
       buttonChangeColorThemeWhite.addEventListener('click', () => getSiteNav.classList.add('active-white'));
       buttonChangeColorThemeDark.addEventListener('click', () => getSiteNav.classList.remove('active-white')); 
       /*change color burger line*/
        buttonChangeColorThemeWhite.addEventListener('click', () => getBurgerLine.forEach(line => line.classList.add('active-white')));
        buttonChangeColorThemeDark.addEventListener('click', () => getBurgerLine.forEach(line => line.classList.remove('active-white')));
    } 
}
checkMediaRequest(mediaRequest); 
mediaRequest.addEventListener('', checkMediaRequest);
