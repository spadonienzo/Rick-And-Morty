import style from "./About.module.css";
import logoGmail from "../../resources/gmail.png";
import logoGit from "../../resources/github.png";
import logoLinkedin from "../../resources/linkedin.png";
import logoCss from "../../resources/css3.png";
import logoBootstrap from "../../resources/bootstrap.png";
import logoHtml from "../../resources/html5.png";
import logoJs from "../../resources/js.png";
import logoMysql from "../../resources/mysql.png";
import logoNode from "../../resources/node-js.png";
import logoPostgre from "../../resources/postgre.png";
import logoReact from "../../resources/react.png";

const About = () => {
  const developerInfo = {
    aboutMe:
      "I am a passionate full-stack developer with expertise in building modern web applications. My skills include React for front-end development, Node.js for server-side development, and a strong foundation in HTML and CSS. I have successfully delivered robust and scalable solutions for various projects.",
    contact: {
      email: "spadonienzo@gmail.com",
      linkedin: "https://www.linkedin.com/in/enzo-spadoni-3a9700268/",
      github: "https://github.com/spadonienzo",
    },
  };

  return (
    <div className={style.about}>
      <h2>About Me</h2>
      <p>{developerInfo.aboutMe}</p>

      <h3>Skills</h3>
      <div className={style.divskills}>
        <img src={logoBootstrap} className={style.img} alt="Bootstrap" />
        <img src={logoCss} className={style.img} alt="CSS" />
        <img src={logoHtml} className={style.img} alt="HTML" />
        <img src={logoJs} className={style.img} alt="JavaScript" />
        <img src={logoMysql} className={style.img} alt="MySql" />
        <img src={logoNode} className={style.img} alt="Node.js" />
        <img src={logoPostgre} className={style.img} alt="Postgre" />
        <img src={logoReact} className={style.img} alt="React.js" />
      </div>

      <h3>Contact Information</h3>
      <div className={style.divcontact}>
        <a href={`mailto:${developerInfo.contact.email}`}>
          <img src={logoGmail} className={style.img} />
        </a>
        <a href={developerInfo.contact.github}>
          <img src={logoGit} className={style.img} />
        </a>
        <a href={developerInfo.contact.linkedin}>
          <img src={logoLinkedin} className={style.img} />
        </a>
      </div>
    </div>
  );
};

export default About;
