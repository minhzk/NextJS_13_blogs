
export const metadata = {
  title: 'Blog Lists',
  description: 'Generated by Minh SEN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        {children}
    </>
  )
}
