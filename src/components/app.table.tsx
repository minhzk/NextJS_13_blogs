import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import CreateModal from './create.modal';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from "swr"


interface IProps {
    blogs: IBlog[]
}

function AppTable(props: IProps) {
    const {blogs} = props;

    const [blog, setBlog] = useState<IBlog | null>(null)
    
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
    const [isCreate, setIsCreate] = useState<boolean>(true)

    const handleClickAddBlog = () => {
      setIsCreate(true)
      setShowModalCreate(true)
    }

    const handleClickUpdateBlog = (item: any) => {
      setIsCreate(false)
      setShowModalCreate(true)
      setBlog(item)
    }

    const handleDeleteBlog = (item: any) => {
      if (confirm(`Are you sure you want to delete blog: ${item.title}`) == true) {
        fetch(`http://localhost:8000/blogs/${item.id}`,
          {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "DELETE",
          })
          .then(res => res.json())
          .then(res => {
              if(res) {
                  toast.success("Delete blog successfully!")
                  mutate("http://localhost:8000/blogs")
              }
              else {
                toast.error("Delete blog failed!")
              }
          });
      }
    }
    
    return (
        <>
        <div className='my-3 flex justify-between'>
          <h3>Table Blogs</h3>
          <Button 
            variant='secondary' 
            onClick={() => handleClickAddBlog()}

          >Add New</Button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {blogs?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td className='flex gap-3'>
                      <Button>
                        <Link href={`/blogs/${item.id}`} className='text-white no-underline'>View</Link>
                      </Button>
                      <Button 
                        variant='warning'
                        onClick={() => handleClickUpdateBlog(item)}
                      >
                        Edit</Button>
                      <Button variant='danger'
                      onClick={() => handleDeleteBlog(item)}
                      >Delete</Button>
                    </td>
                </tr>
                )
              })}
            </tbody>
        </Table>
        <CreateModal
          showModalCreate={showModalCreate}
          setShowModalCreate={setShowModalCreate}
          isCreate={isCreate}
          blog={blog}
          setBlog={setBlog}
        />
        </>
    )
}

export default AppTable
