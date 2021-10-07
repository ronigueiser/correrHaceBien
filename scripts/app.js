Vue.component('productos', {
	props: ['title', 'image', 'price', 'descripcion'],
	template: `

		
		<div class="col-6 col-lg-4">
			<div class="d-flex flex-column align-items-center">
				<img :src="image" :alt="descripcion">
				<h3 class="estilo_nombre_producto">{{title}}</h3>
				<p class="estilo_precio"><span>$</span>{{price}}</p>
			</div>
		</div>
	`
});


Vue.component('form-component',{
	data:function (){
		return {
				titulo:"",
				edad:null,
				elegido:null,
				// ejercita:"si",
				respuesta_cantidad: "",
				lista_de_productos:[],
				errores:[],
				enviado:false,
				array:[],

				options:[
					{texto: 'Ninguno', dato: '0', disabled:false},
					{texto: 'Uno', dato: '1', disabled:false},
					{texto: 'Dos/Tres', dato: '2/3', disabled:false },
					{texto: 'Cuatro/Cinco', dato: '4/5', disabled:false },
					{texto: 'Seis/Siete', dato: '6/7', disabled:false },

				],



		}
	},
	computed : {
		hay_Errores: function () {
			return this.errores.length;
		}
	},
	template: `<div class="form container">
			<h2 class="text-center my-5">Contanos tu Perfil</h2>
			<form v-on:submit.prevent="analizar" class="formulario container" novalidate id="contacto">
				
				<div class="row px-3 mt-5 mb-2">
					<label class="col-6">Nombre y Apellido:</label>
					<input  class="col-6" type="text" v-model="titulo" name="nombre" required/>
				</div>
				<div class="row px-3 my-2">
					<label class="col-6">Edad:</label>
					<input class="col-6" type="number" v-model.number="edad" name="edad" required/>
				</div>
				<div class="row px-3 my-2">
					<label class="col-6">Días de entrenamiento p/ semana</label>
					<select v-model="elegido" class="col-6">
						<option v-for="item in options" v-bind:value="item.dato">
							 {{item.texto}}
						</option>
					</select>
				</div>
				<div class="checkbox_productos row px-3 mt-2">
					<div>
						<label class="col-12">Elegí los productos que te interesan:</label>
							<div class="col-12">
								<div class="row">
									<label class="col"><input type="checkbox" value="Ninguno" v-model="lista_de_productos" name="Ninguno" require class="mr-2">Ninguno</label>
									<label class="col"><input type="checkbox" value="Buzo" v-model="lista_de_productos" name="Buzo" class="mr-2">Buzo</label>
									<label class="col"><input type="checkbox" value="Remera" v-model="lista_de_productos" name="Remera" class="mr-2">Remera</label>
									<label class="col"><input type="checkbox" value="Short" v-model="lista_de_productos" name="Short" class="mr-2">Short</label>
									<label class="col"><input type="checkbox" value="Bolso Nike" v-model="lista_de_productos" name="Bolso Nike" class="mr-2">Bolso</label>
								</div>
							</div>
							<div class="col-12">
								<div class="row">
									<label class="col"><input type="checkbox" value="Calza" v-model="lista_de_productos" name="Calza" class="mr-2">Calza</label>
									<label class="col"><input type="checkbox" value="Guantes" v-model="lista_de_productos" name="Guantes" class="mr-2">Guantes</label>
									<label class="col"><input type="checkbox" value="Botella" v-model="lista_de_productos" name="Botella" class="mr-2">Botella</label>
									<label class="col"><input type="checkbox" value="Porta Celular" v-model="lista_de_productos" name="Porta Celular" class="mr-2">Portacelu</label>
									<label class="col"><input type="checkbox" value="Reloj" v-model="lista_de_productos" name="Reloj" class="mr-2">Reloj</label>	
								</div>
							</div>
						</div>
					</div>



		<input type="submit" value="Enviar" class="boton-submit"/>


		<div v-if="enviado === true">
					<div v-if="hay_Errores" class="errores-varios">
						 <ul class="text-center">
							 <li v-for="error in errores" >{{error}}</li>
						</ul>
					</div>
					<div v-else class="enviado text-center">
						  <span>¡Datos enviados con éxito!</span>
					</div>
				</div>

		<div v-if="this.array.length > 0" >
			<div id="carnet" class="col-7 my-5">
						<h2 class="h4 mt-4 text-center" >Carnet de Entrenamiento</h2>
						<ul class="mt-3 mb-4">
							<li><b>Nombre:</b> {{titulo}}</li>
							<li><b>Edad:</b> {{edad}}</li>
							<li><b>Frecuecia:</b> {{elegido}}</li>
						</ul>
					</div>
	
		</div>
		<div v-else class="classerror">
			<p>No hay datos que mostrar, empezá a cargar tus juegos!</p>
		</div>



<!--</div>-->

</form>

</div>`,
	methods:{
		analizar: function (){

			this.enviado = true;
			this.errores=[]


			if (!this.titulo) {
				console.log(!this.titulo)
				this.errores.push('El nombre es obligatorio');
			}

			if(this.edad < 17){
				console.log(this.edad)
				this.errores.push('Debes ser mayor de 18 años')
			}
			if(this.edad < 0){
				this.errores.push('Numero invalido')
			}

			if(!this.lista_de_productos[0]){
				this.errores.push('Debe seleccionar la cantidad de dias que entrena.');
			}

			if (this.elegido == null) {
				this.errores.push('Debe elegir una opcion entre los productos.');
			}


			if(this.errores.length === 0){

				nuevoObj = {comentario: this.comentario,
					seleccion: this.seleccion,
					anio: this.anio,
					titulo:this.titulo,
					edad:this.edad,
					elegido:this.elegido,
					// ejercita:"si",
					respuesta_cantidad: this.respuesta_cantidad,
					lista_de_productos:this.lista_de_productos,
				}

				if(!localStorage.dato){
					this.array=[]
				}else{
					this.array=JSON.parse(localStorage.getItem("informacion"))
				}

				this.array.push(nuevoObj)
				localStorage.setItem("informacion",JSON.stringify(this.array))
			}


		}
	}
})



new Vue({
	el:'#app',
	data: {
		productos: [
			{
				title: 'Buzo',
				image: '../img/Ropa/BuzoVerde.png',
				price: 1500,
				descripcion:'Buzo liviano de entrenamiento'
			},
			{
				title: 'Remera',
				image: '../img/Ropa/remeraNegra.png',
				price: 1200,
				descripcion:'Remera Dri-Fit de entrenamiento'
			},
			{
				title: 'Short',
				image: '../img/Ropa/shortNegro.png',
				price: 1000,
				descripcion:'Short Dri-Fit de entrenamiento'
			},
			{
				title: 'Bolso Nike',
				image: '../img/Frio/bolsoNike.png',
				price: 9999,
				descripcion:'Bolso Nike color camuflado'
			},
			{
				title: 'Calza',
				image: '../img/Frio/calzaNegra.png',
				price: 900,
				descripcion:'Calza Negra para el frio'
			},
			{
				title: 'Guantes',
				image: '../img/Frio/guantesNegros.png',
				price: 700,
				descripcion:'Guantes de entrenamiento para el frio'
			},
			{
				title: 'Botella',
				image: '../img/Accesorios/botellaAzul.png',
				price: 559,
				descripcion:'Botella termica'
			},
			{
				title: 'Porta Celular',
				image: '../img/Accesorios/portaCelular.png',
				price: 1250,
				descripcion:'Porta celulares para ajustar en el brazo'
			},
			{
				title: 'Reloj',
				image: '../img/Accesorios/Reloj.png',
				price: 8700,
				descripcion:'Reloj especial de entrenamiento'
			},
		],


	},

})

