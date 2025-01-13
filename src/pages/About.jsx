import { useState } from 'react';


const About = () => {
  const [imgId, setImgId] = useState(0);
  const [isTransformed, setIsTransformed] = useState(false);

  const isMobile = () => {
    const userAgent = navigator.userAgent;
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(userAgent); 
  }

  const imgSrcs = [
    `ken-pics/headshot0.jpg`,
    `ken-pics/headshot1.jpg`,
    `ken-pics/headshot2.jpg`,
    `ken-pics/headshot3.jpg`
  ]

  const aboutText = () => {
    return (
    <>
      <div className="flex flex-col items-center justify-center flex-grow mx-4 md:mr-32 md:ml-32">
        <h1 className="text-4xl md:text-6xl  font-bold text-white text-center md:text-left">
          Hello, I&apos;m (just) Ken
        </h1>
        <div className="text-lg md:text-xl text-gray-300 text-justify mt-4 md:mt-10">
          <p className="mt-4 md:mt-0">
            I am passionate about secure, distributed systems that operate 
            harmoniously as a symphony.  </p>
          <p className="mt-3">
            In the past few years I have contributed to the development 
            of many networked and distributed systems for educational and research purposes.</p>
          <p className="mt-3 "> 
            Masters of Engineering in Computer Science Alum from Cornell University.
            Feel free to reach out: kenncula@gmail.com</p>
        </div>
      </div>
    </>
    )
  }

  const picture = () => {
    return (
    <> 
      <img 
      src={imgSrcs[imgId]} 
      alt="personal picture" 
      className={`md:shrink-0 mt-20 w-3/4 md:w-1/3 mt-8 md:mt-0 mr-10 transition duration-500 ease-in-out transform ${isTransformed ? 'scale-x-[-1] ' : 'scale-x-[1]'}`}
      onClick={handlePicClick}/>
    </>
    )
  }

  const handlePicClick = () => {
    setIsTransformed(!isTransformed);
    setTimeout(() => {
      setImgId((imgId+1) % imgSrcs.length);
      console.log(imgId)
      setIsTransformed(!isTransformed);
    }, 150); 
  }

  return (
    <div id="About" className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#434343' }}>
      <div className="flex flex-row items-center justify-center min-h-screen">
        {isMobile() ? (
          <div className='flex flex-col items-center justify-center'>
            {aboutText()}
            {picture()}
          </div>  
        ) : ( 
          <>
            {aboutText()}
            {picture()}
          </>
        )}
      </div>
    </div>
  )
}

export default About