import './style.css';
import { EnrollmentSchema } from './validators/form.Schema';
import { z } from 'zod';

// Elementos do formulário
const form = document.querySelector<HTMLFormElement>('#form')!;
const name = document.querySelector<HTMLInputElement>('#name')!;
const email = document.querySelector<HTMLInputElement>('#email')!;
const maleGender = document.querySelector<HTMLInputElement>('#male')!;
const femaleGender = document.querySelector<HTMLInputElement>('#female')!;
const course = document.querySelector<HTMLSelectElement>('#course')!;
const description = document.querySelector<HTMLTextAreaElement>('#description')!;
const terms = document.querySelector<HTMLInputElement>('#terms')!;

const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function limparFormulario() {
    form.reset();
}

function getGenderSelected(): string {
    if (maleGender.checked) return 'male';
    if (femaleGender.checked) return 'female';
    return '';
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const parsedData = EnrollmentSchema.parse({
            name: name.value,
            email: email.value,
            gender: getGenderSelected(),
            course: course.value,
            description: description.value,
            terms: terms.checked
        });

        await fetch('http://localhost:3000/data', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(parsedData),
        });

        alert('Inscrição realizada com sucesso!');
        limparFormulario();

    } catch (err) {
        if(err instanceof z.ZodError) {
            const messages = err.errors.map(e=>e.message).join("\n");
            alert(messages);
        }else{
            alert('Preencha todos os campos obrigatórios.');
        }
        
    }
});

const btnInscrios = document.getElementById('btnInscrios') as HTMLButtonElement || null;

if(btnInscrios) {
    btnInscrios?.addEventListener('click', () => {
        window.location.href = 'registered.html'
    });
}

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