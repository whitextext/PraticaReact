import React, { useState } from 'react';

import '@/styles/_main.scss';

/**
 * Define os tipos de unidades permitidas no sistema.
 * Usar Union Types evita erros de digitação (ex: 'celcius').
 */
type Unit = 'celsius' | 'fahrenheit' | 'kelvin';

export default function App() {
    // ESTADO
    // <number | null>: Permite que o campo comece vazio (null) em vez de zero.
    const [valor, setValor] = useState<number | null>(0);
    
    // <Unit>: Garante que apenas as strings do tipo Unit sejam aceitas.
    const [de, setDe] = useState<Unit>('celsius');
    const [para, setPara] = useState<Unit>('kelvin'); // Mudei padrão para fahrenheit para fazer sentido a conversão inicial
    
    const [resultado, setResultado] = useState<number | null>(null);

    /**
     * Função responsável por orquestrar a conversão quando o formulário é enviado.
     * @param e - Evento do formulário (React.FormEvent)
     */
    const converter = (e: React.FormEvent) => {
        // Previne o comportamento padrão do HTML de recarregar a página
        e.preventDefault();
        
        // Se não houver valor, interrompe a função
        if (valor === null) return;

        // 1. PASSO INTERMEDIÁRIO: Normalização
        // Convertemos qualquer entrada para Celsius primeiro.
        // Isso simplifica a lógica, evitando ter que criar fórmulas de "todos para todos".
        let tempEmCelsius: number = 0;

        switch (de) {
            case 'celsius':
                tempEmCelsius = valor;
                break;
            case 'fahrenheit':
                tempEmCelsius = (valor - 32) * (5 / 9);
                break;
            case 'kelvin':
                tempEmCelsius = valor - 273.15;
                break;
        }

        // 2. PASSO FINAL: Conversão para Destino
        // Pegamos a temperatura em Celsius e transformamos na unidade desejada.
        let resultadoFinal: number = 0;

        switch (para) {
            case 'celsius':
                resultadoFinal = tempEmCelsius;
                break;
            case 'fahrenheit':
                resultadoFinal = (tempEmCelsius * (9 / 5)) + 32;
                break;
            case 'kelvin':
                resultadoFinal = tempEmCelsius + 273.15;
                break;
        }

        setResultado(resultadoFinal);
    };

    
    return (
        <main>
            <div className="container">
                <div className="header">
                    <h1>Conversor de Temperatura</h1>
                </div>
                
                <form onSubmit={converter}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="valor">Digite a temperatura:</label>
                        <input 
                            type="number" 
                            name="valor" 
                            id="valor" 
                            placeholder="Ex: 25"
                            // O operador ?? garante que se for null, renderiza string vazia
                            value={valor ?? ''}
                            // valueAsNumber já converte string para número automaticamente
                            onChange={(e) => {
                                const val = e.target.valueAsNumber;
                                // isNaN verifica se o campo foi limpo ou tem valor inválido
                                setValor(isNaN(val) ? null : val);
                            }}
                        />
                    </div>
                    
                    
                    <div><label htmlFor="de">De:</label>
                    <select 
                        name="de" 
                        id="de" 
                        value={de} 
                        // "as Unit" diz ao TS: "confie em mim, o valor do select é um dos tipos Unit"
                        onChange={(e) => setDe(e.target.value as Unit)}
                    >
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                    </div>
                    <div>
                    <label htmlFor="para">Para:</label>
                    <select 
                        name="para" 
                        id="para" 
                        value={para} 
                        onChange={(e) => setPara(e.target.value as Unit)}
                    >
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                    </div>
                    </div>
                    
                    <button type="submit">
                        Converter
                    </button>
                </form>

                {/* Renderização Condicional: Só exibe se resultado não for null */}
                {resultado !== null && (
                    <div>
                        <h2>Resultado</h2>
                        <p>
                             {resultado.toFixed(2)} 
                            {para === 'celsius' ? '°C' : para === 'fahrenheit' ? '°F' : 'K'}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}