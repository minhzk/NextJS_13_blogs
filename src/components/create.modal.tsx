'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    showModalCreate: boolean
    isCreate: boolean
    setShowModalCreate: (value: boolean) => void
    blog: IBlog | null
    setBlog: (value: IBlog | null) => void
}

function CreateModal(props: IProps) {
    const {showModalCreate, setShowModalCreate, isCreate, blog, setBlog} = props;

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [content, setContent] = useState<string>("")

    useEffect(() => {
        if(!isCreate && blog && blog.id) {
            setId(blog.id)
            setTitle(blog.title)
            setAuthor(blog.author)
            setContent(blog.content)
        }
    }, [blog])

    const handleSubmit = () => {
        if(!title) {
            toast.error("Please input title")
            return
        }
        if(!author) {
            toast.error("Please input author")
            return
        }
        if(!content) {
            toast.error("Please input content")
            return
        }
        fetch(isCreate ? "http://localhost:8000/blogs" : `http://localhost:8000/blogs/${id}`,
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: isCreate ? "POST": "PUT",
                body: JSON.stringify({title, author, content})
            })
            .then(res => res.json())
            .then(res => {
                if(res) {
                    if(isCreate) {
                        toast.success("Create new blog successfully!")
                    }
                    else {
                        toast.warning("Update blog successfully!")
                    }
                    handleCloseModal()
                    mutate("http://localhost:8000/blogs")
                }
            });
    }

    const handleCloseModal = () => {
        setTitle("")
        setAuthor("")
        setContent("")
        setBlog(null)
        setShowModalCreate(false) 
    }

    return (
        <>
            <Modal 
                show={showModalCreate} 
                onHide={() => handleCloseModal()} 
                backdrop="static" 
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New A Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Please input title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Please author title" 
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control 
                                required
                                as="textarea" 
                                rows={5} 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => handleCloseModal()}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateModal
