const checkAPI = () =>
{
    $.get('http://localhost:3100/checkapi', (data) => {
        alert('API Ativa');
    })
    .fail(() => {
        alert('API Desligada');
    })
}