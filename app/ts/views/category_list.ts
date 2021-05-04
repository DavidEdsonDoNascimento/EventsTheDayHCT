
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

const ajaxRequestDeleteCategory = (id: number) => {
    $.ajax({
        url: `http://localhost:3100/category/${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: function(data){
            if(data.success){
                deleteCardCategory(id)
                showMessage('success', data.message)
                return
            }
            console.log(data)
        },
        error: function(er){
            console.log(er)
        }
    })
}

const ajaxRequestSearchCategory = (name: string) => {
    $.ajax({
        url: `http://localhost:3100/category/${name}`,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.success){
                createCardsCategories(data.categories)
                return
            }
            console.log(data)
        },
        error: function(er){
            console.log(er)
        }
    })
}

const createCardsCategories = (categories: Category[]) => {
    let divCategories = $('#categories')
    divCategories.html('')

    categories.forEach((item) => {
        divCategories.append(`
            <tr id="${item.id}">
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-info btn-sm">Editar</button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteCategory(${item.id})">X</button>
                </td>
            </tr>
        `)
    })
}

const deleteCardCategory = (id: number) => {
    let divCategory = $('#categories').find(`#${id}`)
    divCategory.remove()
}

$('#btn-category-search').on('click', () => {
    
    const categoryField = $('#category-search-field').val()

    if(categoryField === '' || typeof categoryField === undefined) {
        showMessage('warning', 'Campo de busca de categoria deve ser preenchido.')
        return
    }

    searchByCategory(categoryField.toString())
})

const deleteCategory = (id: number) => {
    
    if(typeof id == undefined){ 
        showMessage('danger', 'parametro ID da categoria não encontrado.')
        return
    }
    
    ajaxRequestDeleteCategory(id)
}

const searchByCategory = (name: string) => {
    
    if(name == '' || typeof name == undefined){ 
        showMessage('danger', 'Campo de categoria precisa ser preenchido para que a busca seja realizada.')
        return
    }

    ajaxRequestSearchCategory(name)
}