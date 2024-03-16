"use client";

import { Flex } from "@radix-ui/themes";
import "../globals.css";

import FolderSection from "./components/Folder/folder";
import FilesSection from "./components/Files/filesComp";

export default function Files() {
    return (
        <>
            <Flex direction="column">
                <FolderSection />

                <hr style={{ marginTop: 80 }} />

                <FilesSection />
            </Flex>
        </>
    );
}
