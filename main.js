import ehUmCpf from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const formulario = document.querySelector(".containerFormulario");
const campoFormularioRequired = document.querySelectorAll("[required]");

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

const mensagens = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não é válido.",
    tooShort: "O campo de CPF não tem caracteres suficientes.",
  },
  idade: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior de idade.",
  },
  termos: {
    valueMissing: "Aceite dos termos é obrigatório!",
  },
};

campoFormularioRequired.forEach((campo) => {
  campo.addEventListener("blur", () => verificaCampo(campo));
  // Impede que a mensagem de erro padrão do navegador apareça
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificaCampo(campo) {
  let mensagem = "";
  campo.setCustomValidity("");

  if (campo.name == "cpf" && campo.value.length >= 11) {
    ehUmCpf(campo);
  }
  if (campo.name == "idade" && campo.value != "") {
    ehMaiorDeIdade(campo);
  }

  tiposDeErro.forEach((erro) => {
    if (campo.validity[erro]) {
      mensagem = mensagens[campo.name][erro];
    }
  });

  // Este campo exibe a mensagem de erro!
  const mensagemErroElemento = campo.parentNode.querySelector(".mensagem-erro");
  const validadorDeInput = campo.checkValidity();

  if (!validadorDeInput) {
    mensagemErroElemento.textContent = mensagem;
  } else {
    mensagemErroElemento.textContent = "";
  }
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const listaRespostas = {
    nome: event.target.elements["nome"].value,
    email: event.target.elements["email"].value,
    idade: event.target.elements["idade"].value,
    cpf: event.target.elements["cpf"].value,
    termos: event.target.elements["termos"].checked,
  };

  localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
  window.location.href = "./index.html";

  botaoLimpar.addEventListener("click", () => {
    formulario.reset();
  });
});
