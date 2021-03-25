import { Component } from "react";

class ReadContent extends Component{
    render(){
        console.log('ReadContent render');
        return(
            //SY: return 안에서는 하나의 태그 안에 다른 문장들이 존재해야 함
            <article>
                <h3>{this.props.title}</h3>
                {this.props.desc}
            </article>
        );
    }
}

export default ReadContent;