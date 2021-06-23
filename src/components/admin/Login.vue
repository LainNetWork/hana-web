<template>

</template>

<script>
import login from "../../api/login";
export default {
  name: "Login",
  setup(){
    login("admin","123456")
  }
}
</script>

<style scoped>

</style>