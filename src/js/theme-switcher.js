const checkboxThemeSwitcher = document.getElementById('checkbox-theme-switcher');
const footerThemeColor = document.querySelector('.footer');

const changeTheme = () => {

     if (checkboxThemeSwitcher.checked) {
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
        checkboxThemeSwitcher.checked = true;
        darkTheme();
    }
}


const lightTheme = () => {
    localStorage.setItem('Theme', 'light');
    document.body.classList.remove('dark-theme');
    footerThemeColor.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    footerThemeColor.classList.add('light-theme');
    
}

const darkTheme = () => {
    localStorage.setItem('Theme', 'dark');
    document.body.classList.remove('light-theme');
    footerThemeColor.classList.remove('light-theme');    
    document.body.classList.add('dark-theme');
    footerThemeColor.classList.add('dark-theme');
}

themeOnPage();
checkboxThemeSwitcher.addEventListener('change', changeTheme);