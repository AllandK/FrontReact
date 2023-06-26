import axios  from "axios";


export class PersonaService{
baseUrl = "http://localhost:8080/usuario";
getAll(){
    return axios.get(this.baseUrl).then(res => res.data);
}


save(usuario){
    return axios.post(this.baseUrl , usuario).then(res => res.data);
}

}