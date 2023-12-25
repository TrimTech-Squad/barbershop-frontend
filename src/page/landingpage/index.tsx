import { Link } from "react-router-dom";
import LandingPageCss from "./style.module.css";
import { useState, useEffect, useContext } from "react";
import fetchApi from "../../helper/fetch";
import AuthContext from "../../context/auth";
import { Avatar, Typography } from "@mui/material";

export type Service = {
  id: number;
  serviceName: string;
  description: string;
  photo_url: string;
};

export type Kapster = {
  id: number;
  name: string;
  specialization: string;
  gender: "Man" | "Woman";
  photo_url: string;
  status: "Available" | "Not Available" | "Resigned";
};

export default function LandingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [kapsters, setKapsters] = useState<Kapster[]>([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetchApi("/services", "GET");
      setServices(response.data);
    };
    fetchServices();
    const fetchKapsters = async () => {
      const response = await fetchApi("/kapsters", "GET");
      setKapsters(response.data);
    };
    fetchKapsters();
  }, []);

  return (
    <>
      <header>
        <div
          className={`${LandingPageCss["container"]} ${LandingPageCss["container-nav"]} `}
          style={{ alignItems: "center" }}
        >
          <div className={LandingPageCss["logo"]}>
            <img src="img/logo.png" alt="" />
            <div className={LandingPageCss["logo-text"]}>
              <h1>Trimtech Barbershop</h1>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#service">Service</a>
              </li>
              <li>
                <a href="#kapster">Kapster</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <div
                style={{
                  marginLeft: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {authContext.user ? (
                  <>
                    <Avatar src={authContext.user.photo_url} />
                    <Typography fontWeight="bold">
                      {authContext.user.name}
                    </Typography>
                  </>
                ) : (
                  <Link to="/login">
                    <button className={LandingPageCss["button-lgn"]}>
                      Login
                    </button>{" "}
                  </Link>
                )}
              </div>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div id="home" className={LandingPageCss["home"]}>
          <div className={LandingPageCss["overlay"]}>
            <div className={LandingPageCss["landing-text"]}>
              <h3>Getting your hair ready</h3>
              <h1>Trimtech Barbershop</h1>
              <hr id="hr-main" />
              <a href="contact.html" className={LandingPageCss["btn-hire"]}>
                Appointment
              </a>
            </div>
          </div>
        </div>

        <div className={LandingPageCss["about"]} id="about">
          <div className={LandingPageCss["about-img"]}>
            <img src="img/about.png" alt="Image" />
          </div>

          <div className={LandingPageCss["about-text"]}>
            <h2>About Me</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
              placeat minus molestias alias eveniet est voluptatem a dolorem
              accusamus asperiores tempora, voluptates aperiam doloribus
              reprehenderit sunt officiis ipsa? Ducimus, repudiandae Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Repudiandae dolorem
              culpa distinctio excepturi animi. Corrupti rerum aliquid unde?
              Iusto ex dolorem non aliquid voluptatibus distinctio, fugiat odit
              dicta excepturi dolor?
            </p>
            <a
              href="#"
              className={`${LandingPageCss["button"]} ${LandingPageCss["btn-about"]} `}
            >
              BOOKING NOW
            </a>
          </div>
        </div>

        <div className={LandingPageCss["service"]} id="service">
          <div className={LandingPageCss["text-center"]}>
            <h2>OUR BEST SERVICES THAT WE OFFERING TO YOU</h2>
            <h4>Our Service</h4>
          </div>

          <div className={LandingPageCss["service-item"]}>
            {services.map((item) => (
              <div key={item.id} className={LandingPageCss["service-cut"]}>
                <div className={LandingPageCss["image-service"]}>
                  <img
                    src={
                      import.meta.env.VITE_BASE_API_STATIC_URL + item.photo_url
                    }
                    alt=""
                  />
                </div>
                <h3>{item.serviceName}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={LandingPageCss["kapster"]} id="kapster">
          <div className={LandingPageCss["kaps-text"]}>
            <h2>OUR KAPSTERS</h2>
          </div>

          <div className={LandingPageCss["kaps-item"]}>
            {kapsters.map((item) => (
              <div key={item.id} className={LandingPageCss["kaps-container"]}>
                <div className={LandingPageCss["kaps-image"]}>
                  <img
                    src={
                      import.meta.env.VITE_BASE_API_STATIC_URL + item.photo_url
                    }
                    alt=""
                  />
                </div>
                <h3>{item.name}</h3>
                <p>
                  {item.specialization}
                  {/* <button className={LandingPageCss["btn-kapster"]}>
                    BOOKING NOW
                  </button> */}
                </p>
              </div>
            ))}

            {/* <div className={LandingPageCss["kaps-container"]}>
              <div className={LandingPageCss["kaps-image"]}>
                <img src="img/kapster/2.jpg" alt="" />
              </div>
              <h3>Joe</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vitae harum placeat sint culpa nisi, fugiat sed quos
                optio quam mollitia deserunt ab blanditiis velit vel
                necessitatibus! Reiciendis, repellat maxime.
                <button className={LandingPageCss["btn-kapster"]}>
                  BOOKING NOW
                </button>
              </p>
            </div>

            <div className={LandingPageCss["kaps-container"]}>
              <div className={LandingPageCss["kaps-image"]}>
                <img src="img/kapster/3.jpg" alt="" />
              </div>
              <h3>Luke</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vitae harum placeat sint culpa nisi, fugiat sed quos
                optio quam mollitia deserunt ab blanditiis velit vel
                necessitatibus! Reiciendis, repellat maxime.
                <button className={LandingPageCss["btn-kapster"]}>
                  BOOKING NOW
                </button>
              </p>
            </div> */}
          </div>
        </div>

        {/* Appointment Form */}
        <div className={LandingPageCss['appointment']} id="contact">
          <div id="body_header">
            <h1>Appointment Request Form</h1>
            <p>Make your appointments easier</p>
          </div>
          <form action="#" method="post">
            <fieldset>
              <legend>
                <span className={LandingPageCss['number']}>1</span>Your basic details
              </legend>
              <label htmlFor="name">Name*:</label>
              <input type="text" id="name" name="user_name" placeholder="trimtech" required pattern="[a-zA-Z0-9]+" />

              <label htmlFor="mail">Email*:</label>
              <input type="email" id="mail" name="user_email" placeholder="trimtech@gmail.com" required />
            </fieldset>

            <fieldset>
              <legend>
                <span className={LandingPageCss['number']}>2</span>Appointment Details
              </legend>
              <label htmlFor="appointment_for">Appointment for Kapster*:</label>
              <select id="appointment_for" name="appointment_for" required>
                <option value="clarissa">Clarissa</option>
                <option value="joe">Joe </option>
                <option value="luke">Luke</option>
              </select>
              <label htmlFor="service">Service</label>
              <select id="service_id" name="service_id" required>
                <option value="haircut">Haircut</option>
                <option value="massage">Massage </option>
                <option value="razorcut">Razor Cut</option>
                <option value="hairstyle">Hair Style</option>
              </select>
              <label htmlFor="date">Date*:</label>
              <input type="date" name="date" value="" required />
              <input type="time" id="time" name="utime" min="8:00" max="20:00" value="8:00" className={LandingPageCss['dtt']} required />
            </fieldset>
            <button type="submit">Request For Appointment</button>
          </form>
        </div>

        <footer>
      {/* Footer section */}
      <div className={LandingPageCss['footer']}>
        <h3>TRIMTECH BARBERSHOP</h3>
        <div className={LandingPageCss['footer-container']}>
          <div className={LandingPageCss['row']}>
            <div className={LandingPageCss['col']} id="company">
              <p>
                We are specialized in cut hair, make your hairstyle awesome.
                Try our premium services.
              </p>
              <div className={LandingPageCss['social']}>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>

            <div className={LandingPageCss['col']} id="useful-links">
              <h3>Links</h3>
              <div className={LandingPageCss['links']}>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#kapster">Kapsters</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            <div className={LandingPageCss['col']} id="contact">
              <h3>Contact</h3>
              <div className={LandingPageCss['contact-details']}>
                <p>Email: trimtech@gmail.com</p>
              </div>
              <div className={LandingPageCss['contact-details']}>
                <p>Phone: +628 1192 3474</p>
              </div>
            </div>
          </div>
          <div className={LandingPageCss['footer-bottom']}>
            <p>
              copyright &copy;2023 TrimtechBarbershop. designed by{' '}
              <span>TRIMTECHSQUAD</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
      </main>
    </>
  );
}





