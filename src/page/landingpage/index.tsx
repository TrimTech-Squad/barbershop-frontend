import { Link } from "react-router-dom";
import LandingPageCss from "./style.module.css";
import {
  useState,
  useEffect,
  useContext,
  useRef,
  FormEventHandler,
} from "react";
import fetchApi from "../../helper/fetch";
import AuthContext from "../../context/auth";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

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

  const [kapsterServices, setKapsterServices] = useState<
    { price: number; id: number; service: Service; kapster: Kapster }[]
  >([]);

  const [serviceSelectedId, setServiceSelectedId] = useState<number>(0);
  const [kapsterSelectedId, setKapsterSelectedId] = useState<number>(0);
  const [kapstersWithSelectedServices, setKapstersWithSelectedServices] =
    useState<Kapster[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [kapsterSeviceSelectedId, setKapsterSeviceSelectedId] =
    useState<number>(0);

  const [selectedTime, setSelectedTime] = useState<"today" | "tomorrow">(
    "today"
  );
  const [bookingTime, setBookingTime] = useState<string>("08:00");

  const [hoursArr, setHoursArr] = useState(hours);

  const authContext = useContext(AuthContext);

  const formRef = useRef<HTMLFormElement>(null);

  const makeReservation: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const date = new Date();
      selectedTime === "tomorrow" && date.setDate(date.getDate() + 1);
      date.setHours(Number(bookingTime.split(":")[0]));
      const response = await fetchApi("/order", "POST", {
        kapsterServiceId: kapsterSeviceSelectedId,
        booking_time: date,
      });

      if (response.code === 201) {
        alert("Appointment success");
        open(response.data.redirect_url, "_blank");
        formRef.current?.reset();
      } else {
        alert("Appointment failed");
      }
    } catch (e) {
      alert("Appointment failed");
    }
  };

  useEffect(() => {
    const date = new Date();

    if (selectedTime === "tomorrow") {
      date.setDate(date.getDate() + 1);
    }

    const hour = bookingTime.split(":")[0];
    date.setHours(Number(hour));
    const minutes = bookingTime.split(":")[1];
    date.setMinutes(Number(minutes));

    const fetchSchedule = async () => {
      const response = await fetchApi(
        `/kapsters/${kapsterSelectedId}/schedules?date=${date.toISOString()}`,
        "GET"
      );

      setHoursArr(
        hours.map((hour) => {
          hour.status = "Available";
          for (const schedule in response.data) {
            if (hour.hour === schedule) {
              hour.status = "Not Available";
            }
            if (date.getHours() >= Number(hour.hour.split(":")[0])) {
              hour.status = "Not Available";
            }
          }
          return hour;
        })
      );
    };
    fetchSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTime, kapsterSelectedId, selectedTime]);

  useEffect(() => {
    const foundKapsterService = kapsterServices.find(
      (kapsterService) =>
        kapsterService.kapster.id === kapsterSelectedId &&
        kapsterService.service.id === serviceSelectedId
    );

    setPrice(foundKapsterService?.price ?? 0);
    setKapsterSeviceSelectedId(foundKapsterService?.id ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSelectedId, kapsterSelectedId]);

  useEffect(() => {
    setKapstersWithSelectedServices([]);
    for (const kapster of kapsterServices) {
      if (kapster.service.id === serviceSelectedId) {
        setKapstersWithSelectedServices((prev) => [...prev, kapster.kapster]);
        setKapsterSelectedId(kapster.kapster.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSelectedId]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetchApi("/services", "GET");
      setServices(response.data);
      setServiceSelectedId(Number(response.data[0]?.id ?? 0));
    };
    fetchServices();
    const fetchKapsters = async () => {
      const response = await fetchApi("/kapsters", "GET");
      setKapsters(response.data);
      setKapsterSelectedId(response.data[0]?.id ?? 0);
    };
    fetchKapsters();
    const fetchKapsterServices = async () => {
      const response = await fetchApi("/kapster-service", "GET");
      setKapsterServices(response.data);
    };
    fetchKapsterServices();

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

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openPopOver = Boolean(anchorEl);

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
                <a
                  style={{ marginTop: "1rem" }}
                  href={authContext.user ? "#appointment" : "/signin"}
                >
                  Appointment
                </a>
              </li>
            </ul>
          </nav>
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
                <Avatar />
                <Typography fontWeight="bold" onClick={handleClick}>
                  {authContext.user.name}
                </Typography>
                <Popover
                  open={openPopOver}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <MenuList
                    sx={{
                      width: "15rem",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/user"
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText>See History Appointment</ListItemText>
                      </MenuItem>
                    </Link>
                    <Link
                      onClick={() => authContext.logout()}
                      style={{ textDecoration: "none", color: "inherit" }}
                      to="/signin"
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Popover>
              </>
            ) : (
              <Link to="/signin" style={{ padding: 0 }}>
                <button className={LandingPageCss["button-lgn"]}>Login</button>{" "}
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <div id="home" className={LandingPageCss["home"]}>
          <div className={LandingPageCss["overlay"]}>
            <div className={LandingPageCss["landing-text"]}>
              <h3>Getting your hair ready</h3>
              <h1>Trimtech Barbershop</h1>
              <hr id="hr-main" />
              <a
                style={{ marginTop: "1rem" }}
                href={authContext.user ? "#appointment" : "/signin"}
                className={LandingPageCss["btn-hire"]}
              >
                Make an Appointment
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
            <h1>About Us</h1>
            <p>
              Tucked away on a sunny corner, our barber shop isn't just about
              haircuts. It's a friendly haven where stories are swapped,
              laughter cracks like lightning, and good vibes buzz with the
              clippers. Forget fancy salons – we're all about genuine smiles and
              down-to-earth style. Our barbers are the real magic. They're more
              than just scissor slingers, they're confidantes, listeners, and
              maybe even unofficial therapists. They'll sculpt your mane into a
              masterpiece and leave you feeling confident enough to own the
              streets. They know your name, your favorite cut, and probably the
              name of your pet goldfish. So, skip the sterile salons and come on
              down. Grab a seat, share a laugh, and let us shape not just your
              hair, but your experience. We're more than a barber shop – we're
              family. (Just don't mention the goldfish in front of Mr. Johnson,
              he still thinks it's a lamp.)
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
            <h4>Our Services</h4>
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
        {authContext.user && authContext.user?.role !== "Admin" && (
          <div className={LandingPageCss["appointment"]} id="appointment">
            <div id="body_header">
              <h1>Appointment Request Form</h1>
              <p>Make your appointments easier</p>
            </div>
            <form
              action="#"
              method="post"
              onSubmit={makeReservation}
              ref={formRef}
            >
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
                  onChange={(_e) =>
                    setServiceSelectedId(parseInt(_e.currentTarget.value ?? 0))
                  }
                  className={LandingPageCss["form-component"]}
                  value={serviceSelectedId}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.serviceName}
                    </option>
                  ))}
                </select>
                <label htmlFor="appointment_for">
                  Appointment for Kapster*:
                </label>
                <select
                  className={LandingPageCss["form-component"]}
                  required
                  id="kapsterId"
                  onChange={(e) =>
                    setKapsterSelectedId(parseInt(e.currentTarget.value ?? 0))
                  }
                  value={kapsterSelectedId}
                >
                  {kapstersWithSelectedServices.map((kapster) => (
                    <option key={kapster.id} value={kapster.id}>
                      {kapster.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="price">Price</label>
                <input
                  className={LandingPageCss["form-component"]}
                  style={{ padding: "0.5rem 1rem" }}
                  type="text"
                  name="price"
                  required
                  placeholder="Rp."
                  value={"Rp. " + price}
                  disabled
                />
                <label htmlFor="date">Date*:</label>
                <select
                  className={LandingPageCss["form-component"]}
                  required
                  value={selectedTime}
                  onChange={(e) =>
                    setSelectedTime(
                      e.currentTarget.value as "today" | "tomorrow"
                    )
                  }
                >
                  {!(date.getDay() % 6) ? (
                    <>
                      <option disabled>CLossed</option>
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

                <select
                  className={LandingPageCss["form-component"]}
                  required
                  name="hour"
                  onChange={(e) => setBookingTime(e.currentTarget.value)}
                >
                  <option value="" selected disabled hidden>
                    Select Hour
                  </option>
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
        )}

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
