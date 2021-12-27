import http from './common-http'

class EmployeeService {
    all(){
        return http.get("/employees")
    }
}

export default new EmployeeService()