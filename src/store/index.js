import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //todos: []
        lngLats:[
            {
                id:6,
                x:121.500542,
                y:31.022268
            },//6
            {
                id:7,
                x:121.504554,
                y:31.036527
            },//7
            {
                id:21,
                x:121.507559,
                y:31.034532
            },//21
            {
                id:22,
                x:121.507555,
                y:31.030769
            },//22
            {
                id:24,
                x:121.50041,
                y:31.030548
            },//24
            {
                id:25,
                x:121.498999,
                y:31.031789
            },//25
            {
                id:26,
                x:121.501397,
                y:31.034887
            },//26
            {
                id:27,
                x:121.503156,
                y:31.035365
            },//27
            {
                id:28,
                x:121.503387,
                y:31.030566
            }//28
        ]
    },
    getters: {
        // //加工形成新的数据
        // showhistory(state) {
        //     return state.todos.filter(item => item.completed == true);
        // }
    },
    mutations: {
        // addtodo(state, payload) {
        //     if (payload.title == "") {
        //         alert("你输入的内容为空，请重新输入后提交！");
        //     } else {
        //         state.todos.push(payload);
        //     }
        // },
        // is_ok(state, id) {
        //     state.todos.find(item => item.id == id).completed = true;
        // },
        // delete(state, id) {
        //     if (confirm("确定要删除这个任务吗？删除就找不到了！")) {
        //         state.todos = state.todos.filter(item => item.id != id);
        //     } else {
        //         return
        //     }
        //
        // }
    },
    modules: {}
})
