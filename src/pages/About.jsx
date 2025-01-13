import {useState} from 'react'

const About = () => {
  const [imgId, setImgId] = useState(0);
  const [isTransformed, setIsTransformed] = useState(false);

  const imgSrcs = [
    `ken-pics/headshot0.jpg`,
    `ken-pics/headshot1.jpg`,
    `ken-pics/headshot2.jpg`,
    `ken-pics/headshot3.jpg`
  ]
  
  

  const handlePicClick = () => {
    setIsTransformed(!isTransformed);
    setTimeout(() => {
      setImgId((imgId+1) % imgSrcs.length);
      setIsTransformed(!isTransformed);
    }, 150); 
  }

  return (
    <div id="About" className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#434343' }}>
      <div className="flex flex-row items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center flex-grow mr-32 ml-32">
          <h1 className="text-6xl font-bold text-white">
            Hello, I&apos;m (just) Ken
          </h1>
          <div className="text-xl text-gray-300 text-justify">
            <p className="mt-10">
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
        <img 
          src={imgSrcs[imgId]} 
          alt="personal picture" 
          className={`w-1/3 ml-auto mr-10 transition duration-500 ease-in-out transform ${isTransformed ? 'scale-x-[-1] ' : 'scale-x-[1]'}`}
          onClick={handlePicClick}/>
      </div>
    </div>
  )
}

export default About