import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-muted mt-5 py-3 text-center">
      Copyright &copy; {new Date().getFullYear()} FriendConnect
    </footer>
  );
};

export default Footer;
