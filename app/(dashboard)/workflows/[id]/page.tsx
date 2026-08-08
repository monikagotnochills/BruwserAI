import { notFound } from "next/navigation"

type PageProps = {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
    const { id } = await params

    notFound()

    return <div>{id}</div>
}
