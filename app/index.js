import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 10
    },
    mutations: {
        increment(state, payload) {
            state.count = state.count + payload.amount
        }
    }
})

console.log(store.state.count)
store.commit('increment', {amount: 5})
console.log(store.state.count)