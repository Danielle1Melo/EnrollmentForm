import './style.css';

const container = document.getElementById('datas')
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

async function loadData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        const enrolled = await response.json();

        if(Array.isArray(enrolled)) {
            enrolled.forEach((person) => {
                function description() {
                    if(person.description === ""){
                        return "Nenhuma descrição fornecida"
                    } else {
                        return person.description
                    }
                }

                const div = document.createElement('div');
                div.className = 'data';
                div.innerHTML = `
                    <div>
                        <div>Nome: <span>${person.name}</span></div>
                        <div>E-mail: <span>${person.email}</span></div>
                        <div>Sexo: <span>${person.gender}</span></div>
                        <div>Curso: <span>${person.course}</span></div>
                        <div>Descrição: <span>${description()}</span></div>
                    </div>
                `;
                
                container?.appendChild(div);
            })
        }
    }catch (error){
        console.log('Erro ao carregar dados:', error)
    }
};

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = 'light_mode';
        localStorage.setItem('theme', 'dark-mode');
    }
}

themeIcon?.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(savedTheme);
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark-mode' ? 'light_mode' : 'dark_mode';
    }
});

const btnVoltar = document.getElementById('btnVoltar') as HTMLButtonElement || null;

btnVoltar?.addEventListener('click', () => {
    window.location.href = 'index.html'
});



loadData()