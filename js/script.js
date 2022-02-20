const wrapper = document.querySelector(".wrapper"),
  input = wrapper.querySelector("input"),
  clear = wrapper.querySelector("#clear"),
  synonyms = wrapper.querySelector(".synonyms .list"),
  infoText = wrapper.querySelector(".info-text"),
  volumeAudio = wrapper.querySelector(".word i");

synonyms.innerHTML = "";
let audio;
function data(result, word) {
  if (result.title) {
    infoText.style.color = "#979494";
    infoText.innerHTML = `<i class='bx bxs-x-circle' ></i> No hemos encontrado <span>"${word}"</span>. Por favor intente nuevamente `;
  } else {
    wrapper.classList.add("active");

    console.log(result);
    let definiciones = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech}/${result[0].phonetics[0].text}/`;
    //pintamos la informacion
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".maening span").innerText = definiciones.definition;
    document.querySelector(".example span").innerText = definiciones.example;
    audio = new Audio(`https:${result[0].phonetics[0].audio}`);

    for (let i = 0; i < 5; i++) {
      if (definiciones.synonyms[i]) {
        let tag = `<span onclick=search('${definiciones.synonyms[i]}')>${definiciones.synonyms[i]},</span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      } else {
        tag = `<span>No synonyms</span>`;
        synonyms.innerHTML = tag;
      }
    }
  }
}
//buscar sinonimos
function search(word) {
  input.value = word;
  fetchApi(word);
}
//buscar palabra
function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerHTML = `<i class='bx bx-loader-alt bx-spin' ></i> Buscando palabra <span>"${word}"</span>`;
  let URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(URL)
    .then((res) => res.json())
    .then((result) => data(result, word));
}
//captura el evento del teclado
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
    synonyms.innerHTML = "";
  }
});
//async await
//borra la palabra de la caja de texto
clear.addEventListener("click", () => {
  if (input.value != "") {
    input.value = "";
    infoText.style.color = "#979494";
    infoText.innerHTML = `Ingresa una palabra y presiona <span>Enter</span> para obtener su significado`;
    wrapper.classList.remove("active");
  }
});
volumeAudio.addEventListener("click", () => {
  volumeAudio.classList.add("clicked");
  time = setTimeout(() => {
    volumeAudio.classList.remove("clicked");
  }, 1000);
  audio.play();
});
