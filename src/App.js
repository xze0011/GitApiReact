import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import store from './conponent/store'
import { Input , Button, Card, Col, Row,Tooltip } from 'antd';
import { Component } from 'react';
import axios from 'axios';
import {CHANGEINPUT,SEARCHSUBJECT,GITOBJ} from './conponent/actionType';

class App extends Component {
  constructor(props){
    super(props)
    this.state = store.getState()
    this.changeInputValue = this.changeInputValue.bind(this) 
    this.fetchBtn = this.fetchBtn.bind(this)
    this.storeChange = this.storeChange.bind(this)
    store.subscribe(this.storeChange)
  }

  componentDidMount(){
    this.fetchData();

  }
  
  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
  }
  
  fetchData = ()=>{
      fetch('https://api.github.com/search/repositories?q=subject')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch data');
        }
        return response.json();
      })
      .then(data => {const action = {
        type:GITOBJ,
        data}
        store.dispatch(action);})
      .catch(err => {
        console.log(err);
      });
  }
  
  
  render(){
    
  return (
    <div className="App">
      <div style={{margin:'20px'}}>
      <Tooltip title="eg: Binary-Hackers/42_Subjects " placement="le">
                    <Input 
                    placeholder={this.state.inputValue}
                    style={{width:'250px' , marginRight:'10px'}}
                    onChange={this.changeInputValue}
                     />
                     </Tooltip>
                     <Button type='primary' 
                      onClick={this.fetchBtn}
                     > Search </Button>
                     
                </div>
               
                <div className="site-card-wrapper">
                  <Row gutter={16}>
                    <Col span={8}><Card title="Project Name" bordered={false}><a href={this.state.htmlUrl} rel="noreferrer" target="_blank">{this.state.subjectName}</a></Card>
                    </Col>
                    <Col span={8}><Card title="Owner" bordered={false}>{this.state.owner}</Card>
                    </Col>
                    <Col span={8}><Card title="Stargazers Count" bordered={false}>{this.state.stargazersCount}</Card>
                    </Col>
                    <Col span={8}><Card title="Watchers Count" bordered={false}>{this.state.watchersCount}</Card>
                    </Col>
                    <Col span={8}><Card title="Language Used" bordered={false}>{this.state.language}</Card>
                    </Col>
                    <Col span={8}><Card title="Project Description" bordered={false}>{this.state.description}</Card>
                    </Col>
                    </Row>
                </div>
    </div>
  );}

  
  changeInputValue(e){
    const action = {
      type:CHANGEINPUT,
      value:e.target.value
  }
  store.dispatch(action);
  }

  fetchBtn(){
    const action = {
        type:SEARCHSUBJECT     
    }
    store.dispatch(action)  
  }
  storeChange(){
    this.setState(store.getState)

  }



  

}

export default App;
