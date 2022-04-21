<template>
<div class="dashadmin">

    <AdminDashbord/>
   
    <Footer/>
</div>

</template>

<script>
import AdminDashbord from "../components/AdminDashbord.vue"

import Footer from "../components/Footer.vue"

export default{
    name: "DashBord",
    components: {  AdminDashbord, Footer },
}
</script>
    
