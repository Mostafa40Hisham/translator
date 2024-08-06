const inputText = document.querySelector("#inputText");
const resultText = document.querySelector("#resultText");
const languageSelect1 = document.querySelector("#languageSelect1");
const languageSelect2 = document.querySelector("#languageSelect2");
const translateButton = document.querySelector("#translateButton");

let languages = {};

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    languages = data;
    const languageOptions = Object.values(data).map(lang => `<option>${lang}</option>`);
    languageSelect1.innerHTML = languageOptions;
    languageSelect2.innerHTML = languageOptions;
  });

const translator = () => {
  const input = inputText.value.trim();

  if (!input) {
    resultText.textContent = "You must enter text to translate";
    return;
  }

  const selectedLanguage1 = languageSelect1.value;
  const selectedLanguage2 = languageSelect2.value;

  const selectedKey1 = Object.keys(languages).find(key => languages[key] === selectedLanguage1);
  const selectedKey2 = Object.keys(languages).find(key => languages[key] === selectedLanguage2);

  fetch(`https://api.mymemory.translated.net/get?q=${input}&langpair=${selectedKey1}|${selectedKey2}`)
    .then(res => res.json())
    .then(data => {
      resultText.innerHTML = data.responseData.translatedText;
    })
    .catch(() => {
      resultText.textContent = "Failed to translate text";
    });
};

translateButton.addEventListener("click", translator);
