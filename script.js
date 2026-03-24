
const quizData = [
    {
        question: "QUESTÃO 1: Uma pessoa realizou uma prova num concurso que continha três questões. A pontuação era: Questão 1 (-6), Questão 2 (+3), Questão 3 (+2). A nota final desse concurso é a soma das notas em cada questão. Qual foi a nota final dessa pessoa?",
        image: "",
        options: ["-11", "-1", "0", "1", "11"],
        correct: 1 // (B) -1
    },
    {
        question: "QUESTÃO 3: Um cientista está a estudar dois elementos químicos. A massa do primeiro elemento é 1,25 · 10⁻¹⁰ gramas. A massa do segundo elemento é 16 vezes maior que o primeiro. Qual é a massa do segundo elemento químico, em gramas, escrita em notação científica?",
        image: "", 
        options: ["2 · 10⁻¹¹", "20 · 10⁻¹⁰", "2 · 10⁻⁹", "2 · 10⁹", "2 · 10¹¹"],
        correct: 2 // (C) 2 · 10⁻⁹
    },
    {
        question: "QUESTÃO 6: Num teatro, as cadeiras são organizadas da seguinte forma. Se esse padrão continuar, qual a expressão algébrica que representa a quantidade de cadeiras na fileira de número n?",
        image: "cadeiras.png", 
        options: ["6n", "2n + 4", "2n + 6", "4n + 2", "4n + 4"],
        correct: 3 // (D) 4n + 2
    },
    {
        question: "QUESTÃO 9: Efetuando-se as operações indicadas na expressão (1,73 + 6/2 + 0,27 - 1), chega-se ao resultado de:",
        image: "",
        options: ["2", "3", "4", "6", "7"],
        correct: 2 // (C) 4
    },
    {
        question: "QUESTÃO 13: Os animais de uma fazenda são separados em grupos. A expressão algébrica que permite determinar a quantidade de animais em relação ao número da área cercada (n) é:",
        image: "",
        options: ["4n", "19n", "n + 3", "3n + 1", "16n + 3"],
        correct: 3 // (D) 3n + 1
    },
    {
        question: "QUESTÃO 16: Um estudante deseja comprar cursos. O segundo curso (de mesmo valor que o primeiro) sai por 1/4 do valor original. Ele tem um orçamento de até R$ 3 000,00. Qual é o valor máximo que ele pode desembolsar no primeiro curso?",
        image: "",
        options: ["R$ 600,00", "R$ 750,00", "R$ 2 400,00", "R$ 3 000,00", "R$ 3 750,00"],
        correct: 2 // (C) R$ 2 400,00
    },
    {
        question: "QUESTÃO 18: Um trabalhador recebe um salário mensal de R$ 4 500,00 e tem gastos fixos: Renda (R$ 1 500,00), Alimentação (R$ 900,00) e Transporte (R$ 400,00). Qual é a maior quantia que ele pode gastar com lazer sem ultrapassar o seu salário?",
        image: "",
        options: ["R$ 1 100,00", "R$ 1 700,00", "R$ 2 100,00", "R$ 2 600,00", "R$ 3 200,00"],
        correct: 1 // (B) R$ 1 700,00
    },
    {
        question: "QUESTÃO 21: Na geração de energia, ela é produzida em cerca de 1,3 · 10⁴ volts. Para o transporte, é elevada para até 5 · 10⁵ volts. Qual é a diferença, em volts, entre as tensões da energia elevada e a produzida?",
        image: "",
        options: ["3,7 · 10¹", "3,7 · 10⁴", "4,87 · 10²", "4,87 · 10³", "4,87 · 10⁵"],
        correct: 4 // (E) 4,87 · 10⁵
    },
    {
        question: "QUESTÃO 24: Uma espécie de planta cresce exponencialmente. A altura inicial é de 2 cm e a taxa de crescimento é descrita no gráfico (atingindo 2 · 1,5³ no período). Qual a altura da planta ao final das 3 semanas, em cm, aproximadamente?",
        image: "planta.png", // Lembre-se de guardar a imagem do PDF na mesma pasta
        options: ["3,00", "3,38", "4,50", "6,75", "9,00"],
        correct: 3 // (D) 6,75
    },
    {
        question: "QUESTÃO 8: Um fabricante de acessórios para telemóveis está a analisar os seus custos de produção em relação ao número de unidades fabricadas. Ele descobriu que o custo total de produção y, em reais, para fabricar x unidades é dado pela expressão y = 4x + 10. Qual das alternativas contém o gráfico que representa a expressão do custo?",
        image: "grafico.png", 
        options: ["Gráfico A", "Gráfico B", "Gráfico C", "Gráfico D", "Gráfico E"],
        correct: 2 // (C) Gráfico C
    }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');

function buildQuiz() {
    let output = '';

    quizData.forEach((currentQuestion, questionNumber) => {
        let optionsHTML = '';

        currentQuestion.options.forEach((option, optionIndex) => {
            optionsHTML += `
                <div class="option">
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${optionIndex}">
                        ( ${String.fromCharCode(65 + optionIndex)} ) ${option}
                    </label>
                </div>
            `;
        });

        let imageHTML = currentQuestion.image ? `<img src="${currentQuestion.image}" alt="Imagem da questão" class="question-image">` : '';

        output += `
            <div class="question-block" id="block${questionNumber}">
                <div class="question-text">${currentQuestion.question}</div>
                ${imageHTML}
                <div class="options">
                    ${optionsHTML}
                </div>
                <div class="correct-answer" id="answer${questionNumber}">
                    Resposta Correta: ( ${String.fromCharCode(65 + currentQuestion.correct)} ) ${currentQuestion.options[currentQuestion.correct]}
                </div>
            </div>
        `;
    });

    quizContainer.innerHTML = output;
}

function calculateScore() {
    let score = 0;
    
    quizData.forEach((currentQuestion, questionNumber) => {
        const selector = `input[name="question${questionNumber}"]:checked`;
        const userAnswer = (document.querySelector(selector) || {}).value;
        const answerDiv = document.getElementById(`answer${questionNumber}`);
        const blockDiv = document.getElementById(`block${questionNumber}`);

        answerDiv.style.display = 'block';

        if (userAnswer == currentQuestion.correct) {
            score++;
            blockDiv.style.borderLeft = "5px solid #27ae60"; // Verde se acertou
        } else {
            blockDiv.style.borderLeft = "5px solid #e74c3c"; // Vermelho se errou
        }
    });

    resultContainer.style.background = score >= (quizData.length / 2) ? "#d4edda" : "#f8d7da";
    resultContainer.style.color = score >= (quizData.length / 2) ? "#155724" : "#721c24";
    resultContainer.innerHTML = `Resultado: Acertou ${score} de ${quizData.length} questões!`;
    
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Inicializa o quiz
buildQuiz();