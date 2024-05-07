const ProgressBar = (props) => {
    const { completed } = props;
  
    const containerStyles = {
      width: '100%',
      height: '1rem',
      backgroundColor: "#EEECFB",
      borderRadius: 50,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: "#543FD3",
      transition: 'width 1s ease-in-out',
      borderRadius: 'inherit',
      textAlign: 'right'
    }
    
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;