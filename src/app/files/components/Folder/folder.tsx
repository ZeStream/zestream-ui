import { useState, useEffect } from "react";
import { Box, Flex, Button, Dialog, TextField } from "@radix-ui/themes";
import FolderSvg from "@/app/svg/FolderSvg";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import "./folder.css";
import { useRouter, usePathname } from "next/navigation";

export default function Folders() {
    const [newFolderName, setNewFolderName] = useState<string>("");
    const [isFolderCreated, setIsFolderCreated] = useState<boolean>(false);
    const [createdFolder, setCreatedFolder] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const storedFolders = localStorage.getItem("createdFolders");

            return storedFolders ? JSON.parse(storedFolders) : [];
        }
        return [];
    });

    const [checkedFolders, setCheckedFolders] = useState<boolean[]>([]);
    const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState("");

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(
                "createdFolders",
                JSON.stringify(createdFolder)
            );
        }
    }, [createdFolder]);

    useEffect(() => {
        // Check if window is defined before accessing localStorage
        if (typeof window !== "undefined") {
            const storedFolders = localStorage.getItem("createdFolders");
            // console.log("Stored Folders:", storedFolders);

            setCreatedFolder(storedFolders ? JSON.parse(storedFolders) : []);
        }
    }, []);

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

    const handleDeleteFoldersButtonClick = () => {
        if (checkedFolders.some((isChecked) => isChecked)) {
            setDeleteType("folders");
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
        }

        setDeleteDialogOpen(false);
    };

    const handleDeleteCancel = (deleteType: string) => {
        setDeleteDialogOpen(false);
    };

    const handleFolderDoubleClick = (folderName: string) => {
        alert(`Folder Double Clicked: ${folderName}`);

        const cleanFolderName = folderName.replace(/^\/|\/$/g, "");
        // Navigate to the new path by attaching current pathname
        router.push(`${pathname}/${cleanFolderName}`);
    };
    return (
        <>
            <div className="folderBox-title">
                <h3 style={{ margin: 10 }}>Folders</h3>
                <div className="folderBox-title-operations">
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
                        <FolderSvg
                            onDoubleClick={() =>
                                handleFolderDoubleClick(folderName)
                            }
                        />

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
                )}{" "}
            </Box>
        </>
    );
}
