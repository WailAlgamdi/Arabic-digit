import React, {Component} from 'react';

class Child extends Component{
    render(){

        return (
            <div>
                <h1>
                    I'm Child Component
                </h1>
                <h2>
                    Hello {this.props.name}
                </h2>
                
            </div>
        )
    }
}

export default Child;