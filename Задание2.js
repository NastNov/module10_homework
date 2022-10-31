const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  alert( 'Размер вашего экрана ' + window.screen.width + 'x' + window.screen.height );
});
