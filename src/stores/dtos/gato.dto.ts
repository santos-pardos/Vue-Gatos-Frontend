export default class GatoDto {
    constructor(
        public id_Gato: number,
        public id_Protectora: number,
        public nombre_Gato: string,
        public raza: string,
        public edad: number,
        public esterilizado: boolean,
        public sexo: string,
        public descripcion_Gato: string,
        public imagen_Gato: string,
    ) { }
}