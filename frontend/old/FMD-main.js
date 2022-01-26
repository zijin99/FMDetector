//Ban the return button to secure the logout
history.pushState(null, null, document.URL);
window.addEventListener("popstate", function() {
  history.pushState(null, null, document.URL);
});