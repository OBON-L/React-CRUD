import { Component } from "react";

class AddContent extends Component {
    render() {
        console.log('CreateContent render');
        return(
            <article>
                <h2>Add Content</h2>
                <form action="/create_process" method="post"
                    //SY: submit 버튼을 누르면 자동으로 실행됨
                    onSubmit={function(e){
                        e.preventDefault();
                        //SY: e.target은 form 태그를 의미, title과 desc는 input태그와 textarea 태그의 name을 의미
                        this.props.onSubmit(e.target.title.value, e.target.desc.value);
                    }.bind(this)}
                >
                    {/* SY: 제목 입력 란 */}
                    <p>
                        <input type="text" name="title" placeholder="write title here"></input>
                    </p>
                    {/* SY: 설명 입력 란 */}
                    <p>
                        <textarea name="desc" placeholder="write description here"></textarea>
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

export default AddContent;