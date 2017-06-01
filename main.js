console.log("Hello Word");

var app = new Vue({
    el: "#app" ,
    data:{
        tasks:[
            {id: "ch1", name:'tarea 1', done:true,  order:1},
            {id: "ch2", name:'tarea 2', done:false, order:2},
            {id: "ch3", name:'tarea 3', done:true,  order:3},
            {id: "ch4", name:'tarea 4', done:true,  order:4},
         ]
    },
    methods:{
        addTask: function(){
            this.tasks.unshift({
                id:"ch6"+Math.random(),
                name:this.tasks.name,
                done:false
            })
            this.tasks.name=""
        },
        eliminar: function(task){
            this.tasks.splice(this.tasks.indexOf(task), 1)
        }
       
    }
})
