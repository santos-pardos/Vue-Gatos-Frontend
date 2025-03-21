export default class ProtectoraDto {
    constructor(
        public id_Protectora: number,
        public nombre_Protectora: string,
        public direccion: string,
        public email: string,
        public telefono: number,
        public horario_Atención: string,
        public imagen_Protectora: string
    ) { }
}