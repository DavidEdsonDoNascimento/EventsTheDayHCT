$('#btn-save-category').on('click', () => {
    let categoryInput  = $('#category').val()
    
    $.ajax({
        url: `http://localhost:3100/categories`,
        method: 'POST',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        },
        data: {
            name: categoryInput
        },
        success: function(data){
            showMessage('success', 'Categoria criada com sucesso.')
            resetCategoryInputs()
        },
        error: function(er){
            console.log(er)
        }
    })
})

const resetCategoryInputs = () => {
    $('#category').val('')
}