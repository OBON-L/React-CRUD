import { Component } from "react";

class UpdateContent extends Component {
    constructor(props){
        super(props);
        //SY: 값 수정을 위해 state화 시켜줌
        this.state = {
            id: this.props.content.id,
            title: this.props.content.title,
            desc: this.props.content.desc
        }
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    inputFormHandler(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        console.log('UpdateContent render');
        return(
            <article>
                <h2>Update Content</h2>
                <form action="/update_process" method="post"
                    //SY: submit 버튼을 누르면 자동으로 실행됨
                    onSubmit={function(e){
                        e.preventDefault();
                        //SY: e.target은 form 태그를 의미, title과 desc는 input태그와 textarea 태그의 name을 의미
                        this.props.onSubmit(this.state.id, this.state.title, this.state.desc);
                    }.bind(this)}>

                    <input type="hidden" name="id" value={this.state.id}></input>
                    
                    {/* SY: 제목 입력 란, 값 변경시 변경된 값을 state에 반영해주기 위해 onChange 이벤트를 걸어 놓는다. */}
                    <p>
                        <input type="text" name="title" placeholder="write title here" value={this.state.title}
                        onChange={this.inputFormHandler}></input>
                    </p>
                    {/* SY: 설명 입력 란 */}
                    <p>
                        <textarea name="desc" placeholder="write description here" value={this.state.desc}
                        onChange={this.inputFormHandler}></textarea>
                    </p>
                    {/* SY: 제출 버튼 */}
                    <p>
                        <input type="submit" value="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;