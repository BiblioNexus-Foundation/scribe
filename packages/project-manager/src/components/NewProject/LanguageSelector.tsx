import React = require("react");

// Interface for language data based on JSON structure
export interface LanguageData {
  lc: string;       // language code
  ln: string;       // language name
  ang: string;      // anglicized name
  alt?: string[];   // alternate names
  ld: string;       // layout direction
  hc: string;       // host country
  lr: string;       // language region
  pk: number;       // primary key
  gw: boolean;      // gateway language flag
  cc: string[];     // country codes
}

interface LanguageSelectorProps {
  languages: LanguageData[];
  selectedLanguage: string;
  onSelectLanguage: (languageCode: string) => void;
  placeholder: string;
  label: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  placeholder,
  label
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

  // Filtering languages based on search term (name, code, and alternate names)
  const filteredLanguages = React.useMemo(() => {
    const term = searchTerm.toLowerCase();
    return languages.filter(lang =>
      lang.ang.toLowerCase().includes(term) ||
      lang.lc.toLowerCase().includes(term) ||
      lang.ln.toLowerCase().includes(term) ||
      lang.alt?.some(alt => alt.toLowerCase().includes(term))
    );
  }, [languages, searchTerm]);

  // Display name for a language
  const getLanguageDisplayName = (code: string): string => {
    const language = languages.find(lang => lang.lc === code);
    return language ? language.ang : code;
  };

  // Handling dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`#language-selector-${label.replace(/\s+/g, '-').toLowerCase()}`)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [label]);

  return (
    <div
      id={`language-selector-${label.replace(/\s+/g, '-').toLowerCase()}`}
      style={{ position: "relative" }}
    >
      <label style={{ display: "block", color: "white", marginBottom: "8px", fontWeight: "bold" }}>
        {label}*
      </label>
      <div
        style={{ width: "100%", position: "relative" }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#333",
            border: "1px solid #444",
            borderRadius: "5px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{selectedLanguage ? getLanguageDisplayName(selectedLanguage) : placeholder}</span>
          <span style={{ fontSize: "18px" }}>{showDropdown ? "▲" : "▼"}</span>
        </div>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              maxHeight: "250px",
              overflowY: "auto",
              backgroundColor: "#333",
              border: "1px solid #444",
              borderRadius: "0 0 5px 5px",
              zIndex: 1000,
            }}
          >
            <div style={{ padding: "8px" }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search language..."
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#444",
                  border: "1px solid #555",
                  borderRadius: "4px",
                  color: "white",
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div>
              {filteredLanguages.map((lang) => (
                <div
                  key={lang.lc}
                  onClick={() => {
                    onSelectLanguage(lang.lc);
                    setShowDropdown(false);
                  }}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: selectedLanguage === lang.lc ? "#06b6d4" : "transparent",
                    color: "white",
                  }}
                  onMouseOver={(e) => {
                    if (selectedLanguage !== lang.lc) {
                      e.currentTarget.style.backgroundColor = "#444";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedLanguage !== lang.lc) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{lang.ang}</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>
                    {lang.lc} {lang.ln !== lang.ang ? `(${lang.ln})` : ''}
                  </div>
                  {lang.alt && lang.alt.length > 0 && (
                    <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "2px" }}>
                      Also known as: {lang.alt.join(', ')}
                    </div>
                  )}
                </div>
              ))}
              {filteredLanguages.length === 0 && (
                <div style={{ padding: "10px", color: "#888" }}>No languages found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;