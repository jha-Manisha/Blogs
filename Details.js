import React, { Component }  from 'react';
import './index.css';


export default class Details extends Component {
    render() {
        const { showModal, title, description, author, handleTitleChange,isEditing ,
            handleDescriptionChange, handleAuthorChange, handleAddBlog, handleHideModal, handleUpdateBlog} = this.props;
        return (<div>
            <div className='popup'>
                 {showModal &&
                        <div className={`blog-popup ${this.props.showPopup ? "show" : ""}`}>
                             <form onSubmit={isEditing ? handleUpdateBlog : handleAddBlog}>
                                <label>
                                    Title: <input type="text" value={title} onChange={handleTitleChange} />
                                </label>
                                <br />
                                <label>
                                    Description: <textarea value={description} onChange={handleDescriptionChange} />
                                </label>
                                <br />
                                <label>
                                    Author: <input type="text" value={author} onChange={handleAuthorChange} />
                                </label>
                                <br />
                                 <button className='btn' type="submit">{isEditing ? 'Save' : 'Add'}</button>
                                <button className='btn' type="button" onClick={handleHideModal}>Cancel</button>
                            </form>
                        </div>
                    }
                   
            </div>
            </div>
        );
    }
}

