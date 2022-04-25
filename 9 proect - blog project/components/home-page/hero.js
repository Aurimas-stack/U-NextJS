import Image from "next/image";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/human.jpg"
          alt="Image of a human"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm a real human</h1>
      <p>I blog about everything that is human related. I am a human.</p>
    </section>
  );
};

export default Hero;
