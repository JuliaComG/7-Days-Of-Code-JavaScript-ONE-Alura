document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        "Você deseja seguir a área de Front-end ou Back-end?",
        "Você deseja se tornar um especialista na sua área? Ou se tornar um FullStack?",
        "E quais tecnologias você deseja aprender? (Digite uma por vez)",
    ];

    let currentQuestionIndex = 0;
    const questionContainer = document.getElementById('questionContainer');
    const userInput = document.getElementById('userInput');
    const inputLabel = document.getElementById('inputLabel');
    const form = document.getElementById('questionForm');
    const backButton = document.getElementById('back-button');
    const answers = [];
    let areaChoice = '';
    let technologies = [];

    showNextQuestion();

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionContainer.textContent = questions[currentQuestionIndex];
            userInput.value = '';
            inputLabel.classList.add('active');

            if (currentQuestionIndex === 0) {
                injectButtonsForFirstQuestion();
                userInput.style.display = 'none';
                inputLabel.style.display = 'none';
            } else if (currentQuestionIndex === 1) {
                injectLanguageOrFrameworkButtons(areaChoice);
                userInput.style.display = 'none';
                inputLabel.style.display = 'none';
            } else if (currentQuestionIndex === 2) {
                removeButtonsForFirstQuestion();
                userInput.style.display = 'block';
                inputLabel.style.display = 'block';
                inputLabel.classList.add('active');
                injectAddButton();
            } else {
                removeButtonsForFirstQuestion();
                userInput.style.display = 'block';
                inputLabel.style.display = 'block';
                inputLabel.classList.add('active');
            }

        } else {
            questionContainer.textContent = `Você escolheu seguir na área de ${areaChoice}, deseja se especializar em ${answers[1]}, e deseja aprender as seguintes tecnologias: ${technologies.join(', ')}.`;
            userInput.style.display = 'none';
            form.querySelector('button').style.display = 'none';
            inputLabel.setAttribute('hidden', 'true');
            backButton.removeAttribute('hidden');
        }
    }

    function injectButtonsForFirstQuestion() {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'center-align';

        const frontEndBtn = document.createElement('button');
        frontEndBtn.textContent = 'Front-end';
        frontEndBtn.className = 'btn waves-effect waves-light teal';
        frontEndBtn.type = 'button';
        frontEndBtn.addEventListener('click', function () {
            userInput.value = 'Front-end';
            form.dispatchEvent(new Event('submit'));
        });

        const backEndBtn = document.createElement('button');
        backEndBtn.textContent = 'Back-end';
        backEndBtn.className = 'btn waves-effect waves-light teal';
        backEndBtn.type = 'button';
        backEndBtn.addEventListener('click', function () {
            userInput.value = 'Back-end';
            form.dispatchEvent(new Event('submit'));
        });

        buttonsDiv.appendChild(frontEndBtn);
        buttonsDiv.appendChild(backEndBtn);
        questionContainer.appendChild(buttonsDiv);
    }

    function injectLanguageOrFrameworkButtons(area) {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'center-align';

        if (area === 'Front-end') {
            const reactBtn = document.createElement('button');
            reactBtn.textContent = 'React';
            reactBtn.className = 'btn waves-effect waves-light teal';
            reactBtn.type = 'button';
            reactBtn.addEventListener('click', function () {
                userInput.value = 'React';
                form.dispatchEvent(new Event('submit'));
            });

            const vueBtn = document.createElement('button');
            vueBtn.textContent = 'Vue';
            vueBtn.className = 'btn waves-effect waves-light teal';
            vueBtn.type = 'button';
            vueBtn.addEventListener('click', function () {
                userInput.value = 'Vue';
                form.dispatchEvent(new Event('submit'));
            });

            buttonsDiv.appendChild(reactBtn);
            buttonsDiv.appendChild(vueBtn);
        } else if (area === 'Back-end') {
            const csharpBtn = document.createElement('button');
            csharpBtn.textContent = 'C#';
            csharpBtn.className = 'btn waves-effect waves-light teal';
            csharpBtn.type = 'button';
            csharpBtn.addEventListener('click', function () {
                userInput.value = 'C#';
                form.dispatchEvent(new Event('submit'));
            });

            const javaBtn = document.createElement('button');
            javaBtn.textContent = 'Java';
            javaBtn.className = 'btn waves-effect waves-light teal';
            javaBtn.type = 'button';
            javaBtn.addEventListener('click', function () {
                userInput.value = 'Java';
                form.dispatchEvent(new Event('submit'));
            });

            buttonsDiv.appendChild(csharpBtn);
            buttonsDiv.appendChild(javaBtn);
        }

        questionContainer.appendChild(buttonsDiv);
    }

    function removeButtonsForFirstQuestion() {
        const buttonsDiv = questionContainer.querySelector('div.center-align');
        if (buttonsDiv) {
            questionContainer.removeChild(buttonsDiv);
        }
    }

    function injectAddButton() {
        const addButton = document.createElement('button');
        addButton.textContent = 'Adicionar';
        addButton.className = 'btn waves-effect waves-light teal';
        addButton.type = 'button';
        addButton.addEventListener('click', function () {
            const answer = userInput.value.trim();
            if (!answer) {
                M.toast({ html: 'O campo não pode estar vazio.', classes: 'red' });
                return;
            }
            technologies.push(answer);
            userInput.value = '';
            M.toast({ html: `Tecnologia "${answer}" adicionada.`, classes: 'green' });
            updateNextButtonState();
        });

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'center-align';
        buttonsDiv.appendChild(addButton);
        questionContainer.appendChild(buttonsDiv);
    }

    function updateNextButtonState() {
        const nextButton = form.querySelector('button[type="submit"]');
        if (technologies.length > 0) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
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

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const answer = userInput.value.trim();

        if (currentQuestionIndex === 0) {
            if (answer.toLowerCase() !== 'front-end' && answer.toLowerCase() !== 'back-end') {
                M.toast({ html: 'Por favor, digite "Front-end" ou "Back-end".', classes: 'red' });
                return;
            }
            areaChoice = answer;
            answers.push(answer);
            currentQuestionIndex++;
            showNextQuestion();

        } else if (currentQuestionIndex === 1) {
            if (areaChoice === 'Front-end' && answer.toLowerCase() !== 'react' && answer.toLowerCase() !== 'vue') {
                M.toast({ html: 'Por favor, escolha "React" ou "Vue".', classes: 'red' });
                return;
            } else if (areaChoice === 'Back-end' && answer.toLowerCase() !== 'c#' && answer.toLowerCase() !== 'java') {
                M.toast({ html: 'Por favor, escolha "C#" ou "Java".', classes: 'red' });
                return;
            }
            answers.push(answer);
            currentQuestionIndex++;
            showNextQuestion();

        } else if (currentQuestionIndex === 2) {
            
            answers.push(answer);
            currentQuestionIndex++;
            showNextQuestion();

        } else if (currentQuestionIndex === 3) {
            if (technologies.length === 0) {
                M.toast({ html: 'Por favor, adicione pelo menos uma tecnologia.', classes: 'red' });
                return;
            }
            currentQuestionIndex++;
            showNextQuestion();
        }
    });
});