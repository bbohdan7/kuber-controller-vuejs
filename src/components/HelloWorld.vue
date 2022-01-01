<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <sui-button color="red" icon="heart" @click="clickMeAction('hello')"
      >Semantic Button</sui-button
    >

    <sui-input v-model="message" />

    <p>{{ this.message }}</p>

    <sui-table inverted selectable>
      <sui-table-header>
        <sui-table-row>
          <sui-table-cell>
            <sui-input v-model="idSearch" v-on:input="onSearchId" />
            <i class="caret up icon" v-if="!sortIdFlag" @click="sortById"></i>
            <i class="caret down icon" v-else @click="sortById"></i>
            ID
          </sui-table-cell>
          <sui-table-cell>
            <i
              class="caret up icon"
              v-if="!sortNameFlag"
              @click="sortByName"
            ></i>
            <i class="caret down icon" v-else @click="sortByName"></i>
            Name
          </sui-table-cell>
          <sui-table-cell>
            <i
              class="caret up icon"
              v-if="!sortSalaryFlag"
              @click="sortBySalary"
            ></i>
            <i class="caret down icon" v-else @click="sortBySalary"></i>
            Salary
          </sui-table-cell>
          <sui-table-cell>
            <i class="caret up icon" v-if="!sortAgeFlag" @click="sortByAge"></i>
            <i class="caret down icon" v-else @click="sortByAge"></i>
            Age
          </sui-table-cell>
          <sui-table-cell>Image</sui-table-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row
          v-for="employee in this.employees"
          :key="employee.id"
          @click="toggleEmployeeView(employee)"
        >
          <sui-table-cell v-text="employee.id"></sui-table-cell>
          <sui-table-cell v-text="employee.employeeName"></sui-table-cell>
          <sui-table-cell v-text="employee.employeeSalary"></sui-table-cell>
          <sui-table-cell v-text="employee.employeeAge"></sui-table-cell>
          <sui-table-cell v-text="employee.profileImage"></sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>

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
        <sui-button negative @click="toggleEmployeeView"> Close </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <Header />
  </div>
</template>

<script>
import EmployeeService from "../service/employee-service";
import Header from "./Header";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Header,
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
      idSearch: null,
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

    clickMeAction(message) {
      window.alert(`Message: ${message}`);
    },

    toggleEmployeeView(employee) {
      this.currentEmployee = employee;
      this.openEmployeeModal = !this.openEmployeeModal;
    },

    onSearchId() {
      this.employees = this.employees.filter((emp) => emp.id == this.idSearch);

      if (this.idSearch == "") {
        this.fetchData();
      }
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
