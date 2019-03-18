import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../store/actions/postActions";

class CommentForm extends Component {
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
    const { postId } = this.props;
    const newComment = {
      text: this.state.text
    };

    console.log(newComment);
    //todo call action
    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className="feed-user__form feed-user__form--comment"
      >
        <textarea
          className="feed-user__form__input"
          placeholder="Reply to post"
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          error={errors.text}
        />
        <div className="feed-user__form__actions feed-user__form__actions--comment ">
          <button type="submit" className="feed-user__form--comment--button">
            Comment
          </button>
        </div>
      </form>
    );
  }
}

CommentForm.propTypes = {
  // auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  // postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
