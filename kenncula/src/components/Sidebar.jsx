const Sidebar = () => {
  return (
    <div className="w3-sidebar w3-bar-block" style={{ width: '250px' }}>
      {/* <h3 className="w3-bar-item"></h3> */}
      <h4> <a href="https://kenncula.github.io/about" className="w3-bar-item w3-button">About</a></h4>
      <h4><a href="https://kenncula.github.io/" className="w3-bar-item w3-button">Resume</a></h4>
      <h4><a href="https://github.com/kenncula" className="w3-bar-item w3-button">Github</a></h4>
      <h4><a href="https://linkedin.com/in/kenneth-cula" className="w3-bar-item w3-button"> LinkedIn </a></h4>
    </div>
  );
};

export default Sidebar;