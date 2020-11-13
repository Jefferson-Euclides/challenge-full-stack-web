<template>
  <v-container class="submit-form mt-3 mx-auto">
    <v-app-bar app dark >
      Cadastro de Alunos
    </v-app-bar>

    <div>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          v-model="student.name"
          :rules="[(v) => !!v || 'O nome é obrigatório']"
          label="Nome"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.email"
          :rules="[(v) => !!v || 'O Email é obrigatório']"
          label="Email"
          type="email"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.academicRegister"
          :rules="[(v) => !!v || 'O registro acadêmico é obrigatório']"
          label="RA"
          :disabled="paramId != undefined"
          required
        ></v-text-field>

        <v-text-field
          v-model="student.cpf"
          :rules="[(v) => !!v || 'O CPF é obrigatório']"
          label="CPF"
          :disabled="paramId != undefined"
          counter="11"
          required
        ></v-text-field>
      </v-form>

      <div v-if="submitted" class="text-center">
        <span v-text="message" class="green--text"></span>
      </div>
      
      <v-row align="right" justify="space-around">
        <v-col cols="1">
          <v-btn color="error" class="mt-3" to="/students">Cancelar</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" class="mt-3" :disabled="!valid" @click="saveStudent">Salvar</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  name: "add-student",
  data() {
    return {
      student: {
        name: "",
        email: "",
        academicRegister: null,
        cpf: null,
      },
      submitted: false,
      paramId: null,
      editing: Boolean,
      formHasErrors: false,
      valid: false
    };
  },
  methods: {
    minLength(property, minLength) {
      return (v) => 
        (v && v.length >= minLength && this.paramId == undefined) || 
          'O campo precisa ter no mínimo '+ minLength + ' números' 
    },
    getStudent(academicRegister) {
      StudentDataService.get(academicRegister)
        .then((response) => {
          this.student = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveStudent() {
      this.message = ""
      var data = {
        name: this.student.name,
        email: this.student.email,
        cpf: this.student.cpf,
        academicRegister: this.student.academicRegister,
      }; 

      this.$refs.form.validate()

      if(this.paramId === undefined) {
        StudentDataService.create(data)
        .then((response) => {
          this.student.id = response.data.id;
          console.log(response.data);
          this.message = "O aluno foi registrado com sucesso!"
          this.submitted = true;
          this.$refs.form.reset()
        })
        .catch((e) => {
          console.log(e);
        });
      } else {
        StudentDataService.update(this.paramId, data)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
          this.message = "O aluno foi atualizado com sucesso!";
        })
        .catch((e) => {
          console.log(e);
        });
      }
      
    },

    newStudent() {
      this.submitted = false;
      this.student = {};
    },
  },
  mounted() {
    this.valid = false;
    this.paramId = this.$route.params.id;
    if(this.paramId !== undefined) {
      this.getStudent(this.paramId);
    }
  },
};
</script>

<style>
.submit-form {
  max-width: 600px;
}
</style>