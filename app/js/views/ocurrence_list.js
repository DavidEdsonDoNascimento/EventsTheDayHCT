$(document).ready(function () {
    loadsTheOccurrences();
});
const loadsTheOccurrences = () => {
    $.ajax({
        url: `http://localhost:3100/occurrence`,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (!data.success) {
                return;
            }
            popularTheElement($('#occurrence-list'), data.occurrence);
        },
        error: function (er) {
            console.log(er);
        }
    });
};
const popularTheElement = (element, occurrences) => {
    occurrences.forEach(item => {
        element.append(templateUpdate(item));
    });
};
const templateUpdate = (model) => {
    return `
    <div class="card col-sm-12">
        <div class="card-title">
            <div class="row">
                <div class="col-sm-4">
                    <input type="checkbox" name="task-focus" id="task-focus" onclick="newTime('teste')">
                    <label for="task-focus">
                        Focar nessa tarefa
                    </label>
                    
                </div>
                <div class="col-sm-8"></div>

            </div>
            <div class="row">
                <div class="col-sm-4">
                    <span style="font-size:10px">Quarta-feira</span>
                    <span style="font-size:12px; color: #9667E9">21 de Abril de 2021</span>
                </div>
                <div class="col-sm-8"></div>
            </div>
        </div>
        <div class="card-body">
            <label>Resumo:</label>
            <p>
                ${model.summary}
            </p>
            
            <button class="btn btn-sm btn-warning" data-toggle="collapse" data-target="#schedule">Horarios</button>
            
            <div id="schedule" class="collapse border p-2 mt-3">

                <div class="row">
                    <div class="col-sm-4">
                        <div class="times">
                            08:15 até 08:29 
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <button class="btn btn-sm btn-default">Editar</button>
                        <button class="btn btn-sm btn-danger" style="border-radius:50%" onclick="removeTime(1)">X</button>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-sm-4">
                        <div class="times">
                            09:10 até 09:50
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <button class="btn btn-sm btn-default">Editar</button>
                        <button class="btn btn-sm btn-danger" style="border-radius:50%" onclick="removeTime(2)">X</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    `;
};
