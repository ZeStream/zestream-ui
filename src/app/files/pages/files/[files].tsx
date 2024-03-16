// [files].tsx

import { useRouter } from "next/router";

export default function FolderContentPage() {
    const router = useRouter();
    const { files } = router.query; // Assuming `files` is your dynamic parameter

    return (
        <div>
            <h1>Folder: {files}</h1>
            {/* Fetch and render folder content based on `files` parameter */}
        </div>
    );
}
