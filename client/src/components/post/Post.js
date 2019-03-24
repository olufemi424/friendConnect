import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { getPost } from "../../store/actions/postActions";
import CommentFeed from "./CommentFeed";
import CommentFeedPostItem from "./CommentFeedPostItem";

class Post extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPost(id);
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <CommentFeedPostItem post={post} showActions={false} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="single-post">
        <div className="container">{postContent}</div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
