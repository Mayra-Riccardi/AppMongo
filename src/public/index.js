console.log('implementacion de websockets')
const socket = io()

socket.on('updateProducts', (products) => {
  console.log('Lista de productos actualizada recibida:', products);

  // Actualizar la lista de productos en el cliente
  const productsList = document.getElementById('products-list');
  productsList.innerHTML = '';

  const productGrid = document.createElement('div');
  productGrid.classList.add('uk-child-width-1-4@m', 'uk-grid');

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('uk-width-1-4@m', 'uk-margin');

    const productCardHTML = `
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <img src="${product.thumbnail}" alt="foto producto" /> <!-- Mostrar la imagen -->
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">${product.title}</h3>
          <h5>$${product.price}</h5>
          <button class="uk-button uk-button-secondary uk-button-small">Agregar al carrito</button>
        </div>
      </div>
    `;

    productCard.innerHTML = productCardHTML;
    productGrid.appendChild(productCard);
  });

  productsList.appendChild(productGrid);
});
