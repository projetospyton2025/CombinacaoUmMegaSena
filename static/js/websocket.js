// websocket.js
// Gerenciamento de conexão WebSocket e atualizações de progresso
let socket = null;
let currentTaskId = null;

// Inicializar Socket.IO
function initSocketIO(socketioUrl) {
    if (socket) return; // Já inicializado
    
    try {
        socket = io(socketioUrl);
        
        socket.on('connect', () => {
            console.log('Conectado ao servidor Socket.IO');
            if (currentTaskId) {
                subscribeToTask(currentTaskId);
            }
        });
        
        socket.on('connect_error', (error) => {
            console.error('Erro de conexão Socket.IO:', error);
            mostrarErroConexao();
        });
    } catch (e) {
        console.error('Erro ao inicializar Socket.IO:', e);
        mostrarErroConexao();
    }
}

// Inscrever-se para atualizações de uma tarefa
function subscribeToTask(taskId) {
    if (!socket) return false;
    
    currentTaskId = taskId;
    
    // Inscrever-se no canal desta tarefa
    socket.emit('subscribe', { task_id: taskId });
    
    // Definir o manipulador de eventos para esta tarefa
    socket.on(`task_update:${taskId}`, (data) => {
        atualizarProgressoTarefa(data);
    });
    
    return true;
}

// Atualizar a interface com o progresso da tarefa
function atualizarProgressoTarefa(data) {
    console.log('Atualização de tarefa:', data);
    
    const progressBar = document.getElementById('progressoTarefa');
    const statusMsg = document.getElementById('statusTarefa');
    const mensagemTarefa = document.getElementById('mensagemTarefa');
    const btnNovo = document.getElementById('btnNovoProcessamento');
    
    // Atualizar a barra de progresso
    if (progressBar) {
        progressBar.style.width = `${data.progress || 0}%`;
        progressBar.setAttribute('aria-valuenow', data.progress || 0);
    }
    
    // Atualizar mensagem de status
    if (statusMsg) {
        if (data.message) {
            statusMsg.textContent = data.message;
        } else if (data.status === 'completed') {
            statusMsg.textContent = `Processamento concluído! Gerados ${data.total_gerado} palpites.`;
            
            // Mostrar os resultados
            processarResultadoPalpites(data.result);
            
            // Mostrar botão para novo processamento
            if (btnNovo) btnNovo.style.display = 'inline-block';
            
            // Atualizar classe da mensagem
            if (mensagemTarefa) mensagemTarefa.className = 'alert alert-success';
        } else if (data.status === 'processing') {
            if (data.current && data.total) {
                statusMsg.textContent = `Processando: ${data.current} de ${data.total} palpites (${data.progress}%)`;
            } else {
                statusMsg.textContent = `Processando... (${data.progress}%)`;
            }
        } else if (data.status === 'failed' || data.status === 'error') {
            statusMsg.textContent = `Erro: ${data.error || 'Ocorreu um erro durante o processamento.'}`;
            
            // Atualizar classe da mensagem
            if (mensagemTarefa) mensagemTarefa.className = 'alert alert-danger';
            
            // Mostrar botão para novo processamento
            if (btnNovo) btnNovo.style.display = 'inline-block';
        }
    }
}

// Função para mostrar erro de conexão
function mostrarErroConexao() {
    const mensagemTarefa = document.getElementById('mensagemTarefa');
    if (mensagemTarefa) {
        mensagemTarefa.className = 'alert alert-danger';
        mensagemTarefa.innerHTML = 'Erro de conexão com o servidor de atualizações em tempo real.';
    }
}

// Processar o resultado dos palpites e exibi-los
function processarResultadoPalpites(resultado) {
    if (!resultado || !resultado.palpites) return;
    
    const palpitesDiv = document.getElementById('palpites');
    if (!palpitesDiv) return;
    
    // Atualizar o total de palpites
    document.getElementById('totalPalpites').textContent = resultado.total;
    
    // Exibir os palpites em uma tabela
    const table = document.createElement("table");
    table.className = "table table-striped";
    
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    // Cabeçalho numerado de 1 a 6
    for (let i = 1; i <= 6; i++) {
        const th = document.createElement("th");
        th.textContent = `Nº ${i}`;
        headerRow.appendChild(th);
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement("tbody");
    
    // Adicionar cada palpite como uma linha
    resultado.palpites.forEach((palpite) => {
        const row = document.createElement("tr");
        
        // Cada número do palpite em uma célula
        palpite.forEach(numero => {
            const cell = document.createElement("td");
            cell.textContent = numero;
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    palpitesDiv.innerHTML = '';
    palpitesDiv.appendChild(table);
    
    // Exibir o card de palpites
    document.getElementById("palpitesCard").style.display = "block";
    
    // Esconder o processamento assíncrono depois de um tempo
    setTimeout(() => {
        document.getElementById("processamentoAssincrono").style.display = "none";
    }, 5000);
}