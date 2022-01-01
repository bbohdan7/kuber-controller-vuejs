import http from './common-http'

class EmployeeService {
    all(){
        console.log(`Trying to retrieve all employees from address ${http.defaults.baseURL}`)
        return http.get("/employees")
    }

    find(id){
        return http.get(`/employees/${id}`)
    }
}

export default new EmployeeService()