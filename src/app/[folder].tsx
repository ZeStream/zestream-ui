// pages/files/[folder].tsx

import { useRouter } from "next/router";

const FolderPage = () => {
    const router = useRouter();
    const { folder } = router.query;

    return (
        <div>
            <h1>Files inside folder: {folder}</h1>;
        </div>
    );
};
export default FolderPage;
