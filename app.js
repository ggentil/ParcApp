function calcular() {
  const valor = document.getElementById('valor').value;
  const parcelas = document.getElementById('numeroParcelas').value;
  const modo = document.querySelector('input[name="modo"]:checked').value;

  if (valor && parcelas && modo) {
    calcularParcelas(valor, parcelas, modo);
  }
}


function calcularParcelas(valor, numeroParcelas, modo) {
  const parcelas = modo === 'arredondado' ?
    calcularParcelasArredondado(valor, numeroParcelas) :
    calcularParcelasDiluido(valor, numeroParcelas);

  const tbody = document.getElementById('tabela');
  tbody.innerHTML = '';
  for (const parcela of parcelas) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';
    th.innerText = parcela.parcela;
    tr.appendChild(th);

    const td = document.createElement('td');
    td.innerText = `R$ ${parcela.valor.toFixed(2)}`;
    tr.appendChild(td);

    tbody.appendChild(tr);
  }
}

function calcularParcelasArredondado(valor, numeroParcelas) {
  let parcelas = [],
    valorInteiro = Math.floor(valor);

  while (valorInteiro % numeroParcelas != 0) valorInteiro--;

  let diferenca = (valor - valorInteiro),
      parcela = valorInteiro / numeroParcelas;

  for (let index = 1; index <= numeroParcelas; index++) {
    parcelas.push({
      parcela: index,
      valor: index === 1 ? parcela + diferenca : parcela
    });
  }

  return parcelas;
}

function calcularParcelasDiluido(valor, numeroParcelas) {
  let parcelas = [],
      parcela = valor / numeroParcelas;

  for (let index = 1; index <= numeroParcelas; index++) {
    parcelas.push({
      parcela: index,
      valor: parcela
    });
  }

  return parcelas;
}
