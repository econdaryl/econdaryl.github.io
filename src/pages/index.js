import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import SEO from "../components/seo";
import SocialLinks from "../components/sociallinks";
// import PortfolioList from "../components/list-portfolio";
import BlogList from "../components/list-blog";
// import Contact from "../components/contact";
import "../style/wall.less";
import Particles from 'react-particles-js'

let particlesOptions = {
"particles": {
    "number": {
    "value": 130,
    "density": {
        "enable": true,
        "value_area": 800
    }
    },
    "color": {
    "value": "#357793"
    },
    "shape": {
    "type": "triangle",
    "stroke": {
        "width": 0,
        "color": "#000000"
    },
    "polygon": {
        "nb_sides": 5
    }
    },
    "opacity": {
    "value": 0.12,
    "random": false,
    "anim": {
        "enable": false,
        "speed": 0.24678561733422155,
        "opacity_min": 0.1,
        "sync": false
    }
    },
    "size": {
    "value": 3,
    "random": true,
    "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
    }
    },
    "line_linked": {
    "enable": true,
    "distance": 150,
    "color": "#ffffff",
    "opacity": 0.30,
    "width": 1
    },
    "move": {
    "enable": true,
    "speed": 1.6241544246026904,
    "direction": "none",
    "random": false,
    "straight": false,
    "out_mode": "out",
    "bounce": false,
    "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
    }
    }
},
"interactivity": {
    "detect_on": "canvas",
    "events": {
    "onhover": {
        "enable": true,
        "mode": "grab"
    },
    "onclick": {
        "enable": true,
        "mode": "push"
    },
    "resize": true
    },
    "modes": {
    "grab": {
        "distance": 185.08921300066618,
        "line_linked": {
        "opacity": 0.3167088945192694
        }
    },
    "repulse": {
        "distance": 24.678561733422153,
        "duration": 0.4
    },
    "push": {
        "particles_nb": 4
    }
    }
},
"retina_detect": true
};

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winHeight: "100vh",
            // particleOptions: particlesOptions,
            // darkMode: this.props.data.site.siteMetadata.darkmode
        };
    }

    createSVGElement(n, v) {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);
        for (var p in v) n.setAttributeNS(null, p, v[p]);
        return n;
    }

    componentDidMount() {
        //check dark mode -> particle
        // let darkMode = localStorage.getItem("darkMode") || this.state.darkMode;
        // if (darkMode) {
        //     this.setState({
        //         darkMode: (darkMode === "false")
        //     }, () => {
        //         this.setState({particleOptions: whiteMode});
        //     })
        // }

        this.setWindowHeight();
        let _this = this;
        window.addEventListener("resize", function() {
            _this.setWindowHeight();
        });
        let sWidth = this.svg.clientWidth,
            tText = this.svg.querySelector("text"),
            tWidth = tText.getBoundingClientRect().width;

        if (tWidth > sWidth) {
            let tInnerText = tText.innerHTML;
            if (tInnerText.split(" ").length > 1) {
                tText.innerHTML = "";
                tInnerText.split(" ").forEach(function(e, i) {
                    let tSpan = _this.createSVGElement("tspan", {
                        dy: i === 0 ? "0em" : ".8em",
                        x: "50"
                    });
                    tSpan.innerHTML = e;
                    tText.appendChild(tSpan);
                });
                setTimeout(function() {
                    _this.svg.style.height =
                        tText.getBoundingClientRect().height + 70;
                    _this.svg.style.margin = "15px auto";
                }, 250);
            } else {
                while (tWidth > sWidth) {
                    let fontSize = parseInt(
                        window
                            .getComputedStyle(tText, null)
                            .getPropertyValue("font-size")
                    );
                    tText.style.fontSize = fontSize - 1 + "px";
                    tWidth = tText.getBoundingClientRect().width;
                }
            }
        }
    }
    setWindowHeight() {
        this.setState({
            winHeight: window.innerHeight
        });
    }
    render() {
        return (
            <Layout placeholder={false}>
                <SEO
                    lang="en"
                    title={this.props.data.site.siteMetadata.title}
                />
                
                <div
                    className="wall"
                    style={{ height: this.state.winHeight + "px", }}
                >
                    <Particles className="particles" params={particlesOptions}></Particles>
                    <div className="intro container" style={{zIndex: 1}}>
                        {/* particles!!! */}
                        
                        <div className="main-title text-primary" style={{backgroundColor: "#ffffff00"}}>
                        
                            <svg
                                width="90%"
                                height="220px"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid slice"
                                ref={c => (this.svg = c)}
                            >
                                {this.props.data.site.siteMetadata
                                    .capitalizeTitleOnHome
                                    ? this.props.data.site.siteMetadata.title.toUpperCase()
                                    : this.props.data.site.siteMetadata.title}
                                <pattern
                                    id="wallPattern"
                                    patternUnits="userSpaceOnUse"
                                    width="100"
                                    height="50"
                                >
                                    <rect
                                        x="0"
                                        y="0"
                                        className=""
                                        width="100"
                                        height="100"
                                    />
                                    <image
                                        xlinkHref="https://res.cloudinary.com/markdid/image/fetch/q_auto,f_auto/https://markdid.github.io/images/ocean.jpg"
                                        height="50"
                                        width="100"
                                        y="0"
                                        preserveAspectRatio="none">
                                    </image>
                                </pattern>
                                <text
                                    fill="url(#wallPattern)"
                                    textAnchor="middle"
                                    x="50"
                                    y="50"
                                >
                                    {this.props.data.site.siteMetadata
                                        .capitalizeTitleOnHome
                                        ? this.props.data.site.siteMetadata.title.toUpperCase()
                                        : this.props.data.site.siteMetadata
                                              .title}
                                </text>
                            </svg>
                            
                        </div>
                        <p className="tag-line text-secondary">
                            {this.props.data.site.siteMetadata.introTag}
                        </p>
                        <p className="caption text-tertiary">
                            I made this site to show I can develop things. And create things. 👍
                        </p>
                        {/* <a href="https://github.com/markdid" className="btn">
                            SEE MY STUFF
                        </a> */}
                        <Link to="/portfolio" className="btn zAbove">SEE MY STUFF</Link>
                    {/*    replace above with Link component for portfolio*/}
                    
                    </div>
                    
                    <div className="social-buttons">
                        <SocialLinks /> 
                    </div>
                    
                </div>
                {/*<PortfolioList />*/}
                <BlogList />
                {/*<Contact />*/}
            </Layout>
        );
    }
}

export default IndexPage;

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
                darkmode
                capitalizeTitleOnHome
                titleImage
                introTag
                description
                social {
                    name
                    url
                    icon
                }
            }
        }
    }
`;
