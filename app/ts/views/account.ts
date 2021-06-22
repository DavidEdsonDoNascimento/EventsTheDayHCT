$('#btn-sign').on('click', () => {
    
    const email = $('#email').val();
    const password = $('#password').val();
    const isValid = email && password;

    if(!isValid) {
        return;
    }

    $.ajax({
        url: 'http://localhost:3100/sign',
        method: 'POST',
        dataType: 'json',
        data: { email: email, password: password },
        success: (data) => {
            console.log('success');
            window.location.href = 'login.html';
        },
        error: (error) => {
            console.log('error');
            console.log(error);
        }
    })
});

$('#btn-login').on('click', () => {
    
    const email = $('#email').val();
    const password = $('#password').val();
    const isValid = email && password;
    const encryptData = btoa(`${email}:${password}`);

    if(!isValid) {
        return;
    }

    $.ajax({
        url: 'http://localhost:3100/login',
        method: 'GET',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Basic ${encryptData}`);
        }
    })
    .done((data, status) => {
        
        if(status !== "success"){
            console.log(status);
            return;
        }
        
        const { user, token } = data;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        
        location.href = 'index.html';
    })
    .fail((err) => {
        console.log(err);
    });
    
});