<template>
  <div>
    <h1>Create new Employee</h1>

    <sui-grid :columns="3">
      <sui-grid-row>
        <sui-grid-column></sui-grid-column>
        <sui-grid-column>
          <sui-form method="post" v-on:submit.prevent="createEmployee">
            <sui-form-field>
              <label>Employee name: </label>
              <sui-input type="text" v-model="employee.employeeName" />

              <label>Employee salary: </label>
              <sui-input type="number" v-model="employee.employeeSalary" />

              <label>Employee age: </label>
              <sui-input type="number" v-model="employee.employeeAge" />

              <sui-button color="olive" type="submit" icon="building"
                >Create</sui-button
              >
            </sui-form-field>
          </sui-form>
        </sui-grid-column>
        <sui-grid-column></sui-grid-column>
      </sui-grid-row>
    </sui-grid>
    <h1 style="text-align: center">{{ message }}</h1>
  </div>
</template>
<script>
import EmployeeService from "../service/employee-service";

export default {
  name: "CreateEmployee",

  data() {
    return {
      employee: {},
      message: "default text",
    };
  },

  methods: {
    createEmployee(){
      EmployeeService.create(this.employee).then(() => {
        this.$router.push({name: "home"})
      })
    }
  },
};
</script>