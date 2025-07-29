'use client';
import about from "./about.module.css";
import Image from 'next/image';

export function MainAbout() {
  return (
    <div className={about.main}>
      <div className={about.img}>
         <div style={{ width: '300px', height: '300px', backgroundColor: 'lightgray' }}></div>

         <Image 
        className={about.image}
        src="/assets/images/shot-high-rise-tall-building.jpg"
        alt="study"
        width={300}
        height={300}
        />
      </div>
      <div className={about.text}>
         <h2>About Us</h2>

      <h3>
        The largest & Most Diverse Universities in the United Emirates
      </h3>

      <p>
        Far far away, behind the word mountains, far from the Consonantia, there live the blind texts. Separated they marks grove right at the coast of the Semantics a large language ocean
      </p>

      <div>
        <div>
          <h4>Graduate Program</h4>
          <p>Browse the Undergraduate Degrees</p>
        </div>

        <div>
          <h4>Undergraduate Program</h4>
          <p>Browse the Undergraduate Degrees</p>
        </div>
      </div>

      <button className={about.btn}>Learn More</button>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <div className={about.about}>
      <div className={about.videoTour}>
        <button className={about.click}>
          <a href="https://youtu.be/bzOkTPfiUMM?list=PLvGpI5t1gJ8T0gukbGHh9mzAdkxR0-IaN"><i className="fa-solid fa-play"></i></a>
        </button>
        <h3>Take a Video Tour to Learn <br/> Intro of Campus</h3>
      </div>
      <MainAbout />
    </div>
  );
}
