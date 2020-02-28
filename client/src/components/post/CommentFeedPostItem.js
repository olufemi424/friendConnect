import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	deletePost,
	addLike,
	removeLike
} from "../../store/actions/postActions";

import CommentForm from "./CommentForm";

const commentFeedPostItem = props => {
	// const handleDeleClick = e => {
	// 	const id = this.props.post._id;
	// 	this.props.deletePost(id);
	// };

	// const handleLikeClick = e => {
	// 	const id = this.props.post._id;
	// 	this.props.addLike(id);
	// };

	// const handleRemoveLikeClick = e => {
	// 	const id = this.props.post._id;
	// 	this.props.removeLike(id);
	// };

	// const findUserLike = likes => {
	// 	const { auth } = this.props;
	// 	if (likes.filter(like => like.user === auth.user.id).length > 0) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };

	const { post } = props;
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
					<div className="post--user__content--action">
						<div className="feed-user__input--box">
							<CommentForm postId={post._id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

commentFeedPostItem.defaultProps = {
	showActions: true
};

commentFeedPostItem.propTypes = {
	post: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired
};

const mapDispatchToProps = {
	deletePost,
	addLike,
	removeLike
};

export default connect(null, mapDispatchToProps)(commentFeedPostItem);
