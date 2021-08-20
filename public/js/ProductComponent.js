Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/item-${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="product-box">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `


    <div class="product">
          <a class="product__link" href="open-page.html">
            <img :src="img" class="product__img" alt="photo-product">
          </a>
          <div class="product__content">
            <a href="open-page.html" class="product__name">{{product.product_name}}</a>
            <p class="product__text">Known for her sculptural takes on traditional tailoring, Australian arbiter
              of cool Kym Ellery teams up with Moda Operandi.</p>
            <p class="product__price">$ {{product.price}}</p>
          </div>
          <a  class="product__add" @click="$emit('add-product', product)">
            Add to Cart
          </a>
    </div>

            // <div class="product">
            //     <img :src="img" alt="Some img">
            //     <div class="desc">
            //     <h3 class="forDesc">{{product.product_name}}</h3>
            //     <p class="forDesc">{{product.price}}</p>
            //         <button class="buy-btn forDesc" @click="$emit('add-product', product)">Купить</button>
            //     </div>
            // </div>
    `
})