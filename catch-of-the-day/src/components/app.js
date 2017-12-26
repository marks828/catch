import React from 'react'
import Header from './header'
import Order from './order'
import Inventory from './inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component{
  constructor(){
    super();
    // initial state
    this.addFish = this.addFish.bind(this)
    this.removeFish = this.removeFish.bind(this)
    this.updateFish = this.updateFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
    this.removeOrder = this.removeOrder.bind(this)

    // get initial state
    this.state = {
      fishes: {},
      order: {},
    }
  }

  componentWillMount(){
    // runs right before app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    })

    // check if there is any local storage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if(localStorageRef){
      // update app component order state
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish(fish){
    // update our state
    const fishes = {...this.state.fishes}
    // add in new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish
    // set state
    this.setState({fishes})
    // can also say this.setState({fishes: fishes})
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key){
    const fishes = {...this.state.fishes}
    fishes[key] = null
    this.setState({ fishes })
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key){
    // take copy of state
    const order = {...this.state.order}
    // update or add new number of fish ordered
    order[key] = order[key]+ 1 || 1
    // update state
    this.setState({ order })
  }

  removeOrder(key){
    const order = {...this.state.order}
    delete order[key]
    this.setState({ order })
  }


  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeOrder={this.removeOrder}
        />
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}


export default App;
