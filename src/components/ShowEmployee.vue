<template>
  <div>
    <sui-grid v-bind:columns="3">
      <sui-grid-row>
        <sui-grid-column>
          <sui-button positive icon="arrow left" @click="() => this.$router.go(-1)">Back</sui-button>
        </sui-grid-column>
        <sui-grid-column class="my">
          <sui-card>
            <h1>Viewing employee {{ employee.id }}</h1>
            <sui-image
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
            ></sui-image>
            <sui-card-content>
              <sui-card-header>{{ employee.employeeName }}</sui-card-header>
              <sui-card-meta>Age: {{ employee.employeeAge }}</sui-card-meta>
              <sui-card-description
                >Salary:
                <strong
                  >{{ employee.employeeSalary }}$</strong
                ></sui-card-description
              >
            </sui-card-content>
          </sui-card>
        </sui-grid-column>
        <sui-grid-column></sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
import EmployeeService from "../service/employee-service";

export default {
  name: "ShowEmployee",
  data() {
    return {
      employee: {},
    };
  },
  created() {
    EmployeeService.find(this.$route.params.id).then(
      (r) => (this.employee = r.data)
    );
  },
};
</script>

<style>
.my {
    
}
</style>