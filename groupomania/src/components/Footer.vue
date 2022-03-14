<!-- HTML-->
<template>
	<footer>
		<h3>{{copyright}}</h3>
	</footer>
</template>


<style scoped lang="css">
footer{
	margin-left: 2%;
}
h3{
   color:#122542;
   font-size:30px;
}
</style>

   <!--Script => Javascript-->
<script>
	import {mapGetters} from 'vuex'
	export default {
		name: 'Footer',
		computed:{
			...mapGetters(['copyright'])
		}
	}
</script>