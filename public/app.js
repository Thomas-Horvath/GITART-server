
document.addEventListener('DOMContentLoaded', (event) => {
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const codeBlock = button.previousElementSibling.querySelector('code');
      const range = document.createRange();
      range.selectNodeContents(codeBlock);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand('copy');
        selection.removeAllRanges();

        // Jelöld, hogy sikeres volt a másolás
        button.textContent = 'Másolva!';
        setTimeout(() => {
          button.textContent = 'Kód';
        }, 2000);
      } catch (e) {
        console.error('Copy failed', e);
      }
    });
  });
});