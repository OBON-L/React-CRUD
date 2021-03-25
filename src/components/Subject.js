import { Component } from "react";

class Subject extends Component {
    render() {
        console.log('Subject render');
        return(
            <header>
                <h1>
                    <a href="\" onClick={function(e){
                        // SY: 링크 클릭시 페이지 바뀌는 것을 막기 위함
                        e.preventDefault();
                        this.props.onChangePage();
                    }.bind(this)}>{this.props.title}</a>
                </h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;