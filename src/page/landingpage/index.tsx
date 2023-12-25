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
      <header style={{ display: "flex", alignItems: "center" }}>
        <div
          className={`${LandingPageCss["container"]} ${LandingPageCss["container-nav"]} `}
          style={{ alignItems: "center" }}
        >
          <div
            className={LandingPageCss["logo"]}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src="img/logo.png" alt="" />
            <div className={LandingPageCss["logo-text"]}>
              <h1>Trimtech </h1>
              <h1 style={{ marginLeft: "1rem" }}>Barbershop</h1>
            </div>
          </div>
          <nav>
            <ul style={{ display: "flex", alignItems: "center" }}>
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
                  <Link to="/login" style={{ padding: 0 }}>
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

        <div
          className={LandingPageCss["about"]}
          id="about"
          style={{ height: "100vh", padding: "5rem" }}
        >
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

        <div
          className={LandingPageCss["service"]}
          id="service"
          style={{ padding: "5rem" }}
        >
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
              <div
                key={item.id}
                className={LandingPageCss["kaps-container"]}
                style={{
                  margin: 0,
                  justifyContent: "center",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
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
          </div>
        </div>
      </main>
    </>
  );
}
