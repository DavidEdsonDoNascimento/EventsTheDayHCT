//essa constante ainda precisa ser pensada onde ficará
const ROUTE_API = `http://localhost:3100`;
$(document).ready(function () {
    btnSaveCategory();
});
const btnSaveCategory = () => {
    $('#btn-save-category').on('click', function () {
        let category = new Category(String($('#category').val()));
        ajaxRequestSaveCategory(category);
    });
};
/**
 * Requisição Ajax responsável por salvar a nova categoria
 * @param category Category
 */
const ajaxRequestSaveCategory = (category) => {
    $.ajax({
        url: `${ROUTE_API}/category`,
        method: 'POST',
        dataType: 'json',
        data: { name: "teste" },
        success: function (data) {
            console.log(data);
        },
        error: function (er) {
            console.log(er);
        }
    });
};
