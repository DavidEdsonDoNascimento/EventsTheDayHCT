const checkAPI = () =>
{
    $.get('http://localhost:3100/status', (data) => {
        alert('API Ativa');
    })
    .fail(() => {
        alert('API Desligada');
    })
}