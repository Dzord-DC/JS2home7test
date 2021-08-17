// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/200x150',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                item.imgPath = `img/${item.id_product}.png`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        // cartCount() {
        //     return this.cartItems.reduce((summ, item) => summ + item.quantity, 0);
        //   },
        //   cartSumm() {
        //     return this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0);
        //   }
    },
    template: `
    <div>
    <h2 v-if=" cartItems.length === 0" class="basket_hedding">Корзина пуста</h2>
        <div v-else class="cart-add">
           
            <div class="cart-block" >      
                <p> {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} items </p>
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" :cart-count = "cartCount"
                :cart-summ = "cartSumm" @remove="remove" @add-product="addProduct">
                </cart-item>
            </div>
            <p>TOTAL:<span class="price">{{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }} $</span> </p>
            <a class="basket_button1 text" href="shoppingcart.html">CATR</a>
             <button class="basket_button2">BUY</button>
        </div>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item basket_linc_box"">
        <img class="basket_img" :src="img" alt="Some img">
        <div class="product-desc">
            <h3>{{ cartItem.product_name }}</h3>
        </div>
        <p class="product-price n-wrap"> <span class="price">{{ cartItem.price }}$</span> &times {{ cartItem.quantity }}</p>
        <div class="changeQuantity">
                    <button class="btnInCart" @click="$emit('add-product', cartItem)"> + </button>
                    <button class="del-btn" @click="$emit('remove', cartItem)"> &times; </button>
        </div> 
                
                      
        <p class="price n-wrap"> {{ cartItem.price * cartItem.quantity }} $</p>
        
    </div>
    `
})