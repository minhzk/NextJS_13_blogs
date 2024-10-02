import type { Metadata } from 'next'
import Link from 'next/link';
// import '@/styles/app.css'

export const metadata: Metadata = {
    title: 'Homepage',
    description: 'Description',
  }

export default function Home() {

    return (
        <div>
            <ul>
                <li>
                    <Link className="text-red-500" href={'/facebook'}>
                        Facebook
                    </Link>
                </li>
              
                <li>
                    <Link href={'/youtube'}>Youtube</Link>
                </li>

                <li>
                    <Link href={'/tiktok'}>Tiktok</Link>
                </li>
            </ul>
            
        </div>
    );
}
