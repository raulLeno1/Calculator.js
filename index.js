const main = document.querySelector('main');
//pegando o root no css
const root = document.querySelector(':root');
const input = document.getElementById('input');
const resultInput = document.getElementById('result');

//criando um array para pegar os caracteres que serão permitidos
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

//criando a função para o click dos botões
//utilizarei o forEach para fazer a função e pegarei os botões pela class
document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
  charKeyBtn.addEventListener('click', function(){
    //dataset é para pegar o valor data que esta no html
    const value = charKeyBtn.dataset.value;
    input.value += value;
  })
})

//criando a função clear
document.getElementById('clear').addEventListener('click', function(){
  input.value = '';
  input.focus();
})


//criando um evento para fazer as verificação das teclas apertadas 
input.addEventListener('keydown', (ev)=>{
  //prevenir o evento normal para dps fazer a verificação
  ev.preventDefault();
  //se a tecla apertada tiver dentro do array irei concatenar com meu input
  if(allowedKeys.includes(ev.key)){
    input.value += ev.key;
    return
  }
  //como não tem uma tecla para apagar dentro do array, irei fazer a verificação manualmente
  if(ev.key === 'Backspace'){
    input.value = input.value.slice(0,-1)
  }
  //criando uma verificação para o enter só para fazer o calculo
  if(ev.key === 'Enter'){
    calculate();
  }
})

//função para calcular
//quando clicar no icone de igual, ele chamará a função calculate
document.getElementById('equal').addEventListener('click', calculate);
function calculate(){
  //prevenção de erro
  resultInput.value = 'ERROR';
  resultInput.classList.add('error')
  //eval serve para avaliar o codigo e executar
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove('error')
}

//mudando o tema
document.getElementById('themeSwitcher').addEventListener('click', ()=>{
  if(main.dataset.theme === 'dark'){
    root.style.setProperty('--bg-color', '#f1f5f9');
    root.style.setProperty('--border-color','#aaa');
    root.style.setProperty('--font-color', '#212529');
    root.style.setProperty('--primary-color', '#26834a');
    main.dataset.theme = 'light'
  }else{
    root.style.setProperty('--bg-color', '#212529');
    root.style.setProperty('--border-color','#666');
    root.style.setProperty('--font-color', '#f1f5f9');
    root.style.setProperty('--primary-color', '#4dff91');
    main.dataset.theme = 'dark';
  }
})


//criando função para copiar para area de transferencia
document.getElementById('copyToClipboard').addEventListener('click', (ev)=>{
  const button = ev.currentTarget;
  if(button.innerText === 'Copy'){
    button.innerText = 'Copied';
    button.classList.add('success');
    //navigator é para usar a função de copiar
    navigator.clipboard.writeText(resultInput.value);
  }else{
    button.innerText = 'Copy';
    button.classList.remove('success')    
  }
})