function calcularSaida() {
    const entrada = document.getElementById("entrada").value;
    const cargaMensal = parseFloat(document.getElementById("cargaMensal").value);
    const intervalo = document.getElementById("intervalo").value;

    if (!entrada || !cargaMensal || !intervalo) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Converter horário de entrada para minutos
    let [hEntrada, mEntrada] = entrada.split(":").map(Number);
    let entradaMin = hEntrada * 60 + mEntrada;

    // Intervalo
    let [hInt, mInt] = intervalo.split(":").map(Number);
    let intervaloMin = hInt * 60 + mInt;

    // Dias trabalhados
    const diasMarcados = document.querySelectorAll("input[type=checkbox]:checked").length;
    if (diasMarcados === 0) {
        alert("Selecione os dias trabalhados.");
        return;
    }

    // Carga diária (minutos)
    const cargaDiaria = (cargaMensal * 60) / (diasMarcados * 4.33);
    document.getElementById("cargaDiaria").innerText = Math.round(cargaDiaria) + " min";

    // Hora noturna reduzida — 52m30s
    const minutoNoturno = 52.5;

    let minutosTrabalhados = cargaDiaria;

    // Cálculo da saída
    let saidaMin = entradaMin + intervaloMin + minutosTrabalhados;

    // Converter para HH:MM
    let hSaida = Math.floor(saidaMin / 60);
    let mSaida = Math.round(saidaMin % 60);

    if (hSaida >= 24) hSaida -= 24;

    document.getElementById("resultado").innerText =
        Horário de saída: ${String(hSaida).padStart(2, '0')}:${String(mSaida).padStart(2, '0')};
}
