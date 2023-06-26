import './App.css';
import { Component } from 'react';
import { PersonaService } from './service/PersonaService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Panel } from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';


export default class App extends Component{
constructor(){
super();
this.state = {
  visible : false ,
   usuario :{
     id : null,
     nombre : null,
     email : null,
     prioridad : 1,
     estado :1
    
   }
};
this.items = [
 {
  label : 'Nuevo',
  icon : 'pi pi-fw pi-plus',
  command : () => {this.showSaveDialog()}
 },
 
 {
  label : 'Editar',
  icon : 'pi pi-fw pi-pencil',
  command : () => {alert('Modificado!')}
 },
 
 {
  label : 'Eliminar',
  icon : 'pi pi-fw pi-trash',
  command : () => {alert('Borrado!')}
 }
];
this.personaService = new PersonaService();
this.save = this.save.bind(this);
this.footer = (
<div>
  <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
</div>
);


}

componentDidMount(){
  this.personaService.getAll().then(data =>this.setState({usuarios : data}) )
 
}

save(){
  this.personaService.save(this.state.usuario).then(data => {
    this.setState(
    {visible : false ,
      usuario :{
        id : null,
        nombre : null,
        email : null,
        prioridad : 1,
        estado :1
       
      }}
    );
    alert('Usuario creado exitosamente!');
    this.personaService.getAll().then(data =>this.setState({usuarios : data}) )
  })
}

render(){
  return(
  <div style={{width:'80%', marginTop: '20px' , margin: '0 auto'}}>
  <Menubar model ={this.items}/>
  <br/>
  <Panel header="React CRUD app" >
    <DataTable value={this.state.usuarios}> 
    <Column field="id" header="ID" ></Column>
    <Column field="nombre" header="NOMBRE" ></Column>
    <Column field="email" header="EMAIL" ></Column>
    <Column field="prioridad" header="PRIORIDAD" ></Column>
    <Column field="estado" header="ESTADO" ></Column>
    </DataTable>
  </Panel>
  <Dialog header="Crear usuario" visible={this.state.visible} footer={this.footer} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible: false}) }>
    <span className='p-float-label'>
    <InputText style={{width : '100%'}} value={this.state.usuario.nombre} id='nombre' 
     onChange={(e) => this.setState(prevState => {
      let usuario = Object.assign({}, prevState.usuario)
      usuario.nombre = e.target.value

      return {usuario};
      })} />
    <label htmlFor='nombre'>Nombre</label>
    </span>
    <p></p>
    <span className='p-float-label'>
    <InputText style={{width : '100%'}} value={this.state.usuario.email} id='email' onChange={(e) => this.setState(prevState => {
      let usuario = Object.assign({}, prevState.usuario)
      usuario.email = e.target.value

      return {usuario};
      })} />
    <label htmlFor='email'>Email</label>
    </span>
    <p></p>
    <span className='p-float-label'>
    <InputText style={{width : '100%'}} value={this.state.usuario.prioridad} id='prioridad' onChange={(e) => this.setState(prevState => {
      let usuario = Object.assign({}, prevState.usuario)
      usuario.prioridad = e.target.value

      return {usuario};
      })} />
    <label htmlFor='prioridad'>Prioridad</label>
    </span>
    <p></p>
    <span className='p-float-label'>
    <InputText style={{width : '100%'}} value={this.state.usuario.estado} id='estado' onChange={(e) => this.setState(prevState => {
      let usuario = Object.assign({}, prevState.usuario)
      usuario.estado = e.target.value

      return {usuario};
      })} />
    <label htmlFor='estado'>Estado</label>
    </span>
  </Dialog>

  </div>
  );
}

showSaveDialog(){
  this.setState({
    visible: true,
    usuario :{
      id : null,
      nombre : null,
      email : null,
      prioridad : 1,
      estado :1
     
    }
  })
}
}