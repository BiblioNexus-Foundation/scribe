import React = require("react");

export interface LanguageData {
  lc: string;    // language code
  ln: string;    // language name
  ang: string;   // anglicized name
  alt?: string[];// alternate names
  ld: string;    // layout direction
  hc: string;    // host country
  lr: string;    // language region
  pk: number;    // primary key
  gw: boolean;   // gateway language flag
  cc?: string[]; // country codes
}

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (languageCode: string) => void;
  placeholder: string;
  label: string;
  languages: LanguageData[];
  isLoading: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
  placeholder,
  label,
  languages,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [selectedLanguageDisplay, setSelectedLanguageDisplay] = React.useState<string>("");
  const [visibleCount, setVisibleCount] = React.useState<number>(100);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const loaderRef = React.useRef<HTMLDivElement>(null);

  // Filtering language based on name,code and alternate names
  const filteredLanguages = React.useMemo(() => {
    const term = searchTerm.toLowerCase();
    return languages.filter(lang =>
      lang.ang.toLowerCase().includes(term) ||
      lang.lc.toLowerCase().includes(term) ||
      lang.ln.toLowerCase().includes(term) ||
      lang.alt?.some(alt => alt.toLowerCase().includes(term))
    );
  }, [languages, searchTerm]);

  // Displaying few languages
  const visibleLanguages = React.useMemo(() => {
    return filteredLanguages.slice(0, visibleCount);
  }, [filteredLanguages, visibleCount]);

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

  // Update selected language
  React.useEffect(() => {
    if (selectedLanguage && languages.length > 0) {
      const selectedLang = languages.find(lang => lang.lc === selectedLanguage);
      if (selectedLang) {
        setSelectedLanguageDisplay(selectedLang.ang + ` (${selectedLang.ln})`);
      }
    }
  }, [selectedLanguage, languages]);

  // intersection observer for infinite scroll
  React.useEffect(() => {
    const options = {
      root: dropdownRef.current,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && visibleCount < filteredLanguages.length) {
        // Load more languages
        setVisibleCount(prevCount => Math.min(prevCount + 100, filteredLanguages.length));
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleCount, filteredLanguages.length, showDropdown]);

  // Reset visible count
  React.useEffect(() => {
    setVisibleCount(100);
  }, [searchTerm]);

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
          <span>{selectedLanguageDisplay || placeholder}</span>
          <span style={{ fontSize: "18px" }}>{showDropdown ? "▲" : "▼"}</span>
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
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
              {isLoading ? (
                <div style={{ padding: "10px", color: "#888", textAlign: "center" }}>
                  Loading languages...
                </div>
              ) : filteredLanguages.length === 0 ? (
                <div style={{ padding: "10px", color: "#888" }}>No languages found</div>
              ) : (
                <>
                  {visibleLanguages.map((lang) => (
                    <div
                      key={lang.lc}
                      onClick={() => {
                        onSelectLanguage(lang.lc);
                        setSelectedLanguageDisplay(lang.ang + ` (${lang.ln})`);
                        setShowDropdown(false);
                        setSearchTerm("");
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
                  {visibleCount < filteredLanguages.length && (
                    <div
                      ref={loaderRef}
                      style={{
                        padding: "10px",
                        color: "#888",
                        textAlign: "center",
                        height: "20px"
                      }}
                    >
                      <span style={{ fontSize: "14px" }}>Loading more...</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;