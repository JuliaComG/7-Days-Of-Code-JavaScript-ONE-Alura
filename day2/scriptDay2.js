document.addEventListener('DOMContentLoaded', function () {
    
    const questions = [
        "Qual o seu nome?",
        "Quantos anos você tem?",
        "Qual linguagem de programação você está estudando?"
    ];

    let currentQuestionIndex = 0;
    const questionContainer = document.getElementById('questionContainer');
    const userInput = document.getElementById('userInput');
    const inputLabel = document.getElementById('inputLabel');
    const form = document.getElementById('questionForm');
    const backButton = document.getElementById('back-button');
    const answers = [];

    showNextQuestion();

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionContainer.textContent = questions[currentQuestionIndex];
            userInput.value = '';
            inputLabel.classList.add('active');

        } else if (currentQuestionIndex === questions.length) {
            const [name, age, language] = answers;
            questionContainer.textContent = `Olá ${name}, você tem ${age} anos e já está aprendendo ${language}! Você está gostando de aprender ${language}?`;
            userInput.value = '';
            inputLabel.textContent = "Digite 1 para Sim ou 2 para Não";
            inputLabel.classList.add('active');

        } else {
            const finalAnswer = answers[answers.length - 1];
           
            if (!finalAnswer) {
                M.toast({ html: 'O campo não pode estar vazio.', classes: 'red' });
                return;
            } 
            

            if (finalAnswer === '1') {
                questionContainer.textContent = "Muito bom! Continue estudando e você terá muito sucesso.";
            } else if (finalAnswer === '2') {
                questionContainer.textContent = "Ahh que pena... Já tentou aprender outras linguagens?";
            }

            userInput.style.display = 'none';
            form.querySelector('button').style.display = 'none';
            inputLabel.setAttribute('hidden', 'true');
            backButton.removeAttribute('hidden');
        }
    }
    
    function normalizeInput(name) {
        name = name.toLowerCase().trim();
        return capitalizeFirstLetterOfEachWord(name);
    }

    function capitalizeFirstLetterOfEachWord(name) {
        return name.split(" ")
                   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                   .join(" ");
    }

    function isInvalidName(name) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        return !regex.test(name);
    }

    function isInvalidAge(age) {
        const regex = /^\d+$/;
        return !regex.test(age);
    }

    function isInvalidFinalAnswer(answer) {
        const regex = /^[12]$/;
        return !regex.test(answer);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const answer = userInput.value.trim();
       
        if (!answer) {
            M.toast({ html: 'O campo não pode estar vazio.', classes: 'red' });
            return;
        }
       
        if (currentQuestionIndex === 0) {
            if (isInvalidName(answer)) {
                M.toast({ html: 'O nome não pode conter caracteres especiais.', classes: 'red' }); 
                return;
            }
            const normalizedName = normalizeInput(answer);
            answers.push(normalizedName);

        } else if (currentQuestionIndex === 1) {
            if (isInvalidAge(answer)) {
                M.toast({ html: 'A idade deve conter apenas números.', classes: 'red' });
                return;
            }
            answers.push(answer);

        } else if (currentQuestionIndex === questions.length) {
            if (isInvalidFinalAnswer(answer)) {
                M.toast({ html: 'Digite apenas 1 para Sim ou 2 para Não.', classes: 'red' });
                return;
            }
            answers.push(answer);

        } else {
            answers.push(answer);
        }

        console.log(`Resposta para "${questions[currentQuestionIndex]}": ${answer}`);
        currentQuestionIndex++;
        showNextQuestion();
        
    });
});