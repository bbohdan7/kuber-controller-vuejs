<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
    <sui-button color="red" icon="heart" @click="clickMeAction('hello')"
      >Semantic Button</sui-button
    >

    <sui-input v-model="someValue" v-on:input="onChangeSomeValue" />

    <p v-text="someValue"></p>

    <sui-button color="blue" v-if="this.sortFlag" @click="sort">Sort</sui-button>
    <sui-button color="red" v-else v-on:click=sort>Unsort</sui-button>

    <sui-table inverted>
      <sui-table-header>
        <sui-table-row>
          <sui-table-cell>ID</sui-table-cell>
          <sui-table-cell>Name</sui-table-cell>
          <sui-table-cell>Salary</sui-table-cell>
          <sui-table-cell>Age</sui-table-cell>
          <sui-table-cell>Image</sui-table-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="employee in this.employees" :key="employee.id">
          <sui-table-cell v-text="employee.id"></sui-table-cell>
          <sui-table-cell v-text="employee.employee_name"></sui-table-cell>
          <sui-table-cell v-text="employee.employee_salary"></sui-table-cell>
          <sui-table-cell v-text="employee.employee_age"></sui-table-cell>
          <sui-table-cell v-text="employee.profile_image"></sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
  </div>
</template>

<script>
import EmployeeService from "../service/employee-service";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      someValue: "",
      employees: [],
      sortFlag: false,
    };
  },
  methods: {
    fetchData() {
      EmployeeService.all()
        .then((response) => {
          this.employees = response.data.data;
        })
        .then(() => console.log(JSON.stringify(this.employees)))
        .catch((e) => console.log(e));
    },
    
    clickMeAction(message) {
      window.alert(`Message: ${message}`);
    },
    
    onChangeSomeValue() {
      console.log(`Some value is ${this.someValue}`);
    },

    sort(){
      if(this.sortFlag){
        this.employees = this.employees.sort((a, b) => a.id - b.id)
      } else {
        this.employees = this.employees.sort((a, b) => b.id - a.id)
      }

      this.sortFlag = !this.sortFlag
      
    }
  },
  created() {
    this.fetchData();
    console.log("Component has been mounted!");
  },

  computed: {
    sorted: function(){
      return {
        "background-color": "orange"
      }
    }
  }

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
