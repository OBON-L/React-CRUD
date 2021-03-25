import { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import AddContent from "./components/AddContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    //SY: 부모 클래스의 생성자 호출(생략하면 안 됨)
    super(props);
    //SY: state.contents 배열의 id값 중 가장 큰 값으로 설정하여 state.contents 정보를 추가할 때 id 값으로 사용
    this.max_content_id = 3;

    this.state = {
      //SY: mode는 총 welcome, read, create, update가 있을 것이며 각각의 mode에 따라 화면 구성이 다름
      mode: 'welcome',
      //SY: read, delete을 할 때 state.contents 중 선택된 값을 읽고 삭제하기 위한 변수 
      selected_content_id: null,
      //SY: 어떤 모드에도 화면 제일 상단에 나타날 문구
      subject: { title: 'Self Introduce', sub: 'Let me introduce myself!' },
      //SY: welcome 모드일 경우 화면 제일 하단에 나타날 문구
      welcome: { title: 'How To Use?', desc: 'Click each of the buttons you want' },
      //SY: 화면 중간부 TOC 컴포넌트에 title만 나타날 예정, desc는 read mode일 경우 화면 하단부에 나타날 예정
      contents: [
        { id: 1, title: 'Name', desc: 'SY' },
        { id: 2, title: 'Age', desc: '25' },
        { id: 3, title: 'Hobby', desc: 'Reading Books' }
      ]
    }
  }

  //SY: contents 객체 중 선택된 객체를 가져오기 위한 함수
  getReadContent(){
    console.log('===>getReadContent 함수 실행');
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article = null;

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }

    else if(this.state.mode === 'read'){
      //SY: 선택된 id를 가지는 객체의 title 값과 desc 값을 화면에 표시
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }

    else if(this.state.mode === 'add'){
      _article = <AddContent onSubmit={function(_title, _desc){
      this.max_content_id++;
      //SY: 원본을 직접 변경하지 않고, 복사본을 통해 변경함
      var _contents = this.state.contents.concat(
        {id:this.max_content_id, title:_title, desc:_desc}
      );
      //SY: 추가한 정보를 바로 확인할 수 있게 mode를 read로 변경함
      this.setState({
        contents: _contents,
        mode: 'read',
        selected_content_id: this.max_content_id
      });
      }.bind(this)}></AddContent>
    }

    else if(this.state.mode === 'update'){
      //SY: 수정할 항목의 아이디 값을 확인
      _content = this.getReadContent();
      _article = <UpdateContent content={_content} onSubmit={function(_id, _title, _desc){
        //SY: 원본을 수정하지 않고 복사본을 수정하기 위함 
        var _contents = Array.from(this.state.contents);
        //SY: id값이 일치하는 contents의 객체를 찾아내면 title과 desc를 변경
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            //SY: 원본을 직접 수정하는 것이 아니라 복사본을 수정함
            _contents[i].title=_title;
            _contents[i].desc=_desc;
          }
          i++;
        }

        this.setState({
          mode: 'read',
          contents: _contents
        });
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }

  render() {
    console.log('App.render');
    return (
      <div className="App">
        <Subject 
          //SY: 화면 제일 상단부에 나타날 title과 sub 정보 전달(이 정보는 mode에 따라 변하지 않음)
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          //SY: state 정보 변경은 App.js에처 처리, 여기서는 모드 변경(화면 하단 정보 변경을 위해)
          onChangePage={function(){
            //SY: mode 변경
            this.setState({mode:'welcome'});
          }.bind(this)}
        ></Subject>

        {/* SY: Title Of Contents, 즉 read mode에서 읽히는 항목을 의미(예-이름, 나이 등) */}
        <TOC
          onChangePage={function(id){
            this.setState({
              mode: 'read',
              //SY: (화면에 표시할) 선택된 값을 위한 변수
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>

        {/* SY: 정보 수정, 추가, 삭제 기능 구현 */}
        <Control
          onChangeMode={function(_mode){
            //SY: delete는 article의 내용을 수정하는 것이 아니라 단순 삭제이기 때문에 여기서 처리
            if(_mode === 'delete') {
              if(window.confirm('really?')){
                var _contents = Array.from(this.state.contents);
                
                //SY: 삭제할 정보가 배열에서 몇번째에 위치해 있는지 파악(이 정보는 데이터 삭제에 따라 가변적이기에 getReadContent함수를 호출하면 안 됨)
                var i = 0;
                while(i < this.state.contents.length){
                  var _content = this.state.contents[i];
                  if(_content.id === this.state.selected_content_id)
                    break;
                  i++;
                }
                //SY: 원본을 직접 수정하지 않고 복사본을 수정
                _contents.splice(i, 1);

                this.setState({
                  contents: _contents,
                  mode: 'welcome',
                  selected_content_id: null
                })
                alert('deleted');
              }
              else
                alert('cancelled');
            }
            else {
              this.setState({mode:_mode});
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }

}

export default App;