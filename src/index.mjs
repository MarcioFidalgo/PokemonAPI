import "./styles.css";

document.getElementById("app").innerHTML = `
<div id="ativo"></div>`;

const personagemid = document.getElementById("personagemId");
const btnGo = document.getElementById("btn-go");
const content = document.getElementById("content");
const imagem = document.getElementById("img");

btnGo.addEventListener("click", () => {
  const id = personagemid.value;
  fetchApi(id);
});

btnGo.addEventListener("click", () => {
  const value = personagemid.value.toLowerCase();
  fetchApi(value);
});

const fetchApi = (value) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Pokémon não encontrado");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      content.innerHTML = `<div id="container2"> <h2> Nome: ${data.name}</h2><h2> Tipo: ${data.types
        .map((type) => type.type.name)
        .join(", ")} </br> Altura: ${data.height}m </br> Peso: ${data.weight}kg </h2> </div>`;
      imagem.src = data.sprites.front_default;
    })
    .catch((error) => {
      content.innerHTML = `<h2>${error.message}</h2>`;
    });

  // content.innerHTML = `<h2> Nome: ${data.name}</h2><h3> Tipo: ${data.types[0].type.name}</h3> `;
  // imagem.src = data.sprites.front_default;
};
