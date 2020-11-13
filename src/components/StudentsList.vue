<template>
  <v-container>
    <v-app-bar app dark >
      Listagem de Alunos
    </v-app-bar>
    <v-row align="center" class="list" no-gutters>
      <v-col cols="6" class="mx-auto" align-self="left">
        <v-text-field v-model="title" label="Digite sua busca" append-icon="mdi-magnify"></v-text-field>
      </v-col>

      <v-col cols="3" class="mx-auto">
      </v-col>

      <v-col cols="3" class="mx-auto">
        <v-btn to="/addStudents" color="primary">
          Cadastrar Aluno
        </v-btn>
      </v-col>

      <v-row class="list" no-gutters>
        <v-col cols="12" class="mx-auto">
          <v-data-table
            :headers="headers"
            :items="students"
            disable-pagination
            :sort-by="['academicRegister', 'name', 'cpf']"
            :sort-desc="[false, true]"
            multi-sort
            :hide-default-footer="true"
            :search="title"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <v-col cols="2">
                  <v-icon small class="mr-2" @click="editStudent(item.academicRegister)">mdi-pencil</v-icon>
                </v-col>
                <v-col cols="2">
                  <div class="text-center">
                    <v-dialog
                      v-model="dialog"
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs"
                          v-on="on" 
                          small 
                          @click="dialog = true"
                          >mdi-delete</v-icon>
                      </template>

                      <v-card>
                        <v-card-title class="headline">
                          Confirmação de exclusão
                        </v-card-title>
                        <v-card-text>Você tem certeza de que deseja excluir esse aluno?</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false"
                          >
                            Cancelar
                          </v-btn>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false, deleteTutorial(item.academicRegister)"
                          >
                            Excluir
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-col>
              </v-row>
          
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
  
</template>

<script>
import StudentDataService from "../services/StudentDataService";
export default {
  name: "students-list",
  data() {
    return {
      students: [],
      title: "",
      dialog: false,
      headers: [
        { text: "Registro Acadêmico", align: "start", sortable: true, value: "academicRegister" },
        { text: "Nome", value: "name", sortable: true },
        { text: "CPF", value: "cpf", sortable: true },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveStudents() {
      StudentDataService.getAll()
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 

    refreshList() {
      this.retrieveStudents();
    },

    searchName() {
      StudentDataService.findByName(this.name)
        .then((response) => {
          this.students = response.data.map(this.getDisplayStudent);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editStudent(academicRegister) {
      this.$router.push({ name: "editStudents", params: { id: academicRegister } });
    },

    deleteTutorial(academicRegister) {
      StudentDataService.delete(academicRegister)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayStudent(student) {
      return {
        name: student.name.length > 30 ? student.name.substr(0, 30) + "..." : student.name,
        email: student.email.length > 30 ? student.email.substr(0, 30) + "..." : student.email,
        cpf: student.cpf,
        academicRegister: student.academicRegister,
      };
    },
  },
  mounted() {
    this.retrieveStudents();
  },
};
</script>

<style>

</style>