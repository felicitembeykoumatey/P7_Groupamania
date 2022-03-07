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

 <!--Template => HTML-->
<template>
	<footer>
		<h3>{{copyright}}</h3>
	</footer>
</template>


  <!--Style => CSS à faire plutard>