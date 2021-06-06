
$(document).ready(function(){

    //loadsTheOccurrences()
    $('#occurrence-table').DataTable({
        responsive: true,
        ajax: {
            url: 'http://localhost:3100/occurrences',
            method: 'GET',
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

const openTimesModal = (occurrenceId: string) => {
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}/times`,
        method: 'GET',
        dataType: 'json',
        success: function(data: Time[]){
            
            //fecha todas as modais pra abrir modal-times
            const timesJson = data
            let modalTimes = $('#modal-times')
            let ul = $('#ul-times')

            if(timesJson.length == 0 ){
                
                ul.append(`<p class="text-center">Nenhum registro de tempo encontrado.</p>`)
            }
            else{

                timesJson.forEach(item => {
                    ul.append(
                    `<li id="time-${item.id}" class="p-3" style="list-style-type: none">
                        <div class="row">
                            <input type="text" class="form-control col-sm-3 fild-time" value="${Formatters.formatUTCDateStringToLocal(item.start)}" disabled/> 
                            <span class="col-sm-2 text-center">até</span>
                            <input type="text" class="form-control col-sm-3 fild-time" value="${Formatters.formatUTCDateStringToLocal(item.end)}" disabled/>
                            
                            <div class="btn-group btn-group-toggle col-sm-4" data-toggle="buttons">
                                <button class="btn btn-secondary  btn-round active" onclick="disabledFildsTime(${item.id})">
                                    <input type="radio" name="options" id="option1" autocomplete="off" checked>
                                    <i class="fas fa-lock"></i>
                                </button>
                                <button class="btn btn-warning btn-round" onclick="enabledFildsTime(${item.id})">
                                    <input type="radio" name="options" id="option2" autocomplete="off">
                                    <i class="fas fa-lock-open"></i>
                                </button>
                                <button class="btn btn-danger btn-round" onclick="removeTime(${occurrenceId}, ${item.id})">
                                    <input type="radio" name="options" id="option3" autocomplete="off">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button class="btn btn-success btn-round" onclick="updateTime(${item.id})">
                                    <input type="radio" name="options" id="option3" autocomplete="off"> 
                                    <i class="fas fa-check"></i>
                                </button>
                            </div>
                        </div>
                    </li>`
                    )
                })
            }

            
            modalTimes.show()

        },
        error: function(er){
            console.log(er)
        }
    })
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

const removeTime = (occurrenceId:string, timeId: string) => {
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}/times/${timeId}`,
        method: 'DELETE',
        success: function(data){
            $(`#time-${timeId}`).remove()
        },
        error: function(er){
            console.log(er)
        }
    })
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
        data: jsonOccurrence,
        success: function(data){
            modalJsonEdit.hide('slow')
        },
        error: function(er){
            console.log(er)
        }
    })
}