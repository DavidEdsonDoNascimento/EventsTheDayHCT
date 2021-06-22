
$(document).ready(function(){

    //loadsTheOccurrences()
    $('#occurrence-table').DataTable({
        responsive: true,
        ajax: {
            url: 'http://localhost:3100/occurrences',
            method: 'GET',
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
            },
            dataSrc: ''
        },
        columns: [
            { data: 'summary' },
            { 
                data: 'createdAt',
                render: (data, type) => {
                    return Formatters.formatUTCDateStringToLocal(data)
                } 
            },
            {
                data: 'id',
                render: (data, type) => {
                    return `<button class="btn btn-sm btn-warning" onclick="openTimesModal(${data})">
                                Horários
                            </button>`
                }
            },
            { 
                data: 'id',
                render: (data, type) => {
                    return `<button class="btn btn-sm btn-primary">Detalhes</button>`
                }
            },
            {
                data: 'id',
                render: (data, type) => {
                    return `<button class="btn btn-sm btn-secundary" data-toggle="modal" onclick="openJsonEditModal(${data})">
                                JSON
                            </button>`
                }
            }
        ]
    })
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
            <td>${new Date(model.createdAt).toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="openTimesModal(${model.id})">
                    Horários
                </button>
            </td>
            <td><button class="btn btn-sm btn-primary">Detalhes</button></td>
            <td>
                <button class="btn btn-sm btn-secundary" data-toggle="modal" onclick="openJsonEditModal(${model.id})">
                    JSON
                </button>
            </td>
        </tr>
    `
}

const disabledFildsTime = (timeId: string) => {
    
    let fildTimes = $(`#time-${timeId}`).find('.fild-time')
    
    fildTimes.each((index, item) => {
        $(item).attr('disabled', 'disabled')
    })
}

const enabledFildsTime = (timeId: string) => {
    let fildTimes = $(`#time-${timeId}`).find('.fild-time')
    
    fildTimes.each((index, item) => {
        $(item).removeAttr('disabled')
    })
}

const updateTime = () => {
    alert('Em construção...')
}

const openJsonEditModal = (occurrenceId: string) => {
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}`,
        method: 'GET',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        },
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

const resetFildsUlTimes = () => {
    $('#ul-times').html('')
}
$('#btn-close-modal-times').on('click', () => {
    resetFildsUlTimes()
    $('#modal-times').hide('slow')
})

const clearJsonEditModal = () => {
    $('#son-content').val('')
}

const saveJsonOccurrence = (occurrenceId: string) => {
    let modalJsonEdit = $('#modal-json-edit')
    let jsonContentModal = modalJsonEdit.find('#json-content').val()
    let jsonOccurrence = JSON.parse(jsonContentModal.toString())
    
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}`,
        method: 'PATCH',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        },
        data: jsonOccurrence,
        success: function(data){
            modalJsonEdit.hide('slow')
        },
        error: function(er){
            console.log(er)
        }
    })
}