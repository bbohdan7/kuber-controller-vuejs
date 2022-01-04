<template>
  <sui-grid :columns="3">
    <sui-grid-row>
      <sui-grid-column></sui-grid-column>
      <sui-grid-column>
        <h1 style="text-align: center">
          Update Employee {{ employee.id }}

          <sui-form @submit.prevent="updateEmployee" method="PUT">
            <sui-form-field>
              <label>Name: </label>
              <sui-input
                type="text"
                placeholder="Employee name..."
                v-model="employee.employeeName"
              />

              <label>Salary: </label>
              <sui-input
                type="number"
                placeholder="Employee salary..."
                v-model="employee.employeeSalary"
              />

              <label>Age: </label>
              <sui-input
                type="number"
                placeholder="Employee age..."
                v-model="employee.employeeAge"
              />

              <sui-button type="submit" color="blue" icon="sync"
                >Update</sui-button
              >
            </sui-form-field>
          </sui-form>
        </h1>
      </sui-grid-column>
      <sui-grid-column></sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>
<script>
import EmployeeService from "../service/employee-service";

export default {
  name: "UpdateEmployee",

  data() {
    return {
      employee: {},
    };
  },

  methods: {
    updateEmployee() {
        EmployeeService.update(this.$route.params.id, this.employee).then(() => {
            this.$router.push({name: "home"})
        })
    },
  },

  created() {
    EmployeeService.find(this.$route.params.id).then(
      (r) => (this.employee = r.data)
    );
  },
};
</script>
