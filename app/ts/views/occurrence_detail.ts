$(document).ready(() => {
    
    const [, occurrence_id ] = window.location.href.toString().split('id=');

    
    $.ajax({
       url: `http://localhost:3100/occurrences/${occurrence_id}`,
       method: 'GET',
       dataType: 'json',
       beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
       },
       success: (data, status) => {
        
        if(status != "success"){
            console.log(data);
        }
        const { id, summary, obs } = data;

        $('#summary').append(summary);
        $('#obs').val(obs);


       },
       error: (err) => {
           console.log(err)
       }
    })
});