const removeTime = (id : string) => 
{
    alert(`Removido tempo -> id`)
}

const newTime = (taskId : string) =>
{
    //AQUI VAI LANÇAR UM AJAX QUE CRIA UM NOVO TEMPO
    // $.ajax({
    //     url: 'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL',
    //     dataType: 'json',
    //     method: 'GET',
    //     success: function(data){
    //         console.log(data)
    //     },
    //     error: function(er){
    //         console.log(er)
    //     }
    // })

    let time = new TimeViewModel('10', '09:55', '')
    updateTimes(time)
}

const updateTimes = (model: TimeViewModel) => {

    let schedule = $('#schedule')
    schedule.append(newTimeForTheSession(model))
    
}

const newTimeForTheSession = (model: TimeViewModel) => {
    
    let template =  `
    <div class="row">
        <div class="col-sm-4">
            <div class="times">
                ${model.startTime} até ${model.finalTime}
            </div>
        </div>
        <div class="col-sm-8">
            <button class="btn btn-sm btn-default">Editar</button>
            <button class="btn btn-sm btn-danger" style="border-radius:50%" onclick="removeTime(${model.timeId})">X</button>
        </div>
    </div>
    `
    return template
}

class TimeViewModel {
    public timeId: string;
    public startTime : string;
    public finalTime : string;

    constructor(timeId: string, startTime : string, finalTime : string) {
        this.timeId = timeId
        this.startTime = startTime
        this.finalTime = finalTime
    }
}