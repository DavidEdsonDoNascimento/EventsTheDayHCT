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
    let isValid = isValidInputFields();
    if (!isValid) {
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
//ToDo - Arrumar uma melhor abordagem
const isValidInputFields = () => {
    let errors = 0;
    errors += isValidInputFieldSummary();
    errors += isValidInputFieldSelectedCategory();
    return errors == 0;
};
const isValidInputFieldSummary = () => {
    let input = $('#summary');
    let value = input.val();
    let formGroup = input.parent();
    let spanMessage = formGroup.children('.invalid-input-message');
    if (value != '') {
        input.removeClass('invalid-input');
        spanMessage.fadeOut();
        return 0;
    }
    input.addClass('invalid-input');
    spanMessage.fadeIn();
    return 1;
};
const isValidInputFieldSelectedCategory = () => {
    let input = $('#select-category');
    let value = input.val();
    let formGroup = input.parent();
    let spanMessage = formGroup.children('.invalid-input-message');
    if (value != 0) {
        input.removeClass('invalid-input');
        spanMessage.fadeOut();
        return 0;
    }
    input.addClass('invalid-input');
    spanMessage.fadeIn();
    return 1;
};
