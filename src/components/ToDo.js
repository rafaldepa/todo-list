import React, { Component } from 'react';

class ToDo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draft: '',
            recentlyAdded: false,
            error: null,
            tab: 'list',
            tasks: (props.tasks.length > 0) ? Array.from(JSON.parse(props.tasks)) : ['Create a new react-app', 'Create first commit', 'Push all changes into master'],
            archive: (props.archive.length > 0) ? Array.from(JSON.parse(props.archive)) : ['Register at Github'],
        }
    }

    randomPlaceholder = () => {
        const placeholder = [
            'Watch Game of Thrones',
            'Go for a walk',
            'Meet the boss',
            'Commit changes and push it',
            'Clear cookies and localstorage',
            'Call John Snow'
        ];
        return placeholder[Math.floor(Math.random() * placeholder.length)];
    }

    // Show list of the tasks
    showTasks = (tasks, type) => {
        if(tasks && tasks.length > 0) {
            return(tasks.map((item, key) =>            
                <li className="todo__list__item" key={key}>
                    <div className="todo__list__item__value">{item}</div>
                    <div className="todo__list__item__action">
                        {type === 'archive'
                            ? <button title="Archive" className="todo__list__item__button" onClick={e => this.archiveTasks({key})}><img src="/images/archive.svg" alt="" /></button>
                            : <button title="Delete" className="todo__list__item__button" onClick={e => this.removeTasks({key})}><img src="/images/delete.svg" alt="" /></button>
                        }
                    </div>
                </li> 
            ));
        } else {
            return <li className="todo__list__item" key={0}><div className="todo__list__item__value todo__list__item__value--empty">There are no tasks.</div></li> 
        }        
    }

    // Add new task
    updateTasks = () => {
        let { draft, tasks, recentlyAdded } = this.state;
        if(draft !== '' && draft.trim().length > 3) {
            tasks.push(draft);
            this.setState({ draft: '', tasks: tasks, recentlyAdded: true });
        } else if (recentlyAdded === false) {
            this.setState({ error: 'The task should contain at least 4 letters.' });
        } else {
            this.setState({ recentlyAdded: false })
        }
    }

    // Add task to Archive
    archiveTasks = (id) => {
        let { tasks, archive } = this.state;
        archive.push(tasks[id.key]);
        tasks.splice(id.key, 1);
        return this.setState({ tasks: tasks, archive: archive });
    }

    // Remove task from Archive permanently
    removeTasks = (id) => {
        let { archive } = this.state;
        archive.splice(id.key, 1);
        return this.setState({ archive: archive });
    }

    // Save all tasks & archive in localStorage
    saveInLocalStorage = () => {
        localStorage.setItem('todo_tasks', JSON.stringify(this.state.tasks));
        localStorage.setItem('todo_archive', JSON.stringify(this.state.archive));
    }

    // Reset storage, and set defaults
    resetStorage = () => {
        localStorage.clear();
        this.setState({
            draft: '',
            recentlyAdded: false,
            error: null,
            tasks: ['Create a new react-app', 'Create first commit', 'Push all changes into master'],
            archive: ['Register at Github'],
        })
    }

    render() {
        this.saveInLocalStorage();
        return(
            <div className="todo">
                <form className="todo__add form" onSubmit={e => e.preventDefault()}>
                    <input 
                        type="text" 
                        className="form__input" 
                        value={this.state.draft} 
                        placeholder={this.randomPlaceholder()}                        
                        onChange={e => this.setState({ draft: e.target.value, error: null })}    
                        onKeyPress={e => {(e.key === 'Enter') && this.updateTasks()}}                    
                    />
                    <button className="form__button form__button--plus" onClick={() => this.updateTasks()}></button>
                    {this.state.error && <div className="todo__add__error">{this.state.error}</div>}
                </form>                
                {this.state.tab === 'list'
                    ?   <div className="todo__tabs">
                            <button className="todo__tabs__tab todo__tabs__tab--active" onClick={e => this.setState({ tab: 'list' })}>To-do list</button>
                            <button className="todo__tabs__tab" onClick={e => this.setState({ tab: 'archive' })}>Archived tasks</button>
                            <button className="todo__tabs__tab" onClick={e => this.resetStorage()}>Sample data</button>
                        </div>
                    :   <div className="todo__tabs">
                            <button className="todo__tabs__tab" onClick={e => this.setState({ tab: 'list' })}>To-do list</button>
                            <button className="todo__tabs__tab todo__tabs__tab--active" onClick={e => this.setState({ tab: 'archive' })}>Archived tasks</button>
                            <button className="todo__tabs__tab" onClick={e => this.resetStorage()}>Sample data</button>
                        </div>                
                }
                <ul className="todo__list">
                    {this.state.tab === 'list'
                        ? this.showTasks(this.state.tasks, 'archive')
                        : this.showTasks(this.state.archive, 'remove')
                    }                    
                </ul>               
            </div>            
        );
    }

    
}

export default ToDo;