$('#btn-save-category').on('click', () => {
    let categoryInput = $('#category').val();
    $.ajax({
        url: `http://localhost:3100/category`,
        method: 'POST',
        dataType: 'json',
        data: {
            name: categoryInput
        },
        success: function (data) {
            if (data.success) {
                showCreatedCategoryMessage(data.message);
            }
        },
        error: function (er) {
            console.log(er);
        }
    });
});
const showCreatedCategoryMessage = (msg) => {
    let messageElement = $('.message');
    messageElement.addClass('alert alert-success');
    messageElement.text(msg);
    messageElement.fadeIn();
    setTimeout(() => {
        messageElement.fadeOut();
    }, 2000);
};
