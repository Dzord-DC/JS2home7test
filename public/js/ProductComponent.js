Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products market_items">
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
    <div class="item_blok">
                    <a class="item_cart" href="singlpage.html">
                        <div class="picture">
                            <img class="item_pic" :src="img" alt="item">

                        </div>

                        <p class="item_name">{{product.product_name}}</p>
                        <p class="price">{{product.price}} $</p>

                    </a>
                    <div class="button_box">
                        <a class="item_button_add" href="#" @click="$emit('add-product', product)">
                            <div class="button_add">
                                <img class="img_but" src="img/cart.png" alt="cart">
                                <p class="button_add_text">Add to Cart</p>
                            </div>
                        </a>
                    </div>
             </div>  
    `
}) //< button class="buy-btn forDesc" @click="$emit('add-product', product)" > Купить</button >