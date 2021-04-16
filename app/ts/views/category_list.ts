
$(document).ready(function(){
    ajaxRequestGetCategories()
})

const ajaxRequestGetCategories = () => {
    $.ajax({
        url: `http://localhost:3100/category`,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            createCardsCategories(data.categories)
        },
        error: function(er){
            console.log(er)
        }
    })
}

const createCardsCategories = (categories: Category[]) => {
    let divCategories = $('#categories')

    categories.forEach((item) => {
        divCategories.append(`
        <div class="card">
            <div class="card-body">
                <div>
                    <label for="category">Categoria:</label>
                    <input type="text" class="form-control" value="${item.name}" readonly/>
                    <button class="btn btn-warning mt-3">Editar</button>
                </div>
            </div>
        </div>
        `)
    })
}