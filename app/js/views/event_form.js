$(document).ready(function () {
    loadCategoriesForOccurred();
});
const loadCategoriesForOccurred = () => {
    $.ajax({
        url: `http://localhost:3100/category`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (!data.success) {
                return;
            }
            popularTheElement($('#select-category'), data.categories);
        },
        error: function (er) {
            console.log(er);
        }
    });
};
const popularTheElement = (element, items) => {
    items.forEach((category) => {
        element.append(`<option value="${category.id}">${category.name}</option>`);
    });
};
$('#btn-save-event').on('click', () => {
    let summary = $('#summary').val();
    let obs = $('#obs').val();
    let selectedCategory = $('#select-category').val();
    if (selectedCategory == 0) {
        return;
    }
    $.ajax({
        url: `http://localhost:3100/event`,
        method: 'POST',
        dataType: 'json',
        data: {
            summary: summary,
            obs: obs,
            category_id: selectedCategory
        },
        success: function (data) {
            if (data.success) {
                showMessage('success', data.message);
                resetEventInputs();
            }
        },
        error: function (er) {
            console.log(er);
        }
    });
});
const resetEventInputs = () => {
    $('#summary').val('');
    $('#obs').val('');
    $('#select-category').val('0');
};
