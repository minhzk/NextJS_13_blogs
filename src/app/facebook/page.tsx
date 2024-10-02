'use client'
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap';
const Facebook = () => {
    const router = useRouter()
    const hadnleBtn = () => {
        router.push("/")
    }
    
    return (
        <>
            Facebook 
            <div>
                <Button variant='primary'>Minh Nguyen</Button>
                <button onClick={() => hadnleBtn()}>Back home</button>
            </div>
        </>
    )
}

export default Facebook;