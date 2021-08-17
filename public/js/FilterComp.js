Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="search_form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" placeholder="Search for Item..." class="search_input" v-model="userSearch">
                <button type="submit" class="search_button">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
})