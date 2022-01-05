<template>
  <div>
    <sui-grid v-bind:columns="3">
      <sui-grid-row>
        <sui-grid-column>
          <sui-button
            positive
            icon="arrow left"
            @click="() => this.$router.go(-1)"
            >Back</sui-button
          >
        </sui-grid-column>
        <sui-grid-column class="my">
          <sui-card v-if="!isDeleted">
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
            <sui-card-content extra>
              <sui-button-group>
                <sui-button
                  negative
                  icon="trash"
                  @click.native="toggleDeleteModal"
                  >Remove</sui-button
                >
                <sui-button
                  positive
                  icon="home"
                  @click="() => this.$router.push({ name: 'home' })"
                  >Home</sui-button
                >
              </sui-button-group>
            </sui-card-content>
          </sui-card>
          <sui-message v-else negative header="Deleted" content="Employee has been successfully deleted." dismissable>
            <sui-button color="blue" icon="home" @click="() => this.$router.push({name: 'home'})">Go Home</sui-button>
          </sui-message>        
        </sui-grid-column>
        <sui-grid-column></sui-grid-column>
      </sui-grid-row>
    </sui-grid>

    <sui-modal v-model="openDeleteModal">
      <sui-modal-header>
        Are you sure you want to delete
        <strong>{{ employee.employeeName }}</strong
        >?
      </sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <strong>{{ employee.employeeName }}</strong> will be removed
          permanently?
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button negative icon="trash" @click="deleteEmployee">Delete</sui-button>
        <sui-button positive icon="close" @click="toggleDeleteModal">Cancel</sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import EmployeeService from "../service/employee-service";

export default {
  name: "ShowEmployee",
  data() {
    return {
      employee: {},
      openDeleteModal: false,
      isDeleted: false
    };
  },
  methods: {
    toggleDeleteModal: function () {
      this.openDeleteModal = !this.openDeleteModal;
    },

    deleteEmployee(){
      EmployeeService.delete(this.employee.id).then(() => {
        this.isDeleted = true
        this.toggleDeleteModal()
      })
    }
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