"use client";

import { Box } from "@radix-ui/themes";
import "./FileSidebar.css";
import { CopyIcon } from "@radix-ui/react-icons";
import { MouseEvent } from "react";
interface FileSidebarProps {
    name: string;
    size: number;
    type: string;
    lastmodified: number;
}

function FileSidebar(props: FileSidebarProps) {
    const handleCopyClick = (e: MouseEvent<SVGSVGElement>) => {
        const target = e.target as HTMLElement;
        const parentContainer = target.closest(".detailboxCopy");
        if (parentContainer) {
            const textToCopy =
                parentContainer.querySelector("p")?.textContent || "";
            if (textToCopy) {
                navigator.clipboard
                    .writeText(textToCopy)
                    .catch(() => console.error("Failed to copy!"));
            }
        }
    };

    return (
        <>
            <Box className="filesidebar">
                <Box className="filesidebarDetails">
                    <h2 className="fileTitle">File Details</h2>
                    <Box className="detailboxes seconddbox" height="9">
                        <p>File Path</p>
                        <div className="detailboxCopy">
                            <p>
                                /{" "}
                                {props.name?.length > 34
                                    ? `${props.name.substring(0, 34)}...`
                                    : props.name}
                            </p>
                            <CopyIcon
                                className="copyicon"
                                onClick={handleCopyClick}
                            />
                        </div>{" "}
                    </Box>
                    <Box className="detailboxes seconddbox" height="9">
                        <p>File Name</p>
                        <div className="detailboxCopy">
                            <p>
                                {props.name?.length > 34
                                    ? `${props.name.substring(0, 34)}...`
                                    : props.name}
                            </p>
                            <CopyIcon
                                className="copyicon"
                                onClick={handleCopyClick}
                            />
                        </div>{" "}
                    </Box>
                    <Box className="detailboxes thirddbox" height="9">
                        <p>File URL</p>
                        <div className="detailboxCopy">
                            <p>
                                backendurl/
                                {props.name?.length > 9
                                    ? `${props.name.substring(0, 9)}...`
                                    : props.name}
                            </p>
                            <CopyIcon
                                className="copyicon"
                                onClick={handleCopyClick}
                            />
                        </div>
                    </Box>
                    <Box className="detailboxes fourthdbox" height="9">
                        <p>File Size</p>
                        <div className="detailboxCopy">
                            <p>{props.size}kb</p>
                        </div>
                    </Box>
                    <Box className="detailboxes fifthdbox" height="9">
                        <p>MIME Type</p>
                        <div className="detailboxCopy">
                            <p>{props.type}</p>
                        </div>
                    </Box>
                    <Box className="detailboxes sixthdbox" height="9">
                        <p>Last Modified</p>
                        <div className="detailboxCopy">
                            <p>
                                {new Date(props.lastmodified).toLocaleString()}
                            </p>
                        </div>
                    </Box>
                    <Box className="detailboxes seventhdbox" height="9">
                        <p>Permissions</p>
                        <div className="detailboxCopy">
                            <p>Public</p>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default FileSidebar;
