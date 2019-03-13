import React, { Component } from "react";
import PropTypes from "prop-types";

import book from "../../img/SVG/book.svg";

class ProfileGithub extends Component {
  state = {
    clientId: "98126451bde212b6008c",
    clientSecret: "32d3d54e316973a3294ea25bf0d596a82c96634d",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  _isMounted = false;

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    this._isMounted = true;

    if (username) {
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
        .then(res => res.json())
        .then(data => {
          if (data) {
            if (this._isMounted) {
              this.setState({
                repos: data
              });
            }
          }
        })
        .catch(err => console.log(err));
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="repo__items margin-bottom--md">
        <div className="github--top">
          <h4>
            <a
              href={repo.html_url}
              className="github--name"
              rel="noopener noreferrer"
            >
              <img src={book} alt={book} className="github--icon" />
              {repo.name}
            </a>
          </h4>
          <div className="github__meta">
            <span className="github__meta--item">
              {" "}
              Stars: {repo.stargazers_count}
            </span>
            <span className="github__meta--item">
              Watchers: {repo.watchers_count}
            </span>
            <span className="github__meta--item">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
        <div className="github--bottom">
          <p>
            <strong>Language: </strong>
            {repo.language ? repo.language : "Not Available"}
          </p>
          <p>
            <strong>Description: </strong>{" "}
            {repo.description ? repo.description : "Not Available"}
          </p>
        </div>
        <hr className="margin-bottom--md margin-top--md" />
      </div>
    ));
    return (
      <div className="github" ref="myRef">
        <h3 className="heading-tertiary--main">Latest Github Repos</h3>
        <hr className="margin-bottom--md margin-top--md" />
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
