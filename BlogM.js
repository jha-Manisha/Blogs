import React, { Component } from 'react';
import './index.css';
import SearchSortFilter from './SearchSortFilter';
import Details from './Details';
import Comments from './Comments';

export default class BlogM extends Component {
    constructor() {
        super();
        this.state = {
            blogs: [],
            showModal: false,
            title: '',
            description: '',
            author: '',
            isEditing: false,
            editIndex: null,
            search: '',
            startDate: null,
            endDate: null,
            sortOrder: 'oldest',

        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/blogs')
            .then(response => response.json())
            .then(data => this.setState({ blogs: data }));
    }

    handleAddBlog = (event) => {
        event.preventDefault();
        const { title, description, author } = this.state;
        const blog = { title, description, author, createdDate: new Date() };

        fetch('http://localhost:3001/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(response => response.json())
            .then(data => {
                const newBlogId = data.id;
                return fetch(`http://localhost:3001/blogs/${newBlogId}`);
            })
            .then(response => response.json())
            .then(data => {
                const blogs = [...this.state.blogs, data];
                this.setState({
                    blogs,
                    showModal: false,
                    isEditing: false,
                    editIndex: null,
                    title: '',
                    description: '',
                    author: ''
                });
            })
            .catch(error => console.error(error));
    }


    handleDeleteBlog = (index) => {
        const id = this.state.blogs[index].id;

        fetch(`http://localhost:3001/blogs/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                const blogs = [...this.state.blogs];
                blogs.splice(index, 1);
                this.setState({ blogs });
            })
            .catch(error => console.error(error));
    }


    handleEditBlog = (index) => {
        const blog = this.state.blogs[index];
        this.setState({ showModal: true, isEditing: true, editIndex: index, title: blog.title, description: blog.description, author: blog.author });
    }

    handleUpdateBlog = (event) => {
        event.preventDefault();
        const { title, description, author, editIndex } = this.state;
        const id = this.state.blogs[editIndex].id;
        const updatedBlog = { title, description, author, createdDate: this.state.blogs[editIndex].createdDate };

        fetch(`http://localhost:3001/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBlog)
        })
            .then(response => response.json())
            .then(data => {
                const blogs = [...this.state.blogs];
                blogs[editIndex] = data;
                this.setState({
                    blogs,
                    showModal: false,
                    isEditing: false,
                    editIndex: null,
                    title: '',
                    description: '',
                    author: ''
                });
            })
            .catch(error => console.error(error));
    }


    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    handleHideModal = () => {
        this.setState({ showModal: false, isEditing: false, editIndex: null, title: '', description: '', author: '' });
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }

    handleAuthorChange = (event) => {
        this.setState({ author: event.target.value });
    }

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    }

    handleStartDateChange = (event) => {
        this.setState({ startDate: event.target.value });
    };

    handleEndDateChange = (event) => {
        this.setState({ endDate: event.target.value });
    };

    sortblogs = (blogs, sortOrder) => {
        return blogs.sort((a, b) => {
            const aDate = new Date(a.createdDate).getTime();
            const bDate = new Date(b.createdDate).getTime();
            if (sortOrder === "oldest") {
                return aDate - bDate;
            }
            else {
                return bDate - aDate;
            }
        });
    };

    handleSort = () => {
        const sortedblogs = this.sortblogs(this.state.blogs, this.state.sortOrder);
        this.setState({
            blogs: sortedblogs,
            sortOrder: this.state.sortOrder === "oldest" ? "newest" : "oldest",
        });
    };


    render() {
        const { blogs, showModal, title, description, author, isEditing, search, endDate, startDate } = this.state;

        const searchedBlog = blogs.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });

        let filteredByDatesBlog = searchedBlog.filter((item) => {
            if (!startDate || !endDate) {
                return blogs;
            }
            // console.log(item.createdDate, endDate, startDate)
            return item.createdDate >= new Date(startDate) && item.createdDate <= new Date(endDate);
        })

        return (
            <div>
                <SearchSortFilter
                    search={search}
                    startDate={startDate}
                    endDate={endDate}
                    handleSearchChange={this.handleSearchChange}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleSort={this.handleSort}
                />

                <div>
                    <button className='btn' onClick={this.handleShowModal}>Add Blog</button>
                </div>

                <div className='popup'>
                    <Details
                        title={title}
                        description={description}
                        author={author}
                        showModal={showModal}
                        isEditing={isEditing}
                        handleAddBlog={this.handleAddBlog}
                        handleTitleChange={this.handleTitleChange}
                        handleDescriptionChange={this.handleDescriptionChange}
                        handleAuthorChange={this.handleAuthorChange}
                        handleShowModal={this.handleShowModal}
                        handleHideModal={this.handleHideModal}
                        handleUpdateBlog={this.handleUpdateBlog}
                    />

                </div>

                <div className='blogList'>
                    {filteredByDatesBlog.map((blog, index) => (
                        <div className='blog-box' key={index}>
                            <h3 className='title'>{blog.title}</h3>
                            <p>{blog.description}</p>
                            <h3>By - {blog.author}</h3>
                            <p>Created on - {blog.createdDate.toLocaleString()}</p>

                            <Comments />

                            <button className='btn' onClick={() => this.handleDeleteBlog(index)}>Delete</button>
                            <button className='btn' onClick={() => this.handleEditBlog(index)}>Edit</button>
                        </div>
                    ))
                    }
                </div>


            </div>
        );
    };
}