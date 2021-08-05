import refs from './refs.js';

const changeTheme = () => {

     if (refs.checkboxThemeSwitcher.checked) {
        darkTheme();
    } else {
        lightTheme();
    }
}

const themeOnPage = () => {
    const currentTheme = localStorage.getItem('Theme');

    if (currentTheme === null || currentTheme === 'light') {
        lightTheme();
    } else {
        refs.checkboxThemeSwitcher.checked = true;
        darkTheme();
    }
}


const lightTheme = () => {
    localStorage.setItem('Theme', 'light');
    document.body.classList.remove('dark-theme');
    refs.footerThemeColor.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    refs.footerThemeColor.classList.add('light-theme');
    
}

const darkTheme = () => {
    localStorage.setItem('Theme', 'dark');
    document.body.classList.remove('light-theme');
    refs.footerThemeColor.classList.remove('light-theme');    
    document.body.classList.add('dark-theme');
    refs.footerThemeColor.classList.add('dark-theme');
}

themeOnPage();
refs.checkboxThemeSwitcher.addEventListener('change', changeTheme);