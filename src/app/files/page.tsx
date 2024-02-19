"use client";

import { Flex } from "@radix-ui/themes";
import "../globals.css";

import Folders from "./components/Folder/folder";
import FilesSection from "./components/Files/filesComp";

export default function Files() {
    return (
        <>
            <Flex direction="column">
                <Folders />

                <hr style={{ marginTop: 80 }} />

                <FilesSection />
            </Flex>
        </>
    );
}
