import {useState} from 'react';
import '../index.css';

const Intro = () => {
  const [logoClicked, setLogoClicked] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  
  const handleLogoClick = () => {
    setLogoClicked(!logoClicked);
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 250); // Adjust the delay as needed
  }
  return (
    <div className="bg-home min-h-screen">
      <div id="Home" className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold text-white">
          <img 
            src="logos\png\logo-color.png" 
            alt="logo" 
            className={`h-48 w-48 ml-auto transition duration-1500 transform ${logoClicked ? 'rotate-360 ease-out' : '-rotate-360 ease-out'} ${isScaled ? 'scale-100' : 'scale-175'}`} 
            onClick={handleLogoClick}
            />
        </h1>
        {/* <a href="#about" className="mt-8 text-lg text-blue-500 hover:underline">Learn more about me</a> */}
      </div>
    </div>
  )
}

export default Intro;

