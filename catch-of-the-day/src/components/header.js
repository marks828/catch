import React from 'react'

// class Header extends Component{
//   render(){
// Stateless function (not using other methods inside component. just rendering html. no need for class and render. Still export Header)
const Header = (props)=>{
    return(
      <header className="top">
        <h1>
          Catch
            <span className="ofThe">
              <span className="of">Of</span>
              <span className="the">The</span>
            </span>
          Day
        </h1>
        <h3 className="tagline"><span>{props.tagline}</span></h3>
      </header>
    )
}

Header.propTypes = {
  tagline: React.PropTypes.string
}
//   }
// }

export default Header;
