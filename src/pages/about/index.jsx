/* eslint-disable react/no-unescaped-entities */
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { FaInfoCircle, FaMusic, FaYoutube, FaLinkedinIn, FaGithub } from "react-icons/fa";

import * as CONSTANTS from "../../common/constants";
import api from "@/services/api";
import AppLayout from "@/components/common/app-layout/app-layout";
import AppFeatureBanner from "@/components/common/app-feature-banner/app-feature-banner";
import YoutubePlayer from "@/components/shared/youtube-player/youtube-player";
import TestimonialWidget from "@/components/shared/testimonial-widget/testimonial-widget";
import heroBackgroundImg from "../../assets/images/about/double-colors-exposure.jpg";
import profilePicture from "../../assets/images/about/photoshoot-at-central-ferry-piers.jpg";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PageAbout = ({ testimonialEntries }) => {

    const aWeekOfMyWeek = {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {},
                },
                title: {
                    display: true,
                    // text: "Time Spent",
                    text: "A Week Of My Life",
                    font: {
                        size: 18,
                    },
                },
            },
            scales: {
                y: {
                    grid: {
                        display: true,
                        color: "#eeeeee",
                    },
                    title: {
                        display: true,
                        text: "# of Hours",
                    },
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 12,
                        },
                        labelOffset: -5,
                        // Create scientific notation labels
                        // callback: function(value, index, values) {
                        //     return value + " hours";
                        // }
                    },
                },
                x: {
                    grid: {
                        display: false,
                        color: "#eeeeee",
                    },
                    title: {
                        display: false,
                        text: "",
                    },
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 12,
                        },
                        labelOffset: 0,
                        // Create scientific notation labels
                        // callback: function(value, index, values) {
                        //     return value + " hours";
                        // }
                    },
                },
            },
        },
        data: {
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            datasets: [
                {
                    label: "Music on Headphone",
                    data: [6, 10, 12.2, 12.5, 13, 12, 7],
                    borderWidth: 1,
                    fill: false,
                    borderColor: "#666666",
                },
                {
                    label: "Work-Out",
                    data: [3, 1.5, 1, 0, 0, 1, 3],
                    borderWidth: 1,
                    fill: false,
                    borderColor: "#8BC43F",
                },
                {
                    label: "Front-End Development",
                    data: [4, 8, 8, 8, 8, 7, 5],
                    borderWidth: 1,
                    fill: false,
                    borderColor: "#F7931D",
                },
                {
                    label: "Experiment",
                    data: [4, 2, 2, 1.5, 1, 2, 5],
                    borderWidth: 1,
                    fill: false,
                    borderColor: "#27AAE1",
                },
            ],
        },
    };

    const ratioOfPassions = {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {},
                },
                title: {
                    display: true,
                    text: "",
                    font: {
                        size: 18,
                    },
                },
            },
            scales: {
                y: {
                    grid: {
                        display: true,
                        color: "#eeeeee",
                    },
                    title: {
                        display: false,
                        text: "",
                    },
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 12,
                        },
                        // labelOffset: -5,
                        // Create scientific notation labels
                        // callback: function(value, index, values) {
                        //     return value + " hours";
                        // }
                    },
                },
                x: {
                    grid: {
                        display: false,
                        color: "#eeeeee",
                    },
                    title: {
                        display: false,
                        text: "",
                    },
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 12,
                        },
                        labelOffset: 0,
                        // Create scientific notation labels
                        // callback: function(value, index, values) {
                        //     return value + " hours";
                        // }
                    },
                },
            },
        },
        data: {
            labels: ["Loud Music", "Javascript", "HTML & CSS", "Designing", "ExpressionEngine", "PHP & MySQL"],
            datasets: [
                {
                    // label: "Music on Headphone",
                    data: [9.8, 9.3, 9.2, 8.0, 7.2, 2.3],
                    borderWidth: 0,
                    fill: false,
                    borderColor: "#666666",
                    backgroundColor: ["#cccccc", "#999999", "#cccccc", "#999999", "#cccccc", "#999999"],
                },
            ],
        },
    };

    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const [isYoutubePlayerOn, setIsYoutubePlayerOn] = useState(false);
    const [isTopSecretExposed, setIsTopSecretExposed] = useState(false);
    const keySequenceRef = useRef([]);

    const toggleProfile = () => setIsProfileExpanded(!isProfileExpanded);

    const openYoutubePlayer = () => setIsYoutubePlayerOn(true);
    const closeYoutubePlayer = () => setIsYoutubePlayerOn(false);

    useEffect(() => {
        const konamiCode = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a",
        ].map((key) => key.toLocaleLowerCase()).join(", ");

        const trackKonamiCodeMatching = (event) => {
            const { key } = event;
            keySequenceRef.current = [...keySequenceRef.current, key.toLocaleLowerCase()];

            console.log("keySequenceRef: ", keySequenceRef.current.join(", "));

            if (keySequenceRef.current.join(", ").indexOf(konamiCode) >= 0) {
                setIsTopSecretExposed(true)
                keySequenceRef.current = [];
                console.log("Konami code entered!");
            }
        };

        document.addEventListener("keydown", trackKonamiCodeMatching);
        console.log("Render");
        return () => {
            document.removeEventListener("keydown", trackKonamiCodeMatching);
        };
    }, []);

    return (
        <>
            <Head>
                <title>{`About | ${CONSTANTS.AUTHOR} | Front-End Web Developer`}</title>
                <meta name="description" content={`This is me, this is Dennis Chow a.k.a. Fat-Cow. A Toronto based front-end web developer with design background currently living in Hong Kong.`} />
            </Head>
            <AppLayout>
                <div className="page-about">
                    <AppFeatureBanner
                        type="hero"
                        heroBackgroundUrl={heroBackgroundImg.src}
                        heading="<span>It'S time to</span> <span>introduce</span> <span>myself</span>"
                        subHeading="Let's get it started"
                    />

                    <div className="profile-container app-container">
                        <div className="group-wrapper">
                            <section className="intro-group">
                                <div className="intro-group__container">
                                    <div className="intro-group__visual"></div>
                                    <div className="intro-group__content">
                                        <p className="intro-group__name">My name is Dennis Chow a.k.a. Fat-Cow</p>

                                        <p className="intro-group__statement">I am a web <strong className="hi-lite hi-lite--orange">developer</strong> with <strong className="hi-lite hi-lite--black">design</strong> background & now focus on <strong className="hi-lite hi-lite--dark-orange">front end</strong> web development</p>
                                        <img className="intro-group__img" width="360" height="360" alt="photoshoot at central ferry piers" src={profilePicture.src} />
                                        <p className="intro-group__quote">By taking things one step at a time, you will find yourself actually mastering each specific skill and accomplishing your goals!</p>
                                        <p className="intro-group__brief">
                                            I enjoy problem-solving and turning them into sleek and easy-to-use interface designs! I'm passionate about client-side logic, fun micro-interactions, content presentation, and writing code that's both beautiful and efficient. Whether it's HTML5, CSS (LESS/SASS), or JavaScript (Vanilla/jQuery/ReactJS), I always tend follow best practices.
                                            <br /><br />
                                            When I'm not in front of my computer, you'll probably find me at the gym lifting weights, jamming out to music with my headphones, indulging in delicious food, or sharing pictures on Instagram.
                                        </p>
                                        <p className="intro-group__buttons-container">
                                            <button className="app-cta app-cta--orange" type="button" onClick={toggleProfile}>
                                                A little bit more <FaInfoCircle />
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {isProfileExpanded && (
                                <section className="profile-group">
                                    <div className="profile-group__container">
                                        <p className="profile-group__header">CODER <span>✖</span> DESIGNER</p>
                                        <div className="profile-group__content">
                                            <p className="profile-group__text">I create content first, clean, functional, logical, search engine spiders friendly, professional websites that validated with W3C standards, resulting in semantic structure and accessible HTML and CSS. 100% of my websites are dedicatedly hand coded. Because I enjoy the romance of "Start From Scratch".</p>
                                            <p className="profile-group__text">For building websites or web-based applications, my gear consists of Photoshop, Illustrator, Visual Studio Code, Sublime Text, HTML, CSS, JavaScript, Gulp, NPM, PHP, and MySQL.  My current CMS of choice is ExpressionEngine (Because I can build instead of manipulating and I love clean code).  Also, loud <strong><a onClick={openYoutubePlayer}>music <FaMusic /></a></strong>, speakers, sub-woofer, headphones, TWS earphones are part of my gear.</p>
                                            <p className="profile-group__text"><strong>Specialties:</strong> Build from scratch, Web code-based prototyping, UI/UX enhancement & troubleshoot, Front-end web development, Semantic and clean HTML structure, CSS styling/hacking, DOM manipulation & data exchange with JavaScript (IIFE/AJAX/JSON), Interactive user interface, Responsive design, Web performance testing, Essential knowledge of SEO and WAI for the web, Eyes for details/design, Web development (desktop and mobile), and Design.</p>
                                            <p className="profile-group__text">Over the past few years, I've been intermittently self-experimenting with AngularJS, Vue, ReactJS, Gatsby, Meteor, C3, Chart, Moment, BEM, jsRender, Handlebar, Jade/Pug, Nunjucks, and CraftCMS, striving to gain some experience in that area.</p>
                                            <div className="profile-group__line-chart">
                                                <Line options={aWeekOfMyWeek.options} data={aWeekOfMyWeek.data} />
                                            </div>
                                            <div className="profile-group__top-secret">
                                                {!isTopSecretExposed ? (
                                                    <p className="profile-group__text">Anymore info? <abbr className="profile-group__konami-code" title="Konami Code">↑ ↑ ↓ ↓ ← → ← → B A</abbr> to unlock the secret if you interested to know more.</p>
                                                ) : (
                                                    <ul className="profile-group__top-secret-list">
                                                        <li className="profile-group__top-secret-list-item">
                                                            <a className="profile-group__top-secret-link" href={CONSTANTS.SOCIAL_URL.linkedIn} target="_blank" rel="noopener noreferrer">
                                                                <span className="profile-group__top-secret-icon">
                                                                    <FaLinkedinIn />
                                                                </span>
                                                                <span className="profile-group__top-secret-text">LinkedIn</span>
                                                            </a>
                                                        </li>
                                                        <li className="profile-group__top-secret-list-item">
                                                            <a className="profile-group__top-secret-link" href={CONSTANTS.SOCIAL_URL.github} target="_blank" rel="noopener noreferrer">
                                                                <span className="profile-group__top-secret-icon">
                                                                    <FaGithub />
                                                                </span>
                                                                <span className="profile-group__top-secret-text">Github</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                            <p className="profile-group__text">Front-End Web Developer responsible for a website's user-facing code and the architecture of its immersive user experiences. As an advanced FEWD, I also made visual design decisions on-the-fly for problem-solving, because some problems of which cannot be solved by writing code alone.</p>
                                            <p className="profile-group__text"><strong>IMPORTANT NOTE:</strong> Just wanted to give you a heads up that I've created a YouTube channel called <a href="https://www.youtube.com/channel/UCzAOAymXn2n6cfljyj4IKNA?sub_confirmation=1" target="_blank" rel="noopener noreferrer">Chillax Vibes Corner <FaYoutube /></a>. Where I've compiled some of my favorite tracks into playlists that are perfect for relaxing, focusing, and getting things done. Whether you're studying, coding, or just need some background music, my playlists are sure to keep you chill and motivated. Go ahead and give it a listen!</p>
                                        </div>
                                    </div>
                                </section>
                            )}

                            <section className="passions-group">
                                <div className="passions-group__container">
                                    <p className="passions-group__header">Ratio of Passions</p>
                                    <p className="passions-group__text">something I enjoy of doing</p>
                                    <div className="passions-group__bar-chart">
                                        <Bar options={ratioOfPassions.options} data={ratioOfPassions.data} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {isYoutubePlayerOn && <YoutubePlayer closeYoutubePlayer={closeYoutubePlayer} />}

                    <TestimonialWidget isContentExpandedByDefault={true} entriesLimitByDefault={6} testimonialEntries={testimonialEntries} />
                </div>
            </AppLayout>
        </>
    );
}

export default PageAbout;

export async function getStaticProps() {
    try {
        const [testimonials] = await Promise.all([
            api.get.testimonials(),
        ]);

        return {
            props: {
                testimonialEntries: testimonials.data,
            }, // will be passed to the page component as props
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                testimonialEntries: [],
            },
        };
    }
}
