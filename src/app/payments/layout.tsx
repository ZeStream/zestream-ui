// layouts
import Main from "@/layouts/Main";

export default function paymentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Main>{children}</Main>;
}
