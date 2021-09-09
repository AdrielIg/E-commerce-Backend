const center = document.querySelector('.products-center')
const userData = document.querySelector('.user-info')


/* -------- PRODUCTS ------------ */
const productoHtml = Handlebars.compile(`
  {{#if productosExisten}}
    
      {{#each productos}}
      <div class='product' >  
          <img class='product-img' src={{this.img}} alt={{this.img}}>
          <h4>{{this.title}}</h4>
          <p class='product-description'>{{this.description}}</p>
          <p class='product-stock'>stock: {{this.stock}}</p>
          <p class='product-price'>$ {{ this.price }}</p>
          </div>
      {{/each}}
    
 
  {{else}}
    <h3 class="alert alert-warning">No se encontraron productos</h3>
  {{/if}}
`);

//Pasar datos a template y renderizar dentro de tabla
const productosRender = productos => {

  const html = productoHtml({ productos: productos, productosExisten: true });
  center.innerHTML = html;
}

const fetchProductos = async () => {
  const response = await fetch('/productos/listar')
  const data = await response.json()
  productosRender(data)
}
fetchProductos()

/* ---------------END OF PRODUCTS ----------------- */
/* -------------USER DATA----------------- */
const userHtml = Handlebars.compile(`
  {{#if userExist}}
    <h2 class='name'>{{name}}</h2>
    <p class='username'>{{username}}</p>  
    <img class='avatar' src={{avatar}} alt='{{name}} profile'/>  
 
  {{else}}
    <h3 class="alert alert-warning">No hay usuario</h3>
  {{/if}}
`);

const userRender = data => {
  console.log(data)
  const html = userHtml({ name: data.name, username: data.username, avatar: data.avatar, userExist: data.name.length > 0 });
  userData.innerHTML = html;
}

const fetchUser = async () => {
  const response = await fetch('/user')
  const data = await response.json()
  userRender(data)

}

fetchUser()

/* -------------END OF USER DATA----------------- */



