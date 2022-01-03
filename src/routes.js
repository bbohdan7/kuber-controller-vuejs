import AllEmployees from './components/AllEmployees.vue'
import CreateEmployee from './components/CreateEmployee.vue'
import ShowEmployee from './components/ShowEmployee.vue'
import UpdateEmployee from './components/UpdateEmployee.vue'

export const routes = [
    {
        name: "home",
        path: "/",
        component: AllEmployees        
    }, 
    {
        name: "create",
        path: "/create",
        component: CreateEmployee
    },
    {
        name: "show",
        path: "/show/:id",
        component: ShowEmployee,
    },
    {
        name: "update",
        path: "/update/:id",
        component: UpdateEmployee
    }
]