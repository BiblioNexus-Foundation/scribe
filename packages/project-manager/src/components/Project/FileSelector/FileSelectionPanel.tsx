import * as React from "react";
import { useState } from "react";

export interface FileInfo {
  path: string;
  isValid?: boolean;
  isProcessing?: boolean;
  description?: string;
}

interface FileSelectionPanelProps {
  files: FileInfo[];
  onRemoveFile?: (index: number) => void;
  onClose: () => void;
  title?: string;
}

const FileSelectionPanel: React.FC<FileSelectionPanelProps> = ({
  files,
  onRemoveFile,
  onClose,
  title = "Selected Files"
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);

  const handleFileClick = (index: number) => {
    setSelectedFileIndex(index === selectedFileIndex ? null : index);
  };

  const handleRemoveFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFile) {
      onRemoveFile(index);
      if (selectedFileIndex === index) {
        setSelectedFileIndex(null);
      }
    }
  };

  const getFileName = (path: string) => {
    return path.split('/').pop() || path;
  };

  const getStatusColor = (file: FileInfo) => {
    if (file.isProcessing) {
      return "#ff9800";
    } else if (file.isValid === false) {
      return "#ff4d4f";
    } else if (file.isValid === true) {
      return "#52c41a";
    } else {
      return "#ff9800";
    }
  };

  const getStatusText = (file: FileInfo) => {
    if (file.isProcessing) {
      return "Processing";
    } else if (file.isValid === false) {
      return "Invalid";
    } else if (file.isValid === true) {
      return "Valid";
    } else {
      return "Unknown";
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      maxHeight: "100%",
      overflow: "hidden"
    }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          borderBottom: "1px solid #333",
          backgroundColor: "#1a1a1a",
          flexShrink: 0
        }}
      >
        <h3 style={{ color: "white", margin: 0 }}>{title}</h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            padding: "5px 10px"
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          flex: "1 1 auto",
          height: "calc(100% - 50px)",
          scrollbarWidth: "thin",
          msOverflowStyle: "auto"
        }}
      >
        {files.length === 0 ? (
          <div style={{ padding: "15px", color: "#999", textAlign: "center" }}>
            No files selected
          </div>
        ) : (
          files.map((file: FileInfo, index: number) => (
            <div key={index}>
              <div
                style={{
                  padding: "12px 15px",
                  borderBottom: "1px solid #333",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: selectedFileIndex === index ? "#2a2a2a" : "transparent",
                  cursor: "pointer"
                }}
                onClick={() => handleFileClick(index)}
              >
                <div style={{ display: "flex", alignItems: "center", maxWidth: "80%" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(file),
                      marginRight: "10px",
                      flexShrink: 0
                    }}
                  />
                  <div
                    style={{
                      color: file.isProcessing ? "#ff9800" : (file.isValid === false ? "#ff4d4f" : "white"),
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                    title={getFileName(file.path)}
                  >
                    {getFileName(file.path)}
                  </div>
                </div>
                {onRemoveFile && (
                  <button
                    onClick={(e) => handleRemoveFile(index, e)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#999",
                      cursor: "pointer",
                      padding: "5px",
                      fontSize: "14px",
                      flexShrink: 0
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
              {selectedFileIndex === index && (
                <div
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#2a2a2a",
                    color: "#ddd",
                    fontSize: "14px",
                    borderBottom: "1px solid #333"
                  }}
                >
                  <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                    <span style={{
                      color: getStatusColor(file),
                      fontWeight: "bold",
                      marginRight: "5px"
                    }}>
                      {getStatusText(file)}:
                    </span>
                    {file.isProcessing && (
                      <div style={{ display: "inline-block", width: "14px", height: "14px", borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#ff9800", animation: "spin 1s linear infinite" }}></div>
                    )}
                  </div>
                  {file.description && <div>{file.description}</div>}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FileSelectionPanel;