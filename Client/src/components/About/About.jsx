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
      <h2 className={style.title}>About Me</h2>
      <p className={style.description}>{developerInfo.aboutMe}</p>

      <h3 className={style.subtitle}>Skills</h3>
      <div className={style.skillsGrid}>
        <img src={logoBootstrap} alt="Bootstrap" />
        <img src={logoCss} alt="CSS" />
        <img src={logoHtml} alt="HTML" />
        <img src={logoJs} alt="JavaScript" />
        <img src={logoMysql} alt="MySql" />
        <img src={logoNode} alt="Node.js" />
        <img src={logoPostgre} alt="Postgre" />
        <img src={logoReact} alt="React.js" />
      </div>

      <h3 className={style.subtitle}>Contact Information</h3>
      <div className={style.contact}>
        <a
          href={`mailto:${developerInfo.contact.email}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={logoGmail} alt="Gmail" />
        </a>
        <a href={developerInfo.contact.github} target="_blank" rel="noreferrer">
          <img src={logoGit} alt="GitHub" />
        </a>
        <a
          href={developerInfo.contact.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <img src={logoLinkedin} alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
};

export default About;
