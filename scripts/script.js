document.addEventListener('DOMContentLoaded', function() {
    const daysInMonth = new Date(2024, 7, 0).getDate();
    const calendar = document.getElementById('calendar');
    const feedback = document.getElementById('feedback');
    const homeMessage = document.getElementById('home-message');
    const scheduleDays = {
        12: document.getElementById('12'),
        13: document.getElementById('13'),
        14: document.getElementById('14'),
        15: document.getElementById('15'),
        16: document.getElementById('16'),
        17: document.getElementById('17'),
        18: document.getElementById('18'),
        19: document.getElementById('19'),
        20: document.getElementById('20'),
        21: document.getElementById('21'),
        22: document.getElementById('22'),
        23: document.getElementById('23'),
        24: document.getElementById('24'),
        25: document.getElementById('25'),
        26: document.getElementById('26'),
        27: document.getElementById('27'),
        28: document.getElementById('28'),
        29: document.getElementById('29'),
        30: document.getElementById('30'),
        31: document.getElementById('31')
    };

    // Carrega o status dos dias salvos no localStorage
    const savedDaysStatus = JSON.parse(localStorage.getItem('daysStatus')) || {};

    // Aplica o status salvo aos dias do cronograma na seção Home
    Object.keys(scheduleDays).forEach(day => {
        if (savedDaysStatus[day] === 'productive') {
            scheduleDays[day].style.backgroundColor = 'green';
        } else if (savedDaysStatus[day] === 'unproductive') {
            scheduleDays[day].style.backgroundColor = 'red';
        }
    });

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;

        // Aplica o status salvo, se existir
        if (savedDaysStatus[day] === 'productive') {
            dayDiv.classList.add('productive');
        } else if (savedDaysStatus[day] === 'unproductive') {
            dayDiv.classList.add('unproductive');
        }

        dayDiv.addEventListener('click', () => {
            if (!dayDiv.classList.contains('productive') && !dayDiv.classList.contains('unproductive')) {
                if (confirm('Você quer marcar o dia como produtivo?')) {
                    dayDiv.classList.add('productive');
                    savedDaysStatus[day] = 'productive';
                    if (scheduleDays[day]) {
                        scheduleDays[day].style.backgroundColor = 'green';
                    }
                } else {
                    dayDiv.classList.add('unproductive');
                    savedDaysStatus[day] = 'unproductive';
                    feedback.textContent = 'Seu dia foi improdutivo, para evitar crises de ansiedade e depressão, não faça atividades de prazer próprio.';
                    if (scheduleDays[day]) {
                        scheduleDays[day].style.backgroundColor = 'red';
                    }
                }
                // Salva o status atualizado no localStorage
                localStorage.setItem('daysStatus', JSON.stringify(savedDaysStatus));
                updateHomeMessage();
            }
        });
        calendar.appendChild(dayDiv);
    }

    function updateHomeMessage() {
        const unproductiveDays = document.querySelectorAll('.unproductive').length;
        if (unproductiveDays > 0) {
            homeMessage.textContent = 'Você tem pendências a resolver devido a dias improdutivos.';
        } else {
            homeMessage.textContent = 'Nenhuma pendência ou punição em atividade';
        }
    }

    document.getElementById('home-link').addEventListener('click', function() {
        setActiveSection('home-section');
    });

    document.getElementById('calendar-link').addEventListener('click', function() {
        setActiveSection('calendar-section');
    });

    document.getElementById('settings-link').addEventListener('click', function() {
        setActiveSection('settings-section');
    });

    document.getElementById('save-settings').addEventListener('click', function() {
        const dailyGoal = document.getElementById('daily-goal').value;
        alert('Meta diária de estudo salva: ' + dailyGoal + ' horas');
    });

    function setActiveSection(sectionId) {
        document.querySelectorAll('main section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Inicia com a seção Home ativa e atualiza a mensagem na home
    setActiveSection('home-section');
    updateHomeMessage();

    // Marcação automática de dias passados como improdutivos se não foram marcados
    const currentDate = new Date().getDate();
    Object.keys(scheduleDays).forEach(day => {
        if (parseInt(day) < currentDate && !savedDaysStatus[day]) {
            savedDaysStatus[day] = 'unproductive';
            scheduleDays[day].style.backgroundColor = 'red';
            localStorage.setItem('daysStatus', JSON.stringify(savedDaysStatus));
        }
    });
});
