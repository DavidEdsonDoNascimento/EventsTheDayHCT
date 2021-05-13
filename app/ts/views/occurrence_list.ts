$(document).ready(function(){

    loadsTheOccurrences()

})

const loadsTheOccurrences = () => {
    $.ajax({
        url: `http://localhost:3100/occurrence`,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            if(!data.success){
                return
            }
            
            popularTheElement($('#occurrence-list-day-body'), data.occurrence)
        },
        error: function(er){
            console.log(er)
        }
    })
}

const popularTheElement = (element: JQuery, occurrences: Occurrence[]) => {
    occurrences.forEach(item => {
        element.append(templateUpdate(item))
    })
}

const templateUpdate = (model: Occurrence) => {
    return `
        <tr>
            <td>${model.summary}</td>
            <td>${model.create_in}</td>
            <td><button class="btn btn-sm btn-warning">Horários</button></td>
            <td><button class="btn btn-sm btn-primary">Detalhes</button></td>
        </tr>
    `
}