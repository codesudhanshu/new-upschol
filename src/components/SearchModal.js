// components/SearchModal.js
import { useState, useRef, useEffect } from 'react';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus input when modal opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleVoiceSearch = () => {
    // Voice search implementation
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchValue(transcript);
        setShowResults(true);
      };
      
      recognition.start();
    } else {
      alert('Voice search not supported in this browser');
    }
  };

  const trendingSearches = [
    { name: 'Online MBA', href: '/university?courses=online-mba' },
    { name: 'Online Executive MBA', href: '/university?courses=executive-mba' },
    { name: 'Online MA', href: '/university?courses=ma' },
    { name: 'Online BBA', href: '/university?courses=bba' },
    { name: 'Online MCA', href: '/university?courses=mca' },
    { name: 'Online DBA', href: '/university?courses=dba' },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal fade fade-flip search-popup show"> 
    <div className="modal-overlay" >
      <div className="modal-dialog" ref={modalRef} >
        <div className="modal-content" >
          <div className="modal-header" >
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              style={{
                boxSizing: 'content-box',
                width: '1em',
                height: '1em',
                padding: '0.25em 0.25em',
                color: '#000',
                background: `transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat`,
                border: 0,
                borderRadius: '0.25rem',
                opacity: 0.5,
                cursor: 'pointer'
              }}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body bg_gray" style={{
            position: 'relative',
            flex: '1 1 auto',
            padding: '1rem',
            backgroundColor: '#f8f9fa'
          }}>
            <form action="/university">
              <div className="search-section-start">
                <a className="navbar-brand" href="/">
                  <figure style={{ margin: 0, textAlign: 'center' }}>
                    <img 
                      className="img-fluid" 
                      src="/images/logo.jpeg" 
                      alt="logo"
                      style={{ maxWidth: '200px', height: 'auto' }}
                    />
                  </figure>
                </a>
                
                <div className="search-bar" style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  marginTop: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '50px',
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd'
                }}>
                  <button 
                    className="search-icon" 
                    type="submit"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      marginRight: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <img 
                      src="/images/search_icon.png" 
                      alt="Search" 
                      style={{ width: '20px', height: '20px' }}
                    />
                  </button>
                  
                  <input 
                    ref={inputRef}
                    type="text" 
                    id="searchInput" 
                    name="search" 
                    placeholder="Search for Best Courses" 
                    value={searchValue}
                    onChange={handleSearchChange}
                    style={{
                      border: 'none',
                      outline: 'none',
                      flex: 1,
                      padding: '0.5rem 0',
                      fontSize: '1rem',
                      background: 'transparent'
                    }}
                  />
                  
                  {/* Search Results Dropdown */}
                  <div className="search-dropbox" style={{ position: 'relative' }}>
                    <ul 
                      id="searchResults" 
                      role="listbox" 
                      className={`dropdown-menu w-100 ${showResults ? 'd-block' : 'd-none'}`}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '0.25rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        margin: 0,
                        padding: 0,
                        listStyle: 'none'
                      }}
                    >
                      {/* Search results would go here */}
                      <li style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                        Search result 1
                      </li>
                      <li style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        Search result 2
                      </li>
                    </ul>
                  </div>
                  
                  {/* Voice Search Button */}
                  <button 
                    type="button" 
                    id="voiceSearchBtn"
                    onClick={handleVoiceSearch}
                    style={{
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      marginLeft: '5px',
                      padding: '0.25rem'
                    }}
                  >
                    <img 
                      src="/images/mic.svg" 
                      alt="Voice Search" 
                      width="25" 
                      height="25"
                    />
                  </button>
                </div>
                
                <div className="trending-search-box text-center mt-4">
                  <p className="mb-4" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Trending Searches
                    <span style={{ marginLeft: '0.5rem' }}>👇</span>
                  </p>
                  
                  <ul className="trending-list" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    gap: '0.5rem'
                  }}>
                    {trendingSearches.map((item, index) => (
                      <li key={index}>
                        <a 
                          href={item.href}
                          style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#fff',
                            borderRadius: '25px',
                            textDecoration: 'none',
                            color: '#333',
                            border: '1px solid #ddd',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#fff';
                            e.target.style.color = '#333';
                          }}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SearchModal;