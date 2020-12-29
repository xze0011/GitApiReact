import {CHANGEINPUT,SEARCHSUBJECT,GITOBJ} from './actionType';

const defaultState={
     inputValue:"Input the full_name to search",
     gitData:{},
     subjectName:'',
     owner:'',
     stargazersCount:'',
     watchersCount:'',
     htmlUrl:'',
     language:'',
     description:"",
 };

 export default (state=defaultState,action)=>{
    switch (action.type) {
    case CHANGEINPUT: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    case GITOBJ: {
        let newState = JSON.parse(JSON.stringify(state))
        newState.gitData = Object.assign({},action.data)
        return newState
    }
    case SEARCHSUBJECT: {
        let newState = JSON.parse(JSON.stringify(state))
        let flag = false;
        for(let i=0; i<newState.gitData.items.length;i++)
        {
            if(newState.gitData.items[i].full_name === newState.inputValue){
                newState.subjectName = newState.gitData.items[i].name;
                newState.owner = newState.gitData.items[i].owner.login;
                newState.stargazersCount = newState.gitData.items[i].stargazers_count;
                newState.watchersCount = newState.gitData.items[i].watchers_count;
                newState.htmlUrl = newState.gitData.items[i].html_url;
                newState.language = newState.gitData.items[i].language;
                newState.description = newState.gitData.items[i].description;
                flag = true;
            }           
        } 
        if(!flag){
            alert('Cannot find the right information')
        }
        
        newState.inputValue = '';
        
        return newState
    }
    default:
        return state;
    }
}