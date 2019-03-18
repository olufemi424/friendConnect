import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike
} from "../../store/actions/postActions";

// SVG
import thumbsup from "../../img/SVG/thumbsup.svg";
import thumbsdown from "../../img/SVG/thumbsdown.svg";
import times from "../../img/SVG/trash.svg";

class PostItem extends Component {
  handleDeleClick = e => {
    const id = this.props.post._id;
    this.props.deletePost(id);
  };

  handleLikeClick = e => {
    const id = this.props.post._id;
    this.props.addLike(id);
  };

  handleRemoveLikeClick = e => {
    const id = this.props.post._id;
    this.props.removeLike(id);
  };

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="post">
        <div className="post--user">
          <div className="post--user__info">
            <a href="#!" className="post--user__link">
              <img className="feed-user__photo" src={post.avatar} alt="" />
            </a>
            <a href="#!" className="post--user__name">
              {post.name}
            </a>
          </div>
          <div className="post--user__content">
            <p className="post--user__content--text">{post.text}</p>
            {showActions ? (
              <div className="post--user__content--action">
                <div className="post--user__content--action--box1">
                  <button
                    onClick={this.handleLikeClick}
                    type="button"
                    className="post--user__button"
                  >
                    <span className="post--user__likes-count">
                      {post.likes.length}
                    </span>
                    <img
                      className="dashboard-menu__icon"
                      alt="thumbsup"
                      src={thumbsup}
                    />
                  </button>
                  <button
                    onClick={this.handleRemoveLikeClick}
                    type="button"
                    className="post--user__button"
                  >
                    <img
                      className="dashboard-menu__icon"
                      alt="thumbdown"
                      src={thumbsdown}
                    />
                  </button>
                  <Link
                    to={`/post/${post._id}`}
                    className="post--user__comment"
                  >
                    <span>
                      {post.comments.length ? post.comments.length : "0"}
                    </span>{" "}
                    Comments
                  </Link>
                </div>
                <div className="post--user__content--action--box2">
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.handleDeleClick}
                      type="button"
                      className="post--user__button"
                    >
                      <img
                        className="dashboard-menu__icon"
                        src={times}
                        alt=""
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
