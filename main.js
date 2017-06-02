var app = new Vue({
    el: "#app" ,
    data:{
        titulo:'',
        tasks:[],
        errors:[]
    },
    methods:{
        addTask: function(){
            axios.post('http://192.168.0.10/laravelPruebas/public/add_task', {task:this.tasks.task})
              .then(response => {
                  console.log("response save: ",response.data)
                  this.tasks.unshift(response.data)
                  this.tasks.task=""
              })
              .catch(e => {
                 this.errors.push(e)
               })
        },
        done(task){
            axios.post('http://192.168.0.10/laravelPruebas/public/done_task', {task:task})
            .then(response => {
                console.log("response done: ",response.data)
            })
            .catch(e => {
                this.errors.push(e)
            })            
            
        },
        eliminar: function(task){
            axios.post('http://192.168.0.10/laravelPruebas/public/delete_task', {task:task.id})
            .then(response => {
                console.log("response done: ",response.data)
                this.tasks.splice(this.tasks.indexOf(task), 1)
            })
            .catch(e => {
                this.errors.push(e)
            })  
        },
        checkMove: function(evt){
            var task = evt.draggedContext.element
            var futureIndex = evt.draggedContext.futureIndex
            console.log("current task: ", task)
            axios.post('http://192.168.0.10/laravelPruebas/public/order_task', {task:task.id,futureIndex:futureIndex})
            .then(response => {
                console.log("response move: ",response.data)
            })
            .catch(e => {
                this.errors.push(e)
            })              
        },
        editar: function(task){
            console.log("eidtar: ", task);
            this.titulo = task.task
            $('#modal1').modal('open');

        }
     },
    mounted(){
        $('#modal1').modal('open');


        axios.get(`http://192.168.0.10/laravelPruebas/public/tasks`)
        .then(response => {
            this.tasks = response.data
        })
        .catch(e => {
            this.errors.push(e)
        })

        console.log("lista: ", this.tasks)
    },
})


$(document).ready(function(){
// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
$('.modal').modal();
})