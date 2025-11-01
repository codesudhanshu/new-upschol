// components/HeaderSearchTrigger.js
const HeaderSearchTrigger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer fs-14 rounded px-2 py-2 textprimary"
      style={{
        marginLeft: '20px',
        backgroundColor: '#d3d3d3c7',
        color: 'black',
        textWrap: 'nowrap',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '14px',
        borderRadius: '4px',
        padding: '8px 12px'
      }}
    >
      Search <span className="textprimary">|</span>
      <svg 
        stroke="currentColor" 
        fill="currentColor" 
        strokeWidth="0" 
        viewBox="0 0 16 16" 
        fontSize="14" 
        className="textprimary" 
        height="1em" 
        width="1em" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
      </svg>
    </button>
  );
};

export default HeaderSearchTrigger;