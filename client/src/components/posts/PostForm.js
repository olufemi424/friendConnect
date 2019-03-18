import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/postActions";

class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      text: this.state.text
    };
    this.props.addPost(newPost);
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props;

    return (
      <div className="feed-user">
        <a href="#! " className="feed-user__photo--link">
          <img className="feed-user__photo" src={user.avatar} alt="" />
        </a>

        <div className="feed-user__input--box">
          <form className="feed-user__form" onSubmit={this.handleSubmit}>
            <textarea
              className="feed-user__form__input"
              placeholder="Create a post..."
              value={this.state.text}
              name="text"
              onChange={this.handleChange}
            />
            <div className="feed-user__form__actions">
              <p className="feed-user__form__error">
                {errors ? errors.text : null}
              </p>
              <button type="submit" className="feed-user__form__button">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
