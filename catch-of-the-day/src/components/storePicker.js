import React from 'react'
import {getFunName} from '../helpers'

class StorePicker extends React.Component{
  // one way to bind THIS to the class StorePicker
  // constructor(){
  //   super();
  //   this.goToStore = this.goToStore.bind(this;)
  // }
  goToStore(e){
    e.preventDefault();
    console.log('you changed the url');
    // first grab text from the box
    const storeId = this.storeInput.value
    console.log(`going to ${storeId}`);
    // second transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }
  // OR bind THIS on the onSubmit event
  // OR onSubmit={(e)=> this.goToStore(e)} pass as an arrow function with event argument
  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        {/*JSX Comment*/}
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input)=>{this.storeInput = input}}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
