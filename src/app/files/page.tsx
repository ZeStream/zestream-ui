"use client";

import {
    FileIcon,
    PlusIcon,
    TrashIcon,
    UploadIcon,
} from "@radix-ui/react-icons";
import { Box, Flex, Button, Dialog, Text, TextField } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import "../globals.css";
import AudioSVG from "../svg/FilesSVG/audio.svg";
import VideoSVG from "../svg/FilesSVG/video.svg";
import ImageSVG from "../svg/FilesSVG/image.svg";
import FileSVG from "../svg/FilesSVG/file.svg";
import FolderSVG from "../svg/Folders.svg";
import Image from "next/image";

export default function Files() {
    const [newFolderName, setNewFolderName] = useState<string>("");
    const [isFolderCreated, setIsFolderCreated] = useState<boolean>(false);
    const [createdFolder, setCreatedFolder] = useState<string[]>(() => {
        const storedFolders = localStorage.getItem("createdFolders");
        return storedFolders ? JSON.parse(storedFolders) : [];
    });
    const [createdFiles, setCreatedFiles] = useState<File[]>(() => {
        const storedFiles = localStorage.getItem("createdFiles");
        return storedFiles ? JSON.parse(storedFiles) : [];
    });
    const [checkedFolders, setCheckedFolders] = useState<boolean[]>([]);
    const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [checkedFiles, setCheckedFiles] = useState<boolean[]>([]);
    const [deleteType, setDeleteType] = useState("");

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || !files.length) {
            alert("No files present");
            return;
        }
        const newFiles: File[] = Array.from(files).map((file) => {
            return new File([], file.name, {
                type: file.type,
                lastModified: file.lastModified,
            });
        });

        setCreatedFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    };

    const handleFileInput = () => {
        const fileInput = document.getElementById(
            "fileInput"
        ) as HTMLInputElement;
        fileInput?.click();
    };
    useEffect(() => {
        localStorage.setItem("createdFolders", JSON.stringify(createdFolder));
    }, [createdFolder]);

    useEffect(() => {
        localStorage.setItem("createdFiles", JSON.stringify(createdFiles));
    }, [createdFiles]);

    const handleCreateFolder = (): void => {
        if (newFolderName.trim() === "") {
            alert("Folder can't be created without name");
            return;
        }
        setIsFolderCreated(true);
        setCreatedFolder((prevFolder) => [...prevFolder, newFolderName]);
    };

    const handleDialogClose = (): void => {
        if (isFolderCreated) {
            console.log("Folder created:", newFolderName);
        }

        setIsFolderCreated(false);
        setNewFolderName("");
    };

    const handleFoldersCheckboxChange = (index: number) => {
        const newCheckedFolders = [...checkedFolders];
        newCheckedFolders[index] = !newCheckedFolders[index];
        setCheckedFolders(newCheckedFolders);
    };

    const handleFilesCheckboxChange = (index: number) => {
        const newCheckedFiles = [...checkedFiles];
        newCheckedFiles[index] = !newCheckedFiles[index];
        setCheckedFiles(newCheckedFiles);
    };

    const handleDeleteFoldersButtonClick = () => {
        if (checkedFolders.some((isChecked) => isChecked)) {
            setDeleteType("folders");
            setDeleteDialogOpen(true);
        }
    };

    const handleDeleteFilesButtonClick = () => {
        if (checkedFiles.some((isChecked) => isChecked)) {
            setDeleteType("files");

            setDeleteDialogOpen(true);
        }
    };

    const handleDeleteConfirm = (type: string) => {
        if (type === "folders") {
            const newFolders = createdFolder.filter(
                (_, index) => !checkedFolders[index]
            );
            setCreatedFolder(newFolders);
            setCheckedFolders(Array(newFolders.length).fill(false));
        } else if (type === "files") {
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

    return (
        <>
            <Flex direction="column">
                <Box
                    style={{
                        height: 80,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {/* new folder button  */}

                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button
                                variant="surface"
                                highContrast
                                style={{
                                    cursor: "pointer",
                                    marginTop: 22,
                                    marginRight: 10,
                                }}
                            >
                                <PlusIcon /> New Folder
                            </Button>
                        </Dialog.Trigger>

                        <Dialog.Content style={{ maxWidth: 450 }} size="4">
                            <Dialog.Title>Create a New Folder</Dialog.Title>

                            <Flex direction="column" gap="3">
                                <label>
                                    <TextField.Input
                                        placeholder="Enter the folder name"
                                        value={newFolderName}
                                        onChange={(e) =>
                                            setNewFolderName(e.target.value)
                                        }
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button
                                        onClick={() => {
                                            handleCreateFolder();
                                            handleDialogClose();
                                        }}
                                    >
                                        Create
                                    </Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>

                    {/* upload button  */}
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
                </Box>
                <hr />
                <div className="folderBox-title">
                    <h3 style={{ margin: 10 }}>Folders</h3>
                    <Button
                        variant="solid"
                        style={{
                            cursor: "pointer",
                            marginTop: 22,
                            marginRight: 14,
                        }}
                        onClick={handleDeleteFoldersButtonClick}
                    >
                        <TrashIcon />
                    </Button>
                </div>

                <Box
                    className="folders"
                    style={{
                        height: 325,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        overflowY: "scroll",
                        marginLeft: 20,
                    }}
                >
                    {createdFolder.map((folderName, index) => (
                        <Box
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Image src={FolderSVG} alt="foldericon" />

                            <div
                                style={{
                                    display: "flex",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={checkedFolders[index] || false}
                                    onChange={() =>
                                        handleFoldersCheckboxChange(index)
                                    }
                                    style={{ marginRight: 10 }}
                                />
                                {folderName}
                            </div>
                        </Box>
                    ))}
                </Box>

                {DeleteDialogOpen && (
                    <div className="deleteDialogBox">
                        <p>{`Do you want to delete selected ${deleteType} ?`}</p>
                        <div className="deleteDialogBox__buttons">
                            <Button
                                onClick={() => handleDeleteConfirm(deleteType)}
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={() => handleDeleteCancel(deleteType)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                <hr style={{ marginTop: 80 }} />
                <div className="fileBox-title">
                    <h3 style={{ margin: 10 }}>Files</h3>
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
                        <div
                            key={index}
                            style={{ marginRight: 10, marginBottom: 10 }}
                        >
                            {file &&
                            file.type &&
                            file.type.startsWith("image/") ? (
                                //  image SVG

                                <Image
                                    priority
                                    src={ImageSVG}
                                    alt="imageIcon"
                                    loading="eager"
                                />
                            ) : file &&
                              file.type &&
                              file.type.startsWith("audio/") ? (
                                //  audio SVG
                                <Image
                                    priority
                                    src={AudioSVG}
                                    alt="audioIcon"
                                    loading="eager"
                                />
                            ) : file &&
                              file.type &&
                              file.type.startsWith("video/") ? (
                                //  video SVG
                                <Image
                                    priority
                                    src={VideoSVG}
                                    loading="eager"
                                    alt="videoIcon"
                                />
                            ) : (
                                // default file SVG
                                <Image
                                    src={FileSVG}
                                    alt="DEFAULTfileicon"
                                    loading="eager"
                                />
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
                                        href={URL.createObjectURL(
                                            new File([file], "filename")
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={file.name}
                                    >
                                        {file.name?.length > 9
                                            ? `${file.name.substring(0, 9)}...`
                                            : file.name}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Box>
            </Flex>
        </>
    );
}
