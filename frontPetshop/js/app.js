const tabelaAnimais = document.getElementById("tabela-animais-cadastrados");
let animais = [];

// função para carregar os animais cadastrados na tabela
async function carregarAnimais() {
  const response = await fetch("http://localhost:8080/api/animais");
  animais = await response.json();
  animais.forEach(adicionarAnimalNaTabela);
}
carregarAnimais()

async function enviarDadosDoFormulario(evento) {
  evento.preventDefault();
  const animal = {
    numeroCadastro: document.getElementById("numeroCadastro").value,
    nomeAnimal: document.getElementById("nomeAnimal").value,
    especieAnimal: document.getElementById("especieAnimal").value,
    alturaAnimal: document.getElementById("alturaAnimal").value,
    tipoPelagem: document.getElementById("tipoPelagem").value,
    pesoAnimal: document.getElementById("pesoAnimal").value,
    racaAnimal: document.getElementById("racaAnimal").value,
  };
  const response = await fetch(`http://localhost:8080/api/animais`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animal),
  });
  if (!response.ok) {
    console.error(`Erro ao cadastrar animal: ${response.statusText}`);
    return;
  }
  const novoAnimal = await response.json();
  animais.push(novoAnimal);
  adicionarAnimalNaTabela(novoAnimal);
  resetarFormulario();
}

// função para adicionar um animal na tabela
function adicionarAnimalNaTabela(animal) {
  const novaLinha = tabelaAnimais.insertRow();
  novaLinha.innerHTML = `
    <td>${animal.numeroCadastro}</td>
    <td>${animal.nomeAnimal}</td>
    <td>${animal.especieAnimal}</td>
    <td>${animal.alturaAnimal}</td>
    <td>${animal.tipoPelagem}</td>
    <td>${animal.pesoAnimal}</td>
    <td>${animal.racaAnimal}</td>
    
    <td>
      <button class="editar" data-id="${animal.id}">Editar</button>
      <button class="excluir" data-id="${animal.id}">Excluir</button>
    </td>
  `;
  novaLinha.querySelector(".editar").addEventListener("click", () => mostrarFormularioDeEdicao(animal));
  novaLinha.querySelector(".excluir").addEventListener("click", () => excluirAnimal(animal.id));
}

// função para mostrar o formulário de edição com os dados do animal selecionado
function mostrarFormularioDeEdicao(animal) {
  document.getElementById("numeroCadastro").value = animal.numeroCadastro;
  document.getElementById("nomeAnimal").value = animal.nomeAnimal;
  document.getElementById("especieAnimal").value = animal.especieAnimal;
  document.getElementById("alturaAnimal").value = animal.alturaAnimal;
  document.getElementById("tipoPelagem").value = animal.tipoPelagem;
  document.getElementById("pesoAnimal").value = animal.pesoAnimal;
  document.getElementById("racaAnimal").value = animal.racaAnimal;
  document.getElementById("animal-id").value = animal.id;

}


// função para atualizar um animal
async function atualizarAnimal(evento) {
  evento.preventDefault();
  const id = document.getElementById("animal-id").value;
  const animal = {
    numeroCadastro: document.getElementById("numeroCadastro").value,
    nomeAnimal: document.getElementById("nomeAnimal").value,
    especieAnimal: document.getElementById("especieAnimal").value,
    alturaAnimal: document.getElementById("alturaAnimal").value,
    tipoPelagem: document.getElementById("tipoPelagem").value,
    pesoAnimal: document.getElementById("pesoAnimal").value,
    racaAnimal: document.getElementById("racaAnimal").value,
  };
  const response = await fetch(`http://localhost:8080/api/animais/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(animal),
  });
  if (!response.ok) {
    console.error(`Erro ao atualizar animal: ${response.statusText}`);
    return;
  }
  const indiceDoAnimal = animais.findIndex((a) => a.id === id);
  animais[indiceDoAnimal] = animal;
  atualizarTabela();
  resetarFormulario();
}

// função para excluir um animal
async function excluirAnimal(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/animais/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove a linha da tabela que corresponde ao animal excluído
      const tabelaAnimais = document.getElementById('tabela-animais-cadastrados');
      const linha = document.querySelector(`#tabela-animais-cadastrados tr[data-id="${id}"]`);
      tabelaAnimais.removeChild(linha);
    } else {
      throw new Error('Não foi possível excluir o animal');
    }

  
  } catch (error) {
    console.error(error);
  }
  atualizarTabela();
}

async function atualizarTabela() {
  tabelaAnimais.innerHTML= `
  <tr>
  <th>Número de cadastro</th>
  <th>Nome</th>
  <th>Espécie</th>
  <th>Altura</th>
  <th>Tipo de Pelagem</th>
  <th>Peso do animal</th>
  <th>Raça do animal</th>
  <th>Ações</th>
  </tr>
  `;
  await carregarAnimais();
}

// Função para preencher o formulário de edição com os dados do animal
function preencherFormularioEdicao(animal) {
const formEdicao = document.getElementById('form-edicao');
formEdicao.elements.id.value = animal.id;
formEdicao.elements.numeroCadastro.value = animal.numeroCadastro;
formEdicao.elements.nomeAnimal.value = animal.nomeAnimal;
formEdicao.elements.especieAnimal.value = animal.especieAnimal;
formEdicao.elements.alturaAnimal.value = animal.alturaAnimal;
formEdicao.elements.tipoPelagem.value = animal.tipoPelagem;
formEdicao.elements.pesoAnimal.value = animal.pesoAnimal;
formEdicao.elements.racaAnimal.value = animal.racaAnimal;
}

// Função para exibir o formulário de edição e preencher com os dados do animal selecionado
function editarAnimal(id) {
fetch(`http://localhost:8080/api/animais/${id}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Não foi possível carregar os dados do animal');
    }
  })
  .then(animal => {
    // Exibe o formulário de edição e preenche com os dados do animal selecionado
    const formEdicao = document.getElementById('form-edicao');
    formEdicao.classList.remove('escondido');
    preencherFormularioEdicao(animal);
  })
  .catch(error => {
    console.error(error);
  });
}

// Função para atualizar um animal
function atualizarAnimal(id, animal) {
fetch(`http://localhost:8080/api/animais/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(animal),
})
  .then(response => {
    if (response.ok) {
      // Atualiza a linha da tabela que corresponde ao animal atualizado
      const tabelaAnimais = document.getElementById('tabela-animais-cadastrados');
      const linha = document.querySelector(`#tabela-animais-cadastrados tr[data-id="${id}"]`);
      preencherLinhaTabela(linha, animal);
      // Esconde o formulário de edição
      const formEdicao = document.getElementById('form-edicao');
      formEdicao.classList.add('escondido');
    } else {
      throw new Error('Não foi possível atualizar os dados do animal');
    }
  })
  .catch(error => {
    console.error(error);
  });
  atualizarTabela();
  resetarFormulario();

}

// Adiciona o evento de clique no botão "Editar" de cada linha da tabela
const botoesEditar = document.querySelectorAll('.tabela-animais-cadastrados tbody button.editar');
botoesEditar.forEach((botaoEditar) => {
botaoEditar.addEventListener('click', () => {
//Obtém o ID do animal a ser editado
const idAnimal = botaoEditar.dataset.id;
fetch(`http://localhost:8080/api/animais/${idAnimal}`)
  .then((response) => response.json())
  .then((animal) => {
    //Preenche o formulário de edição com as informações do animal
    numeroCadastroInput.value = animal.numeroCadastro;
    nomeAnimalInput.value = animal.nome;
    especieAnimalInput.value = animal.especie;
    alturaAnimalInput.value = animal.altura;
    tipoPelagemInput.value = animal.pelagem;
    pesoAnimalInput.value = animal.peso;
    racaAnimalInput.value = animal.raca;
    
    //Atualiza a variável de estado "animalAtual" com as informações do animal a ser editado
    animalAtual = {
      id: idAnimal,
      numeroCadastro: animal.numeroCadastro,
      nome: animal.nome,
      especie: animal.especie,
      altura: animal.altura,
      pelagem: animal.pelagem,
      peso: animal.peso,
      raca: animal.raca
    };
    
    //Altera o botão "Cadastrar" para "Salvar"
    botaoCadastrar.innerHTML = 'Salvar';
  })
  .catch((error) => {
    console.error(`Erro ao obter informações do animal ${idAnimal}: ${error}`);
  });

});

});

const form = document.getElementById("tabela-animais");
const table = document.getElementById("tabela-animais-cadastrados");

function createTableRow(animal) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${animal.numeroCadastro}</td>
    <td>${animal.nomeAnimal}</td>
    <td>${animal.especieAnimal}</td>
    <td>${animal.alturaAnimal}</td>
    <td>${animal.tipoPelagem}</td>
    <td>${animal.pesoAnimal}</td>
    <td>${animal.racaAnimal}</td>
    <td>
      <button class="delete-button" data-id="${animal.id}">Deletar</button>
    </td>
  `;
  return row;
}

function clearForm() {
  form.reset();
}

async function refreshTable() {
  try {
    const response = await fetch("http://localhost:8080/api/animais");
    const animais = await response.json();

    table.innerHTML = "";
   const animal = animais.data;
   const row = createTableRow(animal);
   table.appendChild(row);
    
  } catch (error) {
    console.error(error);
  }


async function deleteAnimal(id) {
  try {
    await fetch(`http://localhost:8080/api/animais/${id}`, { method: "DELETE" });
    await refreshTable();
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const animal = {
    numeroCadastro: formData.get("numeroCadastro"),
    nomeAnimal: formData.get("nomeAnimal"),
    especieAnimal: formData.get("especieAnimal"),
    alturaAnimal: formData.get("alturaAnimal"),
    tipoPelagem: formData.get("tipoPelagem"),
    pesoAnimal: formData.get("pesoAnimal"),
    racaAnimal: formData.get("racaAnimal"),
  };

  try {
    const response = await fetch("http://localhost:8080/api/animais", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal),
    });

    const newAnimal = await response.json();
    const newRow = createTableRow(newAnimal);
    table.appendChild(newRow);
    clearForm();
  } catch (error) {
    console.error(error);
  }
});

table.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-button")) {
    const id = event.target.dataset.id;
    await deleteAnimal(id);
  }
});

(async function () {
  await refreshTable();
})();
}