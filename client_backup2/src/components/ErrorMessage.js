import React, { Component } from 'react';

class ErrorMessage extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <div>
                <i class="fa fa-times-circle ct-red fa-3x" style={{marginBottom:"30px"}}></i>
                <h2 className="ct-red">{this.props.message}</h2>
                <h4>{this.props.sousMessage}</h4>
            </div>
            </>
         );
    }
}
 
export default ErrorMessage;