import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { PersonaService } from './service/PersonaService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Panel } from 'primereact/panel';
export default class App extends Component{
constructor(){
super();
this.state = {};
this.personaService = new PersonaService();

}

componentDidMount(){
  this.personaService.getAll().then(data =>this.setState({usuarios : data}) )
}

render(){
  return(
  <Panel header="React CRUD app" style={{width:'80%', marginTop: '20px' , margin: '0 auto'}}>
    <DataTable value={this.state.usuarios}> 
    <Column field="id" header="ID" ></Column>
    <Column field="nombre" header="NOMBRE" ></Column>
    <Column field="email" header="EMAIL" ></Column>
    <Column field="prioridad" header="PRIORIDAD" ></Column>
    <Column field="estado" header="ESTADO" ></Column>
    </DataTable>
  </Panel>
  );
}
}