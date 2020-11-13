<template>
  <v-app>
    
    <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-2"
      permanent
      dark
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key=item.title
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data () {
      return {
        items: [
          { title: 'Alunos', icon: 'mdi-view-dashboard', path: '/students' }
        ]
      }
    }
};
</script>