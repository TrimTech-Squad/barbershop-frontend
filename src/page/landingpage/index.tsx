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
  [x: string]: unknown;
  id: number;
  name: string;
  specialization: string;
  gender: "Man" | "Woman";
  photo_url: string;
  status: "Available" | "Not Available" | "Resigned";
};

const hours = [
  {
    hour: "08:00",
    status: "Available",
  },

  {
    hour: "08:30",
    status: "Available",
  },
  {
    hour: "09:00",
    status: "Available",
  },
  {
    hour: "09:30",
    status: "Available",
  },
  {
    hour: "10:00",
    status: "Available",
  },
  {
    hour: "10:30",
    status: "Available",
  },
  {
    hour: "11:00",
    status: "Available",
  },
  {
    hour: "11:30",
    status: "Available",
  },
  {
    hour: "13:00",
    status: "Available",
  },
  {
    hour: "13:30",
    status: "Available",
  },
  {
    hour: "14:00",
    status: "Available",
  },
  {
    hour: "14:30",
    status: "Available",
  },
  {
    hour: "15:00",
    status: "Available",
  },
  {
    hour: "15:30",
    status: "Available",
  },
  {
    hour: "16:00",
    status: "Available",
  },
  {
    hour: "16:30",
    status: "Available",
  },
  {
    hour: "18:30",
    status: "Available",
  },
];

export default function LandingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [kapsters, setKapsters] = useState<Kapster[]>([]);

  const [serviceSelectedId, setServiceSelectedId] = useState<string>("");
  const [kapsterSelectedId, setKapsterSelectedId] = useState<number>(0);
  const [kapstersWithSelectedServices, setKapstersWithSelectedServices] =
    useState<Kapster[]>([]);

  const [selectedTime, setSelectedTime] = useState<"today" | "tomorrow">(
    "today"
  );

  const [hoursArr, setHoursArr] = useState(hours);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const date = new Date();

    date.setDate(date.getDate() + (selectedTime === "today" ? 0 : 1));

    const fetchSchedule = async () => {
      const response = await fetchApi(
        `/kapsters/${kapsterSelectedId}/schedules?date=${date.toISOString()}`,
        "GET"
      );

      setHoursArr(
        hours.map((hour) => {
          for (const schedule of response.data) {
            if (schedule.hour === hour.hour) {
              hour.status = "Not Available";
            }
          }
          return hour;
        })
      );
    };
    fetchSchedule();
  }, [kapsterSelectedId, selectedTime]);

  useEffect(() => {
    setKapstersWithSelectedServices([]);
    for (const kapster of kapsters) {
      for (const service of kapster.services as Service[]) {
        if (service.id === Number(serviceSelectedId)) {
          setKapstersWithSelectedServices((prev) => [...prev, kapster]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kapsters, serviceSelectedId, kapsters]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetchApi("/services", "GET");
      setServices(response.data);
      setServiceSelectedId(String(response.data[0]?.id ?? 0));
    };
    fetchServices();
    const fetchKapsters = async () => {
      const response = await fetchApi("/kapsters", "GET");
      setKapsters(response.data);
      setKapsterSelectedId(response.data[0]?.id ?? 0);
    };
    fetchKapsters();

    const date = new Date();

    setHoursArr(
      hours.map((hour) => {
        if (date.getHours() >= Number(hour.hour.split(":")[0])) {
          hour.status = "Not Available";
        }
        return hour;
      })
    );
  }, []);

  const date = new Date();

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
            <h2>About Us</h2>
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
            {/* <a
              href="#"
              className={`${LandingPageCss["button"]} ${LandingPageCss["btn-about"]} `}
            >
              BOOKING NOW
            </a> */}
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

        {/* Appointment Form */}
        <div className={LandingPageCss["appointment"]} id="contact">
          <div id="body_header">
            <h1>Appointment Request Form</h1>
            <p>Make your appointments easier</p>
          </div>
          <form action="#" method="post">
            <fieldset>
              <legend>
                <span className={LandingPageCss["number"]}>2</span>Appointment
                Details
              </legend>
              <label htmlFor="service">Service</label>
              <select
                id="service_id"
                name="service_id"
                required
                onChange={(_e) => setServiceSelectedId(_e.currentTarget.value)}
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.serviceName}
                  </option>
                ))}
              </select>
              <label htmlFor="appointment_for">Appointment for Kapster*:</label>
              <select
                id="kapsterId"
                required
                onChange={(e) =>
                  setKapsterSelectedId(parseInt(e.currentTarget.value ?? 0))
                }
              >
                {kapstersWithSelectedServices.map((kapster) => (
                  <option key={kapster.id} value={kapster.id}>
                    {kapster.name}
                  </option>
                ))}
              </select>
              <label htmlFor="date">Date*:</label>
              {/* <input type="date" name="date" required /> */}
              <select
                value={selectedTime}
                onChange={(e) =>
                  setSelectedTime(e.currentTarget.value as "today" | "tomorrow")
                }
              >
                {!(date.getDay() % 6) ? (
                  <>
                    <option value="closed" disabled>
                      CLossed
                    </option>
                  </>
                ) : (
                  <>
                    <option value="today">Today</option>
                    {date.setDate(date.getDate() + 1)}
                    {date.getDay() % 6 && (
                      <option value="tomorrow">Tomorrow</option>
                    )}
                  </>
                )}
              </select>

              <select name="" id="" className={LandingPageCss["dtt"]}>
                {hoursArr.map((hour) => (
                  <option
                    disabled={hour.status === "Available" ? false : true}
                    key={hour.hour}
                    value={hour.hour}
                    style={
                      hour.status === "Available"
                        ? { color: "black" }
                        : { color: "red" }
                    }
                  >
                    {hour.hour}
                  </option>
                ))}
              </select>
            </fieldset>
            <button type="submit">Request For Appointment</button>
          </form>
        </div>

        <footer>
          {/* Footer section */}
          <div className={LandingPageCss["footer"]}>
            <h3>TRIMTECH BARBERSHOP</h3>
            <div className={LandingPageCss["footer-container"]}>
              <div className={LandingPageCss["row"]}>
                <div className={LandingPageCss["col"]} id="company">
                  <p>
                    We are specialized in cut hair, make your hairstyle awesome.
                    Try our premium services.
                  </p>
                  <div className={LandingPageCss["social"]}>
                    <a href="#">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>

                <div className={LandingPageCss["col"]} id="useful-links">
                  <h3>Links</h3>
                  <div className={LandingPageCss["links"]}>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#kapster">Kapsters</a>
                    <a href="#contact">Contact</a>
                  </div>
                </div>

                <div className={LandingPageCss["col"]} id="contact">
                  <h3>Contact</h3>
                  <div className={LandingPageCss["contact-details"]}>
                    <p>Email: trimtech@gmail.com</p>
                  </div>
                  <div className={LandingPageCss["contact-details"]}>
                    <p>Phone: +628 1192 3474</p>
                  </div>
                </div>
              </div>
              <div className={LandingPageCss["footer-bottom"]}>
                <p>
                  copyright &copy;2023 TrimtechBarbershop. designed by{" "}
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
