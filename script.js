function adicionarCliente() {
    const nomeCliente = document.getElementById('nome-cliente').value;
    const telefoneCliente = document.getElementById('telefone-cliente').value;
    const observacoesCliente = document.getElementById('observacoes-cliente').value;
  
    if (nomeCliente === '' || telefoneCliente === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const tabela = document.getElementById('tabela-clientes').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
  
    novaLinha.insertCell(0).innerText = nomeCliente;
    novaLinha.insertCell(1).innerText = telefoneCliente;
    novaLinha.insertCell(2).innerText = observacoesCliente;
  
    const novaCelula = novaLinha.insertCell(3);
    novaCelula.innerHTML = `
      <button class="btn btn-warning btn-sm me-2" onclick="editarLinha(this)">Editar</button>
      <button class="btn btn-danger btn-sm" onclick="excluirLinha(this)">Excluir</button>
    `;

    document.getElementById('nome-cliente').value = '';
    document.getElementById('telefone-cliente').value = '';
    document.getElementById('observacoes-cliente').value = '';
  }

  function editarLinha(botao) {
    const linha = botao.parentNode.parentNode;
    const nomeCliente = linha.cells[0].innerText;
    const telefoneCliente = linha.cells[1].innerText;
    const observacoesCliente = linha.cells[2].innerText;
  
    document.getElementById('nome-cliente').value = nomeCliente;
    document.getElementById('telefone-cliente').value = telefoneCliente;
    document.getElementById('observacoes-cliente').value = observacoesCliente;
  
    linha.remove();
  }

  function excluirLinha(botao) {
    if (confirm('Tem certeza de que deseja excluir este cliente?')) {
      const linha = botao.parentNode.parentNode;
      linha.remove();
    }
  }
  
  function salvarNoLocalStorage(chave, idTabela) {
    const tabela = document.getElementById(idTabela);
    const dados = [];
  
    for (let i = 1; i < tabela.rows.length; i++) {
      const linha = tabela.rows[i];
      const cliente = {
        nome: linha.cells[0].innerText,
        telefone: linha.cells[1].innerText,
        observacoes: linha.cells[2].innerText,
      };
      dados.push(cliente);
    }
  
    localStorage.setItem(chave, JSON.stringify(dados));
    alert('Dados salvos no Local Storage com sucesso!');
  }
  
  function carregarDoLocalStorage(chave, idTabela) {
    const dados = JSON.parse(localStorage.getItem(chave));
    if (!dados) {
      alert('Nenhum dado encontrado no Local Storage.');
      return;
    }
  
    const tabela = document.getElementById(idTabela).getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';
  
    dados.forEach(cliente => {
      const novaLinha = tabela.insertRow();
      novaLinha.insertCell(0).innerText = cliente.nome;
      novaLinha.insertCell(1).innerText = cliente.telefone;
      novaLinha.insertCell(2).innerText = cliente.observacoes;
  
      const novaCelula = novaLinha.insertCell(3);
      novaCelula.innerHTML = `
        <button class="btn btn-warning btn-sm me-2" onclick="editarLinha(this)">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirLinha(this)">Excluir</button>
      `;
    });
  }
  