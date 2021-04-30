
$(document).ready(function() {

    loadCategoriesForOccurred()

})

const loadCategoriesForOccurred = () => {

    $.ajax({
        url: `http://localhost:3100/category`,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            if(!data.success){
                return
            }
            
            popularTheElement($('#select-category'), data.categories)
        },
        error: function(er){
            console.log(er)
        }
    })

}

const popularTheElement = (element: JQuery, items: Category[]) => {
    
    items.forEach((category) => {
        element.append(`<option value="${category.id}">${category.name}</option>`)
    })

}
