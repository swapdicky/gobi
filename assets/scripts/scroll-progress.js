// Scroll Progress Bar
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    // Calculate how far down the page the user has scrolled
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // Update the width of the progress bar
    document.getElementById('scroll-progress-bar').style.width = scrollPercent + '%';
  });
});
