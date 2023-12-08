// layouts
import Main from "@/layouts/Main"

export default function FilesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <Main>{children}</Main>
}