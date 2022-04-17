<template>
<div class="dashadmin">

    <AdminDashbord/>
    <ButtonAdmin/>
    <Footer/>
</div>

</template>

<script>
import AdminDashbord from "../components/AdminDashbord.vue"
import ButtonAdmin from "../components/ButtonAdmin.vue"
import Footer from "../components/Footer.vue"

export default{
    name: "DashBord",
    components: {  AdminDashbord, ButtonAdmin,Footer },
}
</script>
    
