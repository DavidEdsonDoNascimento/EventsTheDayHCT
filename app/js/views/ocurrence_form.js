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
            popularTheElementSelect($('#select-category'), data.categories);
        },
        error: function (er) {
            console.log(er);
        }
    });
};
const popularTheElementSelect = (element, items) => {
    items.forEach((category) => {
        element.append(`<option value="${category.id}">${category.name}</option>`);
    });
};
$('#btn-save-occurrence').on('click', () => {
    let summary = $('#summary').val();
    let obs = $('#obs').val();
    let selectedCategory = $('#select-category').val();
    let isValid = isValidInputFields();
    if (!isValid) {
        return;
    }
    $.ajax({
        url: `http://localhost:3100/occurrence`,
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
                resetOccurrenceInputs();
            }
        },
        error: function (er) {
            console.log(er);
        }
    });
});
const resetOccurrenceInputs = () => {
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
