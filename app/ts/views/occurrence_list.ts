$(document).ready(function(){

    loadsTheOccurrences()

})

const loadsTheOccurrences = () => {
    $.ajax({
        url: `http://localhost:3100/occurrences`,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            popularTheElement($('#occurrence-list-day-body'), data)
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
            <td>
                <button class="btn btn-sm btn-secundary" data-toggle="modal" onclick="openJsonEditModal(${model.id})">
                JSON
                </button>
            </td>
        </tr>
    `
}

const openJsonEditModal = (occurrenceId: string) => {
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}`,
        method: 'GET',
        dataType: 'json',
        success: function(data){
            
            const occurrenceObject = data
            const occurrenceJson = JSON.stringify(occurrenceObject, null, '\t')

            let modalJsonEdit = $('#modal-json-edit')
            let jsonContentModal = modalJsonEdit.find('#json-content')
            let btnSaveJson = modalJsonEdit.find('#btn-json-save')

            jsonContentModal.val(occurrenceJson)
            btnSaveJson.attr('onclick', `saveJsonOccurrence(${occurrenceObject.id})`)
            modalJsonEdit.show('slow')

        },
        error: function(er){
            console.log(er)
        }
    })
}

$('#btn-close-modal').on('click', () => {
    clearJsonEditModal()
    $('#modal-json-edit').hide('slow')
})

const clearJsonEditModal = () => {
    $('#son-content').val('')
}

const saveJsonOccurrence = (occurrenceId: string) => {
    alert('Está funcionalidade ainda está em contrução ...')
}