$(document).ready(() => {
    sessionSettings();
});

const checkAPI = () =>
{
    $.get('http://localhost:3100/checkapi', (data) => {
        alert('API Ativa');
    })
    .fail(() => {
        alert('API Desligada');
    })
}
const sessionSettings = () => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(!user) {
        window.location.href = "login.html";
    }

    $('.user-name').append(user.email);
    
}