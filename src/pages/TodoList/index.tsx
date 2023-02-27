import React from "react"

class TodoList extends React.PureComponent {
    state = {
        list: [
            {
                text: '123',
                editing: false
            },
            {
                text: '456',
                editing: false
            },
            {
                text: '789',
                editing: false
            },
        ]
    }

    edit = () => {

    }

    render(): React.ReactNode {
        const { list } = this.state;
        return <div>
            {
                list.map((item, index) => (
                    <div key={index}>
                        {
                            item.editing ?  <input value={item.text} />: item.text
                        }
                        <button onClick={this.edit}>编辑</button>
                    </div>
                ))
            }
        </div>
    }
}

export default TodoList;