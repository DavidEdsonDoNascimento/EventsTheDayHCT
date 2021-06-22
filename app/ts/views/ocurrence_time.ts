$('#btn-add-times').on('click', () => {
    $('#ul-times').append(newTimeTemplate());
})

$('#btn-save-times').on('click', () => {
    
    const ul = $('#ul-times');
    const timesPendent = ul.find('[data-type="insert"]');
    //criar o json para o insert de multi-times
    console.log(timesPendent);

})

const openTimesModal = (occurrenceId: string) => {
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}/times`,
        method: 'GET',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        },
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
                    ul.append(timesListTemplate(occurrenceId, item));
                })
            }

            
            modalTimes.show()

        },
        error: function(er){
            console.log(er)
        }
    })
}


const timesListTemplate = (occurrenceId: string, item: Time) => {
    return `<li id="time-${item.id}" class="p-3" style="list-style-type: none">
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
}

const newTimeTemplate = () => {
    return `<li class="p-3" style="list-style-type: none" data-type="insert">
                <div class="row">
                    <input type="text" class="form-control col-sm-3 fild-time"/> 
                    <span class="col-sm-2 text-center">até</span>
                    <input type="text" class="form-control col-sm-3 fild-time"/>
                    
                    <div class="btn-group btn-group-toggle col-sm-4" data-toggle="buttons">
                       
                    </div>
                </div>
            </li>`
}

const removeTime = (occurrenceId:string, timeId: string) => {
    $.ajax({
        url: `http://localhost:3100/occurrences/${occurrenceId}/times/${timeId}`,
        method: 'DELETE',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
        },
        success: function(data){
            $(`#time-${timeId}`).remove()
        },
        error: function(er){
            console.log(er)
        }
    })
}
