document.querySelector("#salvar").addEventListener("click", cadastrar)

let tarefas = []

window.addEventListener("load", () => {
    tarefas = JSON.parse( localStorage.getItem("tarefas") ) || []
    atualizar()
})

function atualizar(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    document.querySelector("#tarefas").innerHTML = ""
    tarefas.forEach(tarefa => 
        document.querySelector("#tarefas").innerHTML += criarCard(tarefa))
}

function filtrar(lista){
    document.querySelector("#tarefas").innerHTML = ""
    lista.forEach(tarefa => 
        document.querySelector("#tarefas").innerHTML += criarCard(tarefa)
    )
}

function cadastrar() {
    const carro = document.querySelector("#carro").value
    const ano = document.querySelector("#ano").value
    const categoria = document.querySelector("#categoria").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const tarefa = { //JSON Java Script Object Notation
        id: Date.now(),
        carro,
        ano,
        categoria,
        concluida: false
    }

    if (!isValid(tarefa.carro, document.querySelector("#carro"))) return
    if (!isValid(tarefa.ano, document.querySelector("#ano"))) return

    tarefas.push(tarefa)

    atualizar()
    modal.hide()
}

function isValid(valor, campo){
    if(valor.length == 0){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }else{
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }

}

function apagar(id){
    tarefas = tarefas.filter(tarefa=> tarefa.id !== id)
    atualizar()
}

function concluir(id){
    let tarefaEncontrada = 
            tarefas.find(tarefa => tarefa.id == id)
    tarefaEncontrada.concluida = true
    atualizar()
}

function criarCard(tarefa) {
    let disabled = tarefa.concluida ? "disabled" : ""

    const card = `
        <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card">
            <div class="card-header">
                ${tarefa.carro}
            </div>
            <div class="card-body">
                <p class="card-text">De acordo com seu gosto você tem interresse nesse modelo de carro.</p>
                <p class="card-text">${tarefa.categoria}</p>
                <span class="badge text-bg-warning">${tarefa.ano}pt</span>
            </div>
            <div class="card-footer">
                <a onClick="concluir(${tarefa.id})" href="#" class="btn btn-success ${disabled}" title="marcar como concluída">
                    <i class="bi bi-check2"></i>
                </a>
                <a href="#" onClick="apagar(${tarefa.id})" class="btn btn-danger" title="apagar tarefa">
                    <i class="bi bi-trash3"></i>
                </a>
            </div> <!-- card footer -->
        </div> <!-- card -->
    </div> <!-- col -->
    ` 
    return card
}
