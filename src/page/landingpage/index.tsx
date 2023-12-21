import LandingPageCss from "./style.module.css";

export default function LandingPage() {
  return (
    <>
      <header>
        <div
          className={`${LandingPageCss["container"]} ${LandingPageCss["container-nav"]} `}
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
              <div>
                <a href="loginpage/index.html">
                  <button className={LandingPageCss["button-lgn"]}>
                    Login
                  </button>{" "}
                </a>
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
            <div className={LandingPageCss["service-cut"]}>
              <div className={LandingPageCss["image-service"]}>
                <img src="img/service/scissor.png" alt="" />
              </div>
              <h3>Hair Cut</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vitae harum placeat sint culpa nisi, fugiat sed quos
                optio quam mollitia deserunt ab blanditiis velit vel
                necessitatibus! Reiciendis, repellat maxime.
              </p>
            </div>

            <div className="service-cut">
              <div className={LandingPageCss["image-service"]}>
                <img src="img/service/barber.png" alt="" />
              </div>
              <h3>Massage</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vitae harum placeat sint culpa nisi, fugiat sed quos
                optio quam mollitia deserunt ab blanditiis velit vel
                necessitatibus! Reiciendis, repellat maxime.
              </p>
            </div>

            <div className="service-cut">
              <div className={LandingPageCss["image-service"]}>
                <img src="img/service/razor.png" alt="" />
              </div>
              <h3>Razor Cut</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vitae harum placeat sint culpa nisi, fugiat sed quos
                optio quam mollitia deserunt ab blanditiis velit vel
                necessitatibus! Reiciendis, repellat maxime.
              </p>
            </div>

            <div className="service-cut">
              <div className={LandingPageCss["image-service"]}>
                <img src="img/service/hairstyle.png" alt="" />
              </div>
              <h3>Hairstyle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium vitae harum placeat sint culpa nisi, fugiat sed quos
                optio quam mollitia deserunt ab blanditiis velit vel
                necessitatibus! Reiciendis, repellat maxime.
              </p>
            </div>
          </div>
        </div>

        <div className={LandingPageCss["kapster"]} id="kapster">
          <div className={LandingPageCss["kaps-text"]}>
            <h2>OUR KAPSTER</h2>
          </div>

          <div className={LandingPageCss["kaps-item"]}>
            <div className={LandingPageCss["kaps-container"]}>
              <div className={LandingPageCss["kaps-image"]}>
                <img src="img/kapster/1.jpg" alt="" />
              </div>
              <h3>Clarissa</h3>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
