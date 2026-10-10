document.addEventListener("DOMContentLoaded", function() {
  const headerContainer = document.getElementById("site-header");
  if (headerContainer) {
    // Χρησιμοποιούμε απόλυτο ή ασφαλές σχετικό path για να το βρίσκει το GitHub Pages
    fetch('https://bsalakos.github.io/header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        headerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
  }
});
