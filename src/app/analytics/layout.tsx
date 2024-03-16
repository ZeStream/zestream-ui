// layouts
import Main from "@/layouts/Main";

export default function analyticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Main>{children}</Main>;
}
