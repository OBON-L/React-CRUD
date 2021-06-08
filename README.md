# React-CRUD

### 1. 참조

유튜브 '생활코딩'님의 React 강의를 학습한 후, 

해당 영상에서 배운 내용을 복습하면서 작성한 **CRUD 기능을 사용하여 만든 자기소개 페이지**이다.

참조: [생활코딩 리액트 플레이리스트][youtubelink]

[youtubelink]: https://www.youtube.com/playlist?list=PLuHgQVnccGMCRv6f8H9K5Xwsdyg4sFSdi "Go Youtube"

### 2. Project 소개

* 이름과 나이, 취미에 대한 정보가 이미 들어가 있어 해당 정보들을 읽을 수 있고(Read) 
* 새로운 정보를 추가할 수 있으며(Create) 
* 기존의 정보를 수정하고(Update) 
* 삭제할(Delete) 수도 있다.

### 3. 코드 구성
+ App.js (상위 컴포넌트)
  + AddContent.js (하위 컴포넌트) : 새로운 정보를 추가하기 위한 컴포넌트
  + Control.js : 정보의 추가, 수정, 삭제 버튼을 관리하는 컴포넌트
  + ReadContent.js : 기존의 정보를 읽기 위한 컴포넌트
  + Subject.js : 화면 최상단부에 주제와 소제목을 표시하기 위한 컴포넌트
  + TOC.js : 정보를 표시하기 위한 컴포넌트 (클릭시 정보를 읽을 수 있음)
  + UpdateContent.js : 기존의 정보를 수정하기 위한 컴포넌트

### 4. 복습하며 깨달은 점
```javascript
getReadContent() {
  var data = null;
  data = this.state.contents[this.state.selected_content_id - 1];
  return data;
}
```
위의 코드는 App.js에서 id값을 통해 선택된 content의 정보를 가져오는 내용이다.

강의에서 생활코딩님께서 알려주신 코드와 다르게 내가 생각한 코드로 작성해보았는데, 계속 오류가 발생하였다.

그 이유는 바로 **delete을 통해 content를 삭제했을 경우 contents 배열의 정보가 변경되어 배열 내 위치한 순서가 달라지기 때문**이었다.

수업에서 왜 while문을 돌려서 id값을 비교하시는지 잘 이해하지 못했었는데, 이러한 오류를 거치면서 그 이유를 알게되었다.

그 이유는 바로 **배열 내의 순서 정보가 변경되는 것과 관계 없이 코드를 구성하기 위해서**였다.

아래의 코드는 오류가 발생하는 것을 방지한 코드이다.

```javascript
getReadContent(){
  var i = 0;
  while(i < this.state.contents.length){
    var data = this.state.contents[i];
    if(data.id === this.state.selected_content_id) {
      return data;
    }
      i = i + 1;
  }
}
```

이와 마찬가지로 배열 내의 순서를 고려해야 하는 Control 컴포넌트의 삭제 역시 다음과 같이 코드를 구성해야 한다.

```javascript
var i = 0;
  while(i < this.state.contents.length){
    var _content = this.state.contents[i];
    if(_content.id === this.state.selected_content_id)
      break;
    i++;
  }         
_contents.splice(i, 1);
```

위에서 작성한 getReadContent함수를 호출하지 않고 여기서 while문을 작성하는 이유는

_contents의 내용을 삭제하는 splice함수에서 **i의 값이 필요하기 때문**이다.

이때, **state의 contents 원본을 직접 수정하는 것이 아니라 복사본을 통해 수정해야 한다는 것에 유의**하자

(왜? **성능향상**을 위해!)


### 5. 시작 방법
```
npm start
```
