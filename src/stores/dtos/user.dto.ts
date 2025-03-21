export default class UserDto {
    constructor(
        public id_Usuario: number,
        public nombre: string,
        public apellido: string,
        public contraseña: string,
        public email: string,
        public fecha_Registro: Date
    ) { }
}