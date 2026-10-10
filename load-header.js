document.addEventListener("DOMContentLoaded", function() {
  const headerContainer = document.getElementById("site-header");
  if (headerContainer) {
    fetch('header.html')
      .response => response.text()
      .then(data => {
        headerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
  }
});
