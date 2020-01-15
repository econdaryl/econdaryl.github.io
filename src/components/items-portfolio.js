import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import "../style/list-portfolio.less";
import "../../static/images/icon.png"

class PortfolioItem extends React.Component {

    render() {
        const imgSize = {marginRight: "24px", marginTop: "24px", height: "48px", width: "48px"}
        return (
            <div className="item col s12" style={{marginBottom: "0px"}}>
                <div className="row flex">
                    <div className="col m6 image">
                        <Img
                            fluid={
                                this.props.data.node.frontmatter.image
                                    .childImageSharp.fluid
                            }
                        />
                        <Link
                            to={this.props.data.node.fields.slug}
                            title={this.props.data.node.frontmatter.title}
                            aria-label={this.props.data.node.frontmatter.title}
                            className="overlay-link"
                            style={{ opacity: 0 }}
                        >
                            {this.props.data.node.frontmatter.title}
                        </Link>
                    </div>
                    <div className="col m6 content">
                        <h2 className="text-primary pseudo-divider">
                            <Link
                                to={this.props.data.node.fields.slug}
                                title={this.props.data.node.frontmatter.title}
                                aria-label={
                                    this.props.data.node.frontmatter.title
                                }
                            >
                                {this.props.data.node.frontmatter.title}
                            </Link>
                        </h2>
                        <p className="text-tertiary">
                            {this.props.data.node.frontmatter.description}
                        </p>
                        {/* <p className="text-tertiary">Built with: 
                            {this.props.data.node.frontmatter.technologies.map(function(item, index){
                                return <span key={index}> {item}</span>
                            })}
                        </p> */}

                        <div className="text-tertiary">
                            {this.props.data.node.frontmatter.technologies.map(function(item, index){
                                return <img key={index} src={"/images/" + item +".svg"} style={imgSize} alt={item}></img>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default function(props) {
    const data = props.data.allMarkdownRemark.edges;
    let items = [];
    data.forEach(function(e, i) {
        items.push(<PortfolioItem key={e.node.id} data={e}/>);
    });
    return <div className="row">{items}</div>;
}
