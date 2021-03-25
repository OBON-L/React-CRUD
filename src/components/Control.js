import { Component } from "react";

class Control extends Component {
    render() {
        console.log('Conrtrol render');
        return(
            //SY: add, update, delete에 따라 mode가 변경될 수 있도록 함
            <ul>
                <li>
                    <a href="/add" onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('add');
                    }.bind(this)}>add</a>
                </li>

                <li>
                    <a href="/update" onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('update');
                    }.bind(this)}>update</a>
                </li>

                <li>
                    <a href="/delete" onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('delete');
                    }.bind(this)}>delete</a>
                </li>
            </ul>
        )
    }
}

export default Control;