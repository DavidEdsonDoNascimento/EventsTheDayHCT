
$(document).ready(function(){
    btnSaveCategory()
})

const btnSaveCategory = () => {
    $('#btn-save-category').on('click', function(){
        let category = $('#category').val()
        let strCat = String(category)
        let objC = new Category(strCat)
        ajaxRequestSaveCategory(objC)
    })
}

/**
 * Requisição Ajax responsável por salvar a nova categoria
 * @param category Category
 */
const ajaxRequestSaveCategory = (category: Category) =>
{
    $.ajax({
        url: `http://localhost:3100/category`,
        method: 'POST',
        dataType: 'json',
        data: {
            category: category.name 
        },
        success: function(data){
            console.log(data)
        },
        error: function(er){
            console.log(er)
        }
    })
}
