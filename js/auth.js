document.querySelectorAll('.password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
        const input = document.getElementById(button.getAttribute('aria-controls'));
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        button.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
        button.querySelector('i').className = showing ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
    });
});

const signupForm = document.querySelector('.auth-shell--signup form');
if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
        const password = document.getElementById('signup-password');
        const confirmation = document.getElementById('confirm-password');
        confirmation.setCustomValidity(password.value === confirmation.value ? '' : 'Passwords do not match.');
        if (!signupForm.checkValidity()) event.preventDefault();
    });
}
