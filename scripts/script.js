document.addEventListener('DOMContentLoaded', function() {
    const daysInMonth = new Date(2024, 7, 0).getDate();
    const calendar = document.getElementById('calendar');
    const feedback = document.getElementById('feedback');
    const homeMessage = document.getElementById('home-message');

    // Load saved days status from localStorage
    const savedDaysStatus = JSON.parse(localStorage.getItem('daysStatus')) || {};

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;

        // Apply saved status if exists
        if (savedDaysStatus[day] === 'productive') {
            dayDiv.classList.add('productive');
        } else if (savedDaysStatus[day] === 'unproductive') {
            dayDiv.classList.add('unproductive');
        }

        dayDiv.addEventListener('click', () => {
            if (dayDiv.classList.contains('productive')) {
                dayDiv.classList.remove('productive');
                dayDiv.classList.add('unproductive');
                feedback.textContent = 'Seu dia foi improdutivo, para evitar crises de ansiedade e depressão, não faça atividades de prazer próprio.';
                savedDaysStatus[day] = 'unproductive';
            } else if (dayDiv.classList.contains('unproductive')) {
                dayDiv.classList.remove('unproductive');
                feedback.textContent = '';
                delete savedDaysStatus[day];
            } else {
                dayDiv.classList.add('productive');
                feedback.textContent = '';
                savedDaysStatus[day] = 'productive';
            }
            // Save updated status to localStorage
            localStorage.setItem('daysStatus', JSON.stringify(savedDaysStatus));
            updateHomeMessage();
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

    // Start with Home section active and update the home message
    setActiveSection('home-section');
    updateHomeMessage();
});
