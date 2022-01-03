import http from './common-http'

class EmployeeService {
    all() {
        console.log(`Trying to retrieve all employees from address ${http.defaults.baseURL}`)
        return http.get("/employees")
    }

    find(id) {
        return http.get(`/employees/${id}`)
    }

    create(employee) {
        return http.post('/employees', employee)
    }

    update(id, employee) {
        return http.put(`/employees/${id}`, employee)
    }

    delete(id) {
        return http.delete(`/employees/${id}`)
    }

}

export default new EmployeeService()