<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <sui-input placeholder="Input something..." v-model="message" />

    <p>{{ this.message }}</p>

    <sui-table inverted selectable>
      <sui-table-header>
        <sui-table-row>
          <sui-table-cell>
            <i class="caret up icon" v-if="!sortIdFlag" @click="sortById"></i>
            <i class="caret down icon" v-else @click="sortById"></i>
            ID <br />
            <sui-input
              placeholder="Search Id..."
              v-model="idSearch"
              v-on:input="onSearchId"
            />
          </sui-table-cell>
          <sui-table-cell>
            <i
              class="caret up icon"
              v-if="!sortNameFlag"
              @click="sortByName"
            ></i>
            <i class="caret down icon" v-else @click="sortByName"></i>
            Name <br />
            <sui-input
              placeholder="Search Name..."
              v-model="nameSearch"
              @input="onSearchName"
            />
          </sui-table-cell>
          <sui-table-cell>
            <i
              class="caret up icon"
              v-if="!sortSalaryFlag"
              @click="sortBySalary"
            ></i>
            <i class="caret down icon" v-else @click="sortBySalary"></i>
            Salary <br />
            <sui-input
              placeholder="Search salary..."
              v-model="salarySearch"
              @input="onSearchSalary"
            />
          </sui-table-cell>
          <sui-table-cell>
            <i class="caret up icon" v-if="!sortAgeFlag" @click="sortByAge"></i>
            <i class="caret down icon" v-else @click="sortByAge"></i>
            Age <br />
            <sui-input
              placeholder="Search age..."
              v-model="ageSearch"
              @input="onAgeSearch"
            />
          </sui-table-cell>
          <sui-table-cell>Actions</sui-table-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row
          v-for="employee in this.employees"
          v-bind:key="employee.id"
        >
          <sui-table-cell
            v-text="employee.id"
            @click="toggleEmployeeModal(employee)"
          ></sui-table-cell>
          <sui-table-cell v-text="employee.employeeName"></sui-table-cell>
          <sui-table-cell v-text="employee.employeeSalary"></sui-table-cell>
          <sui-table-cell v-text="employee.employeeAge"></sui-table-cell>
          <sui-table-cell>
            <sui-form-field>
              <router-link
                v-bind:to="{ name: 'show', params: { id: employee.id } }"
                class="ui button blue"
              >
                <i class="ui eye icon"></i>
              </router-link>
              <router-link
                v-bind:to="{ name: 'update', params: { id: employee.id } }"
                class="ui button teal"
              >
                <i class="ui edit icon"></i>
              </router-link>
              <sui-button
                color="red"
                v-on:click.native="toggleDeleteModal(employee)"
              >
                <i class="ui trash icon"></i>
              </sui-button>
            </sui-form-field>
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>

    <!-- Viewing selected employee -->
    <sui-modal v-model="openEmployeeModal">
      <sui-modal-header
        >Employee {{ this.currentEmployee.id }}</sui-modal-header
      >
      <sui-modal-content>
        <sui-modal-description>
          <h1 style="text-align: center">{{ this.currentEmployee.id }}</h1>
          <ul>
            <li>
              Name: <u>{{ this.currentEmployee.employeeName }}</u>
            </li>
            <li>
              Salary: <u>{{ this.currentEmployee.employeeSalary }}</u>
            </li>
            <li>
              Age: <u>{{ this.currentEmployee.employeeAge }}</u>
            </li>
            <li>
              Profile image:
              <u>{{ this.currentEmployee.employee_profileImage }}</u>
            </li>
          </ul>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button negative @click="toggleEmployeeModal"> Close </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <!-- Delete current employee -->
    <sui-modal v-model="openDeleteModal">
      <sui-modal-header>Do you want to delete this employee?</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <sui-header
            >Employee {{ currentEmployee.employeeName }} will be
            deleted?</sui-header
          >
          <p>
            This action cannot be undone so be sure you'd like to perform this
            action.
          </p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="deleteCurrentEmployee">
          Yes, I'm sure!
        </sui-button>
        <sui-button negative @click.native="toggleDeleteModal"> No </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import EmployeeService from "../service/employee-service";

export default {
  name: "AllEmployee",
  props: {
    msg: String,
  },
  data() {
    return {
      alphabet: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      employees: [],
      sortIdFlag: false,
      sortNameFlag: false,
      sortSalaryFlag: false,
      sortAgeFlag: false,
      currentEmployee: {},
      message: "",
      openEmployeeModal: false,
      openDeleteModal: false,
      idSearch: null,
      nameSearch: null,
      salarySearch: null,
      ageSearch: null,
    };
  },
  methods: {
    fetchData() {
      EmployeeService.all()
        .then((response) => {
          this.employees = response.data;
        })
        .then(() => console.log(JSON.stringify(this.employees)))
        .catch((e) => console.log(e));
    },

    deleteCurrentEmployee() {
      EmployeeService.delete(this.currentEmployee.id).then(() => {
        window.alert(
          `Employee ${this.currentEmployee.employeeName} has been successfully deleted!`
        );
        this.currentEmployee = {};
        this.openDeleteModal = false;
        this.fetchData();
      });
    },

    clickMeAction(message) {
      window.alert(`Message: ${message}`);
    },

    toggleEmployeeModal(employee) {
      this.currentEmployee = employee;
      this.openEmployeeModal = !this.openEmployeeModal;
    },

    toggleDeleteModal(employee) {
      this.currentEmployee = employee;
      this.openDeleteModal = !this.openDeleteModal;
    },

    onSearchId() {
      this.employees = this.employees.filter((emp) =>
        emp.id.toString().includes(this.idSearch)
      );

      if (this.idSearch == "") {
        this.fetchData();
      }
    },

    onSearchName() {
      this.employees = this.employees.filter((emp) =>
        emp.employeeName.toLowerCase().includes(this.nameSearch.toLowerCase())
      );

      if (this.nameSearch == "") this.fetchData();
    },

    onSearchSalary() {
      this.employees = this.employees.filter((emp) =>
        emp.employeeSalary.toString().includes(this.salarySearch)
      );

      if (this.salarySearch == "") this.fetchData();
    },

    onAgeSearch() {
      this.employees = this.employees.filter((emp) =>
        emp.employeeAge.toString().includes(this.ageSearch)
      );

      if (this.ageSearch == "") this.fetchData();
    },

    sortById() {
      if (this.sortIdFlag) {
        this.employees = this.employees.sort((a, b) => a.id - b.id);
      } else {
        this.employees = this.employees.sort((a, b) => b.id - a.id);
      }
      this.sortIdFlag = !this.sortIdFlag;
    },

    sortByName() {
      if (this.sortNameFlag) {
        this.employees.sort(
          (a, b) =>
            this.alphabet.indexOf(a.employeeName.charAt(0).toLowerCase()) -
            this.alphabet.indexOf(b.employeeName.charAt(0).toLowerCase())
        );
      } else {
        this.employees.sort(
          (a, b) =>
            this.alphabet.indexOf(b.employeeName.charAt(0).toLowerCase()) -
            this.alphabet.indexOf(a.employeeName.charAt(0).toLowerCase())
        );
      }
      this.sortNameFlag = !this.sortNameFlag;
    },

    sortBySalary() {
      if (this.sortSalaryFlag) {
        this.employees.sort((a, b) => a.employeeSalary - b.employeeSalary);
      } else {
        this.employees.sort((a, b) => b.employeeSalary - a.employeeSalary);
      }
      this.sortSalaryFlag = !this.sortSalaryFlag;
    },

    sortByAge() {
      if (this.sortAgeFlag) {
        this.employees.sort((a, b) => a.employeeAge - b.employeeAge);
      } else {
        this.employees.sort((a, b) => b.employeeAge - a.employeeAge);
      }
      this.sortAgeFlag = !this.sortAgeFlag;
    },
  },
  created() {
    this.fetchData();
    console.log("Component has been mounted!");
  },

  computed: {
    sorted: function () {
      return {
        "background-color": "orange",
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
