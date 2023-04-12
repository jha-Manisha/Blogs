import { Component } from 'react';

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            showModal: false,
            editIndex: null,
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleMessageChange = (event) => {
        this.setState({ message: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, message, editIndex } = this.state;
        const comment = { name, message, createdDate: new Date() };
        if (editIndex !== null) {
            this.props.onEditComment(editIndex, comment);
            this.setState({ name: '', message: '', showModal: false, editIndex: null });
        } else {
            this.props.onAddComment(comment);
            this.setState({ name: '', message: '', showModal: false });
        }
    };

    handleShowModal = (index = null) => {
        const { comments } = this.props;
        if (index !== null) {
            const comment = comments[index];
            this.setState({
                name: comment.name,
                message: comment.message,
                editIndex: index,
                showModal: true,
            });
        } else {
            this.setState({ showModal: true });
        }
    };

    handleHideModal = () => {
        this.setState({ showModal: false, name: '', message: '', editIndex: null });
    };

    handleEditComment = (index ) => {
        this.handleShowModal(index );
    };

    handleDeleteComment = (index) => {
        this.props.onDeleteComment(index);
    };

    render() {
        const { comments } = this.props;
        const { name, message, showModal, editIndex } = this.state;

        return (
            <div>
                <div className="comments">
                    <button className="btn" onClick={() => this.handleShowModal()}>
                        Add Comment
                    </button>
                    <div>
                        <div>
                            {showModal && (
                                <div className={`blog-popup ${this.state.showPopup ? 'show' : ''}`}>
                                    <form onSubmit={this.handleSubmit}>
                                        <label>
                                            Name:
                                            <input value={name} onChange={this.handleNameChange} />
                                        </label>
                                        <br />
                                        <label>
                                            Comment:
                                            <input value={message} onChange={this.handleMessageChange} />
                                        </label>
                                        <br />
                                        <button className="btn" type="submit">
                                            {editIndex !== null ? 'Save' : 'Add'}
                                        </button>
                                        <button className="btn" type="button" onClick={this.handleHideModal}>
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                        <div>
                            {editIndex !== null && (
                                <div className={`blog-popup ${showModal ? "show" : ""}`}>
                                    <form onSubmit={this.handleEditComment}>
                                        <label>
                                            Name:
                                            <input value={name} onChange={this.handleNameChange} />
                                        </label>
                                        <br />
                                        <label>
                                            Comment:
                                            <input value={message} onChange={this.handleMessageChange} />
                                        </label>
                                        <br />
                                        <button className="btn" type="submit" onClick={this.handleSubmit}>
                                            Save
                                        </button>
                                        <button className="btn" type="button" onClick={this.handleHideModal}>
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        <div>
                            {comments.map((comment, index) => (

                                <div className="commentPopup" key={index}>
                                    <div>
                                        <h5>By-{comment.name}</h5>
                                    </div>
                                    <div>
                                        <h5>{comment.message}</h5>
                                    </div>
                                    <div>
                                        <h5>{comment.createdDate.toLocaleString()}</h5>
                                    </div>
                                    <div className="comment-actions">
                                        <button className="btn" onClick={() => this.handleEditComment(index)}>
                                            Edit
                                        </button>
                                        <button className="btn" onClick={() => this.handleDeleteComment(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}          