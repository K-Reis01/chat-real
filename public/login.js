const loginBtn = document.getElementById('loginBtn');
const nicknameInput = document.getElementById('nickname');

loginBtn.addEventListener('click', () => {
    const nickname = nicknameInput.value.trim();
    if(nickname) {
        localStorage.setItem('nickname', nickname);
        window.location.href = 'chat.html';
    } else {
        alert('Digite um nome para entrar no chat.');
    }
});
