import React = require("react");
import { URI } from "@theia/core";
import { FileDialogService, OpenFileDialogProps } from "@theia/filesystem/lib/browser";
import LanguageSelector, { LanguageData } from "./LanguageSelector/LanguageSelector";
import FileSelectionPanel, { FileInfo } from "./FileSelector/FileSelectionPanel";

interface NewProjectViewProps {
  onBack: () => void;
  fileDialogService?: FileDialogService;
  projectServer?: any;
}

interface ValidationItem {
  field: string;
  error: string;
}
type Validation = ValidationItem[];

interface ValidationQueue {
  isProcessing: boolean;
  pendingFiles: string[];
}

interface FileValidationStatus {
  isValid?: boolean;
  isProcessing: boolean;
  errorDescription?: string;
}

const NewProjectView: React.FC<NewProjectViewProps> = ({ onBack, fileDialogService, projectServer }) => {
  const [projectLocation, setProjectLocation] = React.useState<string>("");
  const [usfmFiles, setUsfmFiles] = React.useState<string[]>([]);
  const [targetUsfmFiles, setTargetUsfmFiles] = React.useState<string[]>([]);
  const [languages, setLanguages] = React.useState<LanguageData[]>([]);
  const [sourceLanguage, setSourceLanguage] = React.useState<string>("");
  const [targetLanguage, setTargetLanguage] = React.useState<string>("");
  const [projectName, setProjectName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [licence, setLicence] = React.useState<string>("MIT");
  const [showAdvancedOptions, setShowAdvancedOptions] = React.useState<boolean>(false);
  const [validation, setValidation] = React.useState<Validation>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = React.useState<boolean>(false);
  const [activeFilesPanel, setActiveFilesPanel] = React.useState<"source" | "target" | null>(null);
  const languagesLoaded = React.useRef<boolean>(false);
  const [fileValidationStatus, setFileValidationStatus] = React.useState<{ [key: string]: FileValidationStatus }>({});
  const [validationQueue, setValidationQueue] = React.useState<ValidationQueue>({
    isProcessing: false,
    pendingFiles: []
  });

  const isMounted = React.useRef<boolean>(true);

  const sourceFilesInfo: FileInfo[] = React.useMemo(() => {
    return usfmFiles.map(path => {
      const status = fileValidationStatus[path] || { isProcessing: true };
      return {
        path,
        isValid: status.isValid,
        isProcessing: status.isProcessing,
        description: status.isValid === false ? status.errorDescription : undefined
      };
    });
  }, [usfmFiles, fileValidationStatus]);

  const targetFilesInfo: FileInfo[] = React.useMemo(() => {
    return targetUsfmFiles.map(path => {
      const status = fileValidationStatus[path] || { isProcessing: true };
      return {
        path,
        isValid: status.isValid,
        isProcessing: status.isProcessing,
        description: status.isValid === false ? status.errorDescription : undefined
      };
    });
  }, [targetUsfmFiles, fileValidationStatus]);

  // useEffect for processing the validation queue
  React.useEffect(() => {
    const processQueue = async () => {
      if (!validationQueue.isProcessing && validationQueue.pendingFiles.length > 0) {
        setValidationQueue(prev => ({
          ...prev,
          isProcessing: true
        }));

        const nextFile = validationQueue.pendingFiles[0];

        setFileValidationStatus(prev => ({
          ...prev,
          [nextFile]: { isProcessing: true }
        }));

        if (isMounted.current) {
          const ext = nextFile.split('.').pop()?.toLowerCase();
          const isValid = ext === 'usfm' || ext === 'sfm';
          if (isValid) {
            try {
              const result = await projectServer.validateUSFM(nextFile);
              console.log("result", result);

              if (isMounted.current) {
                setFileValidationStatus(prev => ({
                  ...prev,
                  [nextFile]: {
                    isValid: result.success,
                    isProcessing: false,
                    errorDescription: `${(result.success === false) && result.message}`
                  }
                }));

                // Remove the processed file from the queue and update the queue status
                setValidationQueue(prev => ({
                  isProcessing: false,
                  pendingFiles: prev.pendingFiles.filter(file => file !== nextFile)
                }));
              }
            } catch (error) {
              console.error("USFM validation error:", error);

              if (isMounted.current) {
                setFileValidationStatus(prev => ({
                  ...prev,
                  [nextFile]: {
                    isValid: false,
                    isProcessing: false,
                    errorDescription: `Validation error: ${error.message || "Unknown error"}`
                  }
                }));

                // Remove the processed file from the queue and update the queue status
                setValidationQueue(prev => ({
                  isProcessing: false,
                  pendingFiles: prev.pendingFiles.filter(file => file !== nextFile)
                }));
              }
            }
          } else {
            setFileValidationStatus(prev => ({
              ...prev,
              [nextFile]: {
                isValid: false,
                isProcessing: false,
                errorDescription: `File type "${ext}" is not supported. Only USFM (.usfm) or SFM (.sfm) files are valid.`
              }
            }));

            // Remove the processed file from the queue and update the queue status
            setValidationQueue(prev => ({
              isProcessing: false,
              pendingFiles: prev.pendingFiles.filter(file => file !== nextFile)
            }));
          }
        }
      }
    };

    processQueue();
  }, [validationQueue, projectServer]);

  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  function queueFileValidation(path: string): void {
    setFileValidationStatus(prev => ({
      ...prev,
      [path]: { isProcessing: true }
    }));

    setValidationQueue(prev => ({
      ...prev,
      pendingFiles: [...prev.pendingFiles, path]
    }));
  }

  const handleRemoveSourceFile = (index: number) => {
    const pathToRemove = usfmFiles[index];
    const newFiles = [...usfmFiles];
    newFiles.splice(index, 1);
    setUsfmFiles(newFiles);

    const newValidationStatus = { ...fileValidationStatus };
    delete newValidationStatus[pathToRemove];
    setFileValidationStatus(newValidationStatus);

    setValidationQueue(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter(path => path !== pathToRemove)
    }));
  };

  const handleRemoveTargetFile = (index: number) => {
    const pathToRemove = targetUsfmFiles[index];
    const newFiles = [...targetUsfmFiles];
    newFiles.splice(index, 1);
    setTargetUsfmFiles(newFiles);

    const newValidationStatus = { ...fileValidationStatus };
    delete newValidationStatus[pathToRemove];
    setFileValidationStatus(newValidationStatus);

    setValidationQueue(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter(path => path !== pathToRemove)
    }));
  };

  // Fetching languages
  React.useEffect(() => {
    if (!languagesLoaded.current) {
      fetchLanguages();
    }
  }, []);

  React.useEffect(() => {
    usfmFiles.forEach(path => {
      if (fileValidationStatus[path] === undefined) {
        queueFileValidation(path);
      }
    });

    targetUsfmFiles.forEach(path => {
      if (fileValidationStatus[path] === undefined) {
        queueFileValidation(path);
      }
    });
  }, [usfmFiles, targetUsfmFiles]);

  // Function to fetch languages
  const fetchLanguages = async (): Promise<void> => {
    if (languagesLoaded.current || isLoadingLanguages) {
      return;
    }
    setIsLoadingLanguages(true);
    try {
      const response = await fetch('../../../../packages/project-manager/src/assets/languages.json');
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      const data = await response.json();
      setLanguages(data);
      languagesLoaded.current = true;
    } catch (error) {
      console.error("Failed to load languages:", error);
      // Setting Fallback language
      setLanguages([{
        "lc": "hi",
        "ld": "ltr",
        "alt": ["Khadi Boli", "Khari Boli", "Dakhini", "Hindi-Urdu", "Khariboli"],
        "hc": "IN",
        "ln": "\u0939\u093f\u0928\u094d\u0926\u0940, \u0939\u093f\u0902\u0926\u0940",
        "ang": "Hindi",
        "lr": "Asia",
        "pk": 2264,
        "gw": true,
        "cc": [
          "BN", "BR", "BT", "AR", "FR", "DE", "KR", "PA", "ES", "GB",
          "MY", "OM", "NP", "NZ", "ZA", "US", "AU", "CA", "IN", "SG", "MM"
        ]
      }]);
      languagesLoaded.current = true;
    } finally {
      setIsLoadingLanguages(false);
    }
  };

  const handleBrowseDirectory = async () => {
    if (!fileDialogService) {
      console.error("File dialog service not available");
      return;
    }

    try {
      const props: OpenFileDialogProps = {
        title: "Select Project Location",
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
      };

      const uri = await fileDialogService.showOpenDialog(props);
      if (uri) {
        const locationPath = new URI(uri.toString()).path.toString();
        setProjectLocation(locationPath);
      }
    } catch (error) {
      console.error("Location selection failed:", error);
    }
  };

  const handleBrowseSourceFiles = async () => {
    if (!fileDialogService) {
      console.error("File dialog service not available");
      return;
    }

    try {
      const props: OpenFileDialogProps = {
        title: "Select USFM files",
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: true,
        filters: {
          extensions: ['usfm', "USFM", "sfm", "SFM"]
        }
      };

      const uri = await fileDialogService.showOpenDialog(props);
      console.log(uri);

      if (uri) {
        const locationPath = uri
          .toString()
          .split(',')
          .map((path) => new URI(path.trim()).path.toString());
        console.log(locationPath);
        setUsfmFiles([...usfmFiles, ...locationPath]);
        setActiveFilesPanel("source");
        setValidation(validation.filter(item => item.field !== 'sourceFiles'));
      }
    } catch (error) {
      console.error("Source file selection failed:", error);
    }
  };

  const handleBrowseTargetFiles = async () => {
    if (!fileDialogService) {
      console.error("File dialog service not available");
      return;
    }

    try {
      const props: OpenFileDialogProps = {
        title: "Select Target USFM files",
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: true,
        filters: {
          extensions: ['usfm', "USFM", "sfm", "SFM"]
        }
      };

      const uri = await fileDialogService.showOpenDialog(props);
      if (uri) {
        const locationPaths = uri
          .toString()
          .split(',')
          .map((path) => new URI(path.trim()).path.toString());
        setTargetUsfmFiles([...targetUsfmFiles, ...locationPaths]);
        setActiveFilesPanel("target");
      }
    } catch (error) {
      console.error("Target file selection failed:", error);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationItem[] = [];

    if (!projectName) {
      errors.push({ field: 'projectName', error: 'Project name is required' });
    } else if (projectName.length < 3 || projectName.length > 40) {
      errors.push({ field: 'projectName', error: 'Project name must be between 3 and 40 characters' });
    }

    if (!sourceLanguage) {
      errors.push({ field: 'sourceLanguage', error: 'Source language is required' });
    }

    if (!targetLanguage) {
      errors.push({ field: 'targetLanguage', error: 'Target language is required' });
    }

    if (!usfmFiles.length) {
      errors.push({ field: 'sourceFiles', error: 'Source files are required' });
    }

    const hasInvalidSourceFiles = usfmFiles.some(path => {
      const status = fileValidationStatus[path];
      return status && (status.isProcessing || status.isValid === false);
    });

    if (hasInvalidSourceFiles) {
      errors.push({ field: 'sourceFiles', error: 'Some source files are invalid or still being validated' });
    }

    const hasInvalidTargetFiles = targetUsfmFiles.some(path => {
      const status = fileValidationStatus[path];
      return status && (status.isProcessing || status.isValid === false);
    });

    if (hasInvalidTargetFiles) {
      errors.push({ field: 'targetFiles', error: 'Some target files are invalid or still being validated' });
    }

    setValidation(errors);
    return errors.length === 0;
  };

  const handleCreateProject = () => {
    if (!validateForm()) {
      return;
    }
    console.log("Creating project", {
      name: projectName,
      description,
      sourceLanguage,
      targetLanguage,
      sourceFiles: usfmFiles,
      targetFiles: targetUsfmFiles,
      location: projectLocation,
      licence
    });
  };

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        padding: "30px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          padding: "10px",
        }}
        onClick={onBack}
        onMouseOver={(e) => (e.currentTarget.style.color = "#06b6d4")}
        onMouseOut={(e) => (e.currentTarget.style.color = "white")}
      >
        <div style={{ fontSize: "24px", marginRight: "8px" }}>←</div>
        <div>BACK</div>
      </div>

      <div style={{ marginTop: "60px", textAlign: "center" }}>
        <h1 style={{ color: "#06b6d4", fontSize: "32px", marginBottom: "30px" }}>Create Project</h1>
      </div>

      <div style={{
        display: "flex",
        width: "90%",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "20px"
      }}>
        <div
          style={{
            flex: "1",
            backgroundColor: "#222",
            padding: "30px",
            borderRadius: "10px",
            border: "2px solid #333",
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "white", marginBottom: "8px", fontWeight: "bold" }}>
              Project Name*
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setValidation(validation.filter(item => item.field !== 'projectName'));
              }}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#333",
                border: validation.some(item => item.field === 'projectName') ? "1px solid #ff4d4f" : "1px solid #444",
                borderRadius: "5px",
                color: "white",
                fontSize: "16px"
              }}
              placeholder="Enter project name"
            />
            {validation.find(item => item.field === 'projectName') && (
              <div style={{ color: '#ff4d4f', marginTop: '5px' }}>{validation.find(item => item.field === 'projectName')?.error}</div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "white", marginBottom: "8px", fontWeight: "bold" }}>
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#333",
                border: "1px solid #444",
                borderRadius: "5px",
                color: "white",
                fontSize: "16px"
              }}
              placeholder="Enter description"
            />
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <LanguageSelector
                languages={languages}
                selectedLanguage={sourceLanguage}
                onSelectLanguage={(lang) => {
                  setSourceLanguage(lang);
                  setValidation(validation.filter(item => item.field !== 'sourceLanguage'));
                }}
                placeholder="Select source language"
                label={"Source Language"}
                isLoading={isLoadingLanguages}
              />
              {validation.find(item => item.field === 'sourceLanguage') && (
                <div style={{ color: '#ff4d4f', marginTop: '5px' }}>{validation.find(item => item.field === 'sourceLanguage')?.error}</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <LanguageSelector
                languages={languages}
                selectedLanguage={targetLanguage}
                onSelectLanguage={(lang) => {
                  setTargetLanguage(lang);
                  setValidation(validation.filter(item => item.field !== 'targetLanguage'));
                }}
                placeholder="Select target language"
                label={"Target Language"}
                isLoading={isLoadingLanguages}
              />
              {validation.find(item => item.field === 'targetLanguage') && (
                <div style={{ color: '#ff4d4f', marginTop: '5px' }}>{validation.find(item => item.field === 'targetLanguage')?.error}</div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "white",
                marginBottom: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
              onClick={() => setActiveFilesPanel(activeFilesPanel === "source" ? null : "source")}
            >
              Source Files* <span style={{ color: "#06b6d4", fontSize: "12px" }}>(Click to view details)</span>
            </label>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={usfmFiles.join(", ")}
                readOnly
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#333",
                  border: validation.some(item => item.field === 'sourceFiles') ? "1px solid #ff4d4f" : "1px solid #444",
                  borderRadius: "5px 0 0 5px",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer"
                }}
                placeholder="Select source USFM files"
                onClick={() => setActiveFilesPanel(activeFilesPanel === "source" ? null : "source")}
              />
              <button
                onClick={handleBrowseSourceFiles}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#06b6d4",
                  color: "white",
                  border: "none",
                  borderRadius: "0 5px 5px 0",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Browse
              </button>
            </div>
            {validation.find(item => item.field === 'sourceFiles') && (
              <div style={{ color: '#ff4d4f', marginTop: '5px' }}>{validation.find(item => item.field === 'sourceFiles')?.error}</div>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "white",
                marginBottom: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
              onClick={() => setActiveFilesPanel(activeFilesPanel === "target" ? null : "target")}
            >
              Target Files (Optional) <span style={{ color: "#06b6d4", fontSize: "12px" }}>(Click to view details)</span>
            </label>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={targetUsfmFiles.join(", ")}
                readOnly
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#333",
                  border: validation.some(item => item.field === 'targetFiles') ? "1px solid #ff4d4f" : "1px solid #444",
                  borderRadius: "5px 0 0 5px",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer"
                }}
                placeholder="Import target USFM files"
                onClick={() => setActiveFilesPanel(activeFilesPanel === "target" ? null : "target")}
              />
              <button
                onClick={handleBrowseTargetFiles}
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#06b6d4",
                  color: "white",
                  border: "none",
                  borderRadius: "0 5px 5px 0",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Browse
              </button>
            </div>
            {validation.find(item => item.field === 'targetFiles') && (
              <div style={{ color: '#ff4d4f', marginTop: '5px' }}>{validation.find(item => item.field === 'targetFiles')?.error}</div>
            )}
          </div>

          <div
            style={{
              marginBottom: "20px",
              color: "#06b6d4",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
            onClick={toggleAdvancedOptions}
          >
            <span style={{ marginRight: "10px" }}>{showAdvancedOptions ? "▼" : "►"}</span>
            Advanced Options
          </div>

          {showAdvancedOptions && (
            <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#2a2a2a", borderRadius: "5px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", color: "white", marginBottom: "8px", fontWeight: "bold" }}>
                  Location
                </label>
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      backgroundColor: "#333",
                      border: "1px solid #444",
                      borderRadius: "5px 0 0 5px",
                      color: "white",
                      fontSize: "16px"
                    }}
                    placeholder="Select project location"
                  />
                  <button
                    onClick={handleBrowseDirectory}
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#06b6d4",
                      color: "white",
                      border: "none",
                      borderRadius: "0 5px 5px 0",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Browse
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "white", marginBottom: "8px", fontWeight: "bold" }}>
                  License
                </label>
                <select
                  value={licence}
                  onChange={(e) => setLicence(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "5px",
                    color: "white",
                    fontSize: "16px"
                  }}
                >
                  <option value="MIT">MIT</option>
                  <option value="CCSA">CCSA</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleCreateProject}
              style={{
                padding: "12px 24px",
                backgroundColor: "#06b6d4",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Create Project
            </button>
          </div>
        </div>

        {activeFilesPanel && (
          <div style={{
            width: "300px",
            backgroundColor: "#222",
            borderRadius: "10px",
            border: "2px solid #333",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}>
            {activeFilesPanel === "source" ? (
              <FileSelectionPanel
                files={sourceFilesInfo}
                onRemoveFile={handleRemoveSourceFile}
                onClose={() => setActiveFilesPanel(null)}
                title="Source Files"
              />
            ) : (
              <FileSelectionPanel
                files={targetFilesInfo}
                onRemoveFile={handleRemoveTargetFile}
                onClose={() => setActiveFilesPanel(null)}
                title="Target Files"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProjectView;