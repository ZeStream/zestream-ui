// layouts
import Main from "@/layouts/Main";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Main>{children}</Main>;
}
