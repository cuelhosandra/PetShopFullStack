// fetch(`http://localhost:8080/api/animais`)
//     .then(response => response.json())
//     .then(data => {
//         let tabela = document.getElementById('tabela-animais');
//         for (let animal of data) {
//             let linha = tabela.insertRow();
//             let colunaNome = linha.insertCell();
//             colunaNome.innerText = animal.nomeAnimal;
//             let colunaEspecie = linha.insertCell();
//             colunaEspecie.innerText = animal.especieAnimal;
//             // outras colunas
//         }
//     });

// const form = document.getElementById('form-animal');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);

//     fetch(`http://localhost:8080/api/animais/salvar`, {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Animal adicionado');
//         } else {
//             console.log('Erro');
//         }
//     })
// })

// const form = document.getElementById('form-animal');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const animal = {};
//     formData.forEach((value, key) => animal[key] = value);

//     fetch(`http://localhost:8080/api/animais`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(animal)
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Animal adicionado');
//         } else {
//             console.log('Erro');
//         }
//     })
// })

const form = document.getElementById('form-animal');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const animal = {};
    formData.forEach((value, key) => animal[key] = value);
    console.log('Dados do formulário:', animal);

    const json = JSON.stringify(animal);
    console.log('Objeto JSON:', json);

    fetch(`http://localhost:8080/api/animais`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(response => {
        if (response.ok) {
            console.log('Animal adicionado');
        } else {
            console.log('Erro:', response.status, response.statusText);
        }
    })
    .catch(error => {
        console.log('Erro:', error);
    });
});