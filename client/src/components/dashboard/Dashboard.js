import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import TagDataService from "./service";
import axios from "axios";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  state = {
    message: "",
    tag: "",
    posts: [],
    searchTitle: "",
  };
  componentDidMount = () => {
    this.getPost();
  };
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }
  findByTitle(title) {
   // return http.get(`/tutorials?title=${title}`);
  }
  //geting the api point from end 
  getPost = () => {
    axios
      .get("/api/message/gettingalldocs")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      message: this.state.message,
      tag: this.state.tag,
    };
    //api end point from the back 
    axios({
      url: "/api/message/postmessage",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetUserInputs();
        this.getPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetUserInputs = () => {
    this.setState({
      message: "",
      tag: "",
    });
  };

  displayPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.message}</h3>
        <p>{post.tag}</p>
      </div>
    ));
  };
  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1"></p>
            </h4>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              //value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
            <form onSubmit={this.submit}>
              <div className="form-input">
                <input
                  type="text"
                  name="message"
                  placeholder="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-input">
                <textarea
                  placeholder="tag"
                  name="tag"
                  cols="30"
                  rows="10"
                  value={this.state.tag}
                  onChange={this.handleChange}
                ></textarea>
              </div>

              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Submit
              </button>
            </form>

            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
          <div className="blog-">{this.displayPost(this.state.posts)}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
