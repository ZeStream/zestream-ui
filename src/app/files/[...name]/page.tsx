// components/HelloWorld.tsx
"use client";
import React from "react";
import FilesSection from "../components/Files/filesComp";
import FolderSection from "../components/Folder/folder";
import { Flex } from "@radix-ui/themes";

const HelloWorld: React.FC = () => {
    return (
        <div>
            <Flex direction="column">
                <FolderSection />

                <hr style={{ marginTop: 80 }} />

                <FilesSection />
            </Flex>
        </div>
    );
};

export default HelloWorld;
