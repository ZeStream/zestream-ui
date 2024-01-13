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
                            <svg
                                width="120px"
                                height="120px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        opacity="0.5"
                                        d="M22 14V11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14Z"
                                        fill="#1C274C"
                                    ></path>
                                    <path
                                        d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z"
                                        fill="#1C274C"
                                    ></path>
                                </g>
                            </svg>
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
                            {file.type.startsWith("image/") ? (
                                //  image SVG
                                <svg
                                    viewBox="0 0 24 24"
                                    width="120px"
                                    height="120px"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            opacity="0.15"
                                            d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V5Z"
                                            // fill="#000000"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8481 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5864L15.7901 12.4679C16.4651 11.9279 17.4053 11.8855 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5301L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                                            stroke="#0a0a0a"
                                            fill="#1C274C"
                                            opacity="0.5"
                                            stroke-width="1.2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>{" "}
                                    </g>
                                </svg>
                            ) : file.type.startsWith("audio/") ? (
                                //  audio SVG
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="120px"
                                    height="120px"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            opacity="0.4"
                                            d="M16.1898 2H7.81976C4.17976 2 2.00977 4.17 2.00977 7.81V16.18C2.00977 19.82 4.17976 21.99 7.81976 21.99H16.1898C19.8298 21.99 21.9998 19.82 21.9998 16.18V7.81C21.9998 4.17 19.8298 2 16.1898 2Z"
                                            // fill="#292D32"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M15.6191 7.09996L13.3292 6.34001C12.7492 6.14001 12.1592 6.21996 11.7092 6.53996C11.2592 6.85996 11.0092 7.39999 11.0092 8.00999V8.61998V12.8C10.6092 12.58 10.1591 12.45 9.66913 12.45C8.12913 12.45 6.86914 13.71 6.86914 15.25C6.86914 16.79 8.12913 18.05 9.66913 18.05C11.2091 18.05 12.4691 16.79 12.4691 15.25V10.7C12.4791 10.71 12.4992 10.71 12.5092 10.72L14.7991 11.48C15.0091 11.55 15.2291 11.59 15.4391 11.59C15.7991 11.59 16.1391 11.49 16.4191 11.28C16.8691 10.96 17.1191 10.42 17.1191 9.80998V9.2C17.1191 8.29 16.4791 7.38996 15.6191 7.09996ZM9.66913 16.59C8.92913 16.59 8.33917 15.99 8.33917 15.26C8.33917 14.52 8.93913 13.92 9.66913 13.92C10.4091 13.92 11.0092 14.52 11.0092 15.26C11.0092 15.99 10.4091 16.59 9.66913 16.59Z"
                                            // fill="#292D32"
                                            fill="#1C274C"
                                        ></path>{" "}
                                    </g>
                                </svg>
                            ) : file.type.startsWith("video/") ? (
                                //  video SVG
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width="120px"
                                    height="120px"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            opacity="0.5"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M14 12C14 11.4722 13.4704 11.1162 12.4112 10.4043C11.3375 9.68271 10.8006 9.3219 10.4003 9.58682C10 9.85174 10 10.5678 10 12C10 13.4322 10 14.1483 10.4003 14.4132C10.8006 14.6781 11.3375 14.3173 12.4112 13.5957C13.4704 12.8838 14 12.5278 14 12Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M11.25 2C9.88386 2.00133 8.73121 2.01015 7.75004 2.0685V6.24976H11.25V2Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M6.25004 2.2214C5.02731 2.41566 4.14854 2.78019 3.46451 3.46423C2.78047 4.14826 2.41594 5.02703 2.22168 6.24976H6.25004V2.2214Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M21.7784 6.24976C21.5841 5.02703 21.2196 4.14826 20.5356 3.46423C19.8515 2.78019 18.9728 2.41566 17.75 2.2214V6.24976H21.7784Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M12.75 2C14.1162 2.00133 15.2689 2.01015 16.25 2.0685V6.24976H12.75V2Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M21.7784 17.7498H17.75V21.7781C18.9728 21.5839 19.8515 21.2193 20.5356 20.5353C21.2196 19.8513 21.5841 18.9725 21.7784 17.7498Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M16.25 17.7498V21.931C15.2689 21.9894 14.1162 21.9982 12.75 21.9995V17.7498H16.25Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M11.25 21.9995V17.7498H7.75004L7.75004 21.931C8.73121 21.9894 9.88386 21.9982 11.25 21.9995Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                        <path
                                            d="M6.25004 17.7498L6.25004 21.7781C5.02731 21.5839 4.14854 21.2193 3.46451 20.5353C2.78047 19.8513 2.41594 18.9725 2.22168 17.7498H6.25004Z"
                                            fill="#1C274C"
                                        ></path>{" "}
                                    </g>
                                </svg>
                            ) : (
                                // default file SVG
                                <svg
                                    width="120px"
                                    height="120px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            opacity="0.5"
                                            d="M22 14V11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14Z"
                                            fill="#1C274C"
                                        ></path>
                                        <path
                                            d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z"
                                            fill="#1C274C"
                                        ></path>
                                    </g>
                                </svg>
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
