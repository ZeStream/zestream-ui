"use client";

import dynamic from "next/dynamic";
const Audio = dynamic(() => import("@/app/svg/FilesSVG/Audio"), { ssr: false });
const ImageIcon = dynamic(() => import("@/app/svg/FilesSVG/Image"), {
    ssr: false,
});
const Video = dynamic(() => import("@/app/svg/FilesSVG/Video"), { ssr: false });
const FileSvg = dynamic(() => import("@/app/svg/FilesSVG/File"), {
    ssr: false,
});
import { Box, Button } from "@radix-ui/themes";
import { UploadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import "./files.css";
import FileSidebar from "./fileSidebar/FileSidebar";

export default function FilesSection() {
    const [createdFiles, setCreatedFiles] = useState<File[]>([]);
    const [checkedFiles, setCheckedFiles] = useState<boolean[]>([]);
    const [deleteType, setDeleteType] = useState("");
    const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const handleFilesCheckboxChange = (index: number) => {
        const newCheckedFiles = [...checkedFiles];
        newCheckedFiles[index] = !newCheckedFiles[index];
        setCheckedFiles(newCheckedFiles);
    };

    const handleDeleteFilesButtonClick = () => {
        if (checkedFiles.some((isChecked) => isChecked)) {
            setDeleteType("files");

            setDeleteDialogOpen(true);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || !files.length) {
            alert("No files present");
            return;
        }

        const newFiles: Promise<File>[] = Array.from(files).map((file) => {
            // Read the content of the file
            return new Promise<File>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const content = reader.result as ArrayBuffer;
                    resolve(
                        new File([content], file.name, { type: file.type })
                    );
                };
                reader.readAsArrayBuffer(file);
            });
        });

        Promise.all(newFiles).then((resolvedFiles) => {
            // Use the resolved files to update state
            const updatedFiles = [...createdFiles, ...resolvedFiles];
            console.log("Updated Files:", updatedFiles);

            // Set the updated files to state
            setCreatedFiles((prevFiles) => [...prevFiles, ...resolvedFiles]);
        });
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("createdFiles", JSON.stringify(createdFiles));
            console.log("State in useEffect:", createdFiles);
        }
    }, [createdFiles]);

    const handleFileInput = () => {
        const fileInput = document.getElementById(
            "fileInput"
        ) as HTMLInputElement;
        fileInput?.click();
    };
    const handleDeleteConfirm = (type: string) => {
        if (type === "files") {
            const newFiles = createdFiles.filter(
                (_, index) => !checkedFiles[index]
            );
            setCreatedFiles(newFiles);
            setCheckedFiles(Array(newFiles.length).fill(false));
        }

        setDeleteDialogOpen(false);
    };

    const handleDeleteCancel = (deleteType: string) => {
        setDeleteDialogOpen(false);
    };

    const handleFileDoubleClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            {" "}
            <div className="fileBox-title" style={{ display: "flex" }}>
                <h3 style={{ margin: 10 }}>Files</h3>

                <div
                    className="fileBox-title-operations"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                        accept="audio/*,video/*,image/*"
                    />
                    <Button
                        variant="solid"
                        style={{
                            cursor: "pointer",
                            marginTop: 22,
                            marginRight: 14,
                        }}
                        onClick={handleFileInput}
                    >
                        <UploadIcon /> Upload
                    </Button>
                    <Button
                        style={{
                            cursor: "pointer",
                            marginTop: 22,
                            marginRight: 14,
                        }}
                        onClick={handleDeleteFilesButtonClick}
                    >
                        <TrashIcon />
                    </Button>
                </div>
            </div>
            {/* upload button  */}
            <Box
                className="files"
                style={{
                    height: 210,
                    display: "flex",
                    flexWrap: "wrap",
                    overflowY: "scroll",
                    marginLeft: 20,
                }}
            >
                {createdFiles.map((file, index) => (
                    <Box
                        key={index}
                        onDoubleClick={handleFileDoubleClick}
                        style={{ marginRight: 10, marginBottom: 10 }}
                    >
                        {file && file.type && file.type.startsWith("image/") ? (
                            //  image SVG

                            <ImageIcon />
                        ) : file &&
                          file.type &&
                          file.type.startsWith("audio/") ? (
                            //  audio SVG
                            <Audio />
                        ) : file &&
                          file.type &&
                          file.type.startsWith("video/") ? (
                            //  video SVG
                            <Video />
                        ) : (
                            // default file SVG
                            <FileSvg />
                        )}

                        <div style={{ display: "flex" }}>
                            <input
                                type="checkbox"
                                checked={checkedFiles[index] || false}
                                onChange={() =>
                                    handleFilesCheckboxChange(index)
                                }
                                style={{ marginRight: 10 }}
                            />
                            <div className="file-name">
                                <a
                                    href={URL.createObjectURL(file)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={file.name || ""}
                                    data-file-name={file.name}
                                >
                                    {file.name?.length > 9
                                        ? `${file.name.substring(0, 9)}...`
                                        : file.name}
                                </a>
                            </div>
                        </div>
                        {isSidebarOpen && (
                            <FileSidebar
                                key={file.name} // Ensure each FileSidebar has a unique key
                                name={file.name}
                                type={file.type}
                                size={file.size}
                                lastmodified={file.lastModified}
                            />
                        )}
                    </Box>
                ))}

                {/* {isSidebarOpen && (
                    <FileSidebar name="hello" type="image" size="100kb" />
                )} */}
                {DeleteDialogOpen && (
                    <div className="deleteDialogOverlay">
                        <div className="deleteDialogBox">
                            <p>{`Do you want to delete selected ${deleteType} ?`}</p>

                            <div className="deleteDialogBox__buttons">
                                <Button
                                    onClick={() =>
                                        handleDeleteConfirm(deleteType)
                                    }
                                >
                                    Confirm
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleDeleteCancel(deleteType)
                                    }
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Box>
        </>
    );
}
