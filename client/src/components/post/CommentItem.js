import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../store/actions/postActions";

// SVG
import times from "../../img/SVG/trash.svg";

export class CommentItem extends Component {
  handleDeleClick = e => {
    const {
      postId,
      comment: { _id: commentId }
    } = this.props;
    console.log(postId, commentId);
    this.props.deleteComment(postId, commentId);
  };
  render() {
    const { comment, auth } = this.props;
    return (
      <div className="post">
        <div className="post--user">
          <div className="post--user__info">
            <a href="#!" className="post--user__link">
              <img className="feed-user__photo" src={comment.avatar} alt="" />
            </a>
            <a href="#!" className="post--user__name">
              {comment.name}
            </a>
          </div>
          <div className="post--user__content">
            <p className="post--user__content--text">{comment.text}</p>
            <div className="post--user__content--action">
              <div className="post--user__content--action--box1" />
              <div className="post--user__content--action--box2">
                {comment.user === auth.user.id ? (
                  <button
                    onClick={this.handleDeleClick}
                    type="button"
                    className="post--user__button"
                  >
                    <img className="dashboard-menu__icon" src={times} alt="" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
