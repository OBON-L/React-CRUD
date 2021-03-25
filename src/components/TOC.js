import { Component } from "react";

class TOC extends Component{
    render(){
        console.log('TOC render');

        //SY: 빈 리스트를 생성하여 state의 contents 정보를 담음
        var lists = [];
        var data = this.props.data;
        
        var i = 0;
        while(i < data.length){
            lists.push(
                //SY: li를 하나씩 만들어서 title값이 화면에 나타나게 함, props.onChangePage함수를 호출하여 1)mode 변경, 2)selected_content_id 값 변경 하고자 함
                <li key={data[i].id}>
                    <a
                        href={"/content/"+data[i].id}
                        onClick={function(id, e){
                            e.preventDefault();
                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}
                    >{data[i].title}</a>
                </li>
            );
            i++;
        }

        return(
            <nav>
                <ol>
                    {lists}
                </ol>
            </nav>
        )
    }
}

export default TOC;