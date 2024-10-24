const searchInput = document.querySelector('.search-bar input');
const searchIcon = document.querySelector('.search-icon');

function performSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    alert(`Searching for: ${searchTerm}`);
    searchInput.value = '';
  }
}

searchInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    performSearch();
  }
});

searchIcon.addEventListener('click', performSearch);

const addToCartButtons = document.querySelectorAll('.btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    
    const floater = document.createElement('div');
    floater.textContent = '🛒';
    floater.style.position = 'absolute';
    floater.style.left = `${e.clientX}px`;
    floater.style.top = `${e.clientY}px`;
    floater.style.fontSize = '24px';
    floater.style.transition = 'all 1s ease';
    document.body.appendChild(floater);

    setTimeout(() => {
      const cart = document.querySelector('nav ul li:last-child a');
      const cartRect = cart.getBoundingClientRect();
      floater.style.left = `${cartRect.left}px`;
      floater.style.top = `${cartRect.top}px`;
      floater.style.opacity = '0';
      floater.style.transform = 'scale(0.5)';
    }, 50);

    setTimeout(() => {
      document.body.removeChild(floater);
      alert(`Added ${productName} to your cart!`);
    }, 1000);
  });
});

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = href.includes('#') ? href.split('#')[1] : '';
    if (target) {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

document.querySelectorAll('.category-btn').forEach(button => {
  button.addEventListener('click', function() {
    const categoryName = this.closest('.category-item').querySelector('h3').textContent;
    alert(`Browsing ${categoryName}`);
  });
});

document.querySelectorAll('.category-image').forEach(image => {
  image.addEventListener('click', function() {
    const categoryName = this.closest('.category-item').querySelector('h3').textContent;
    alert(`Browsing ${categoryName}`);
  });
});

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        imageObserver.unobserve(image);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => {
    img.dataset.src = img.src;
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    imageObserver.observe(img);
  });
}
