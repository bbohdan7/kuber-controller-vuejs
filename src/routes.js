import AllEmployees from './components/AllEmployees.vue'
import CreateEmployee from './components/CreateEmployee.vue'
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
        name: "update",
        path: "/update/:id",
        component: UpdateEmployee
    }
]