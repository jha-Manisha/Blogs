import { Component } from 'react';
import Comment from './Comment';
import './index.css';

export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
        }
    }

    handleAddComment = (comment) => {
        const comments = [...this.state.comments, comment];
        this.setState({ comments });
    };

    handleDeleteComment = (index) => {
        const comments = [...this.state.comments];
        comments.splice(index, 1);
        this.setState({ comments: comments });
    };

    handleEditComment = (index, updatedComment) => {
        const comments = [...this.state.comments];
        comments[index] = updatedComment;
        this.setState({ comments: comments });
    };

    render(){
        const {comments} = this.state;
        return(
            <div>
             <Comment
             onAddComment={this.handleAddComment}
             onDeleteComment={this.handleDeleteComment}
             onEditComment={this.handleEditComment}
             comments={comments}
             />

            </div>
        )
    }
}