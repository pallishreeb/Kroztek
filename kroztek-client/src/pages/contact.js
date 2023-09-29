import React from "react";

function Contact() {
  return (
    <div style={styles.container}>
      <div style={styles.centered}>
        <h1 style={styles.title}>Post your Query</h1> {/* Centered Header */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScNgpvZuKBgk95D3I7wgEQHPOwlIz-kElbJCqdy6okZAn1N7Q/viewform?embedded=true"
          title="myform"
          width="100%"
          height="614"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  centered: {
    maxWidth: "800px",
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    textAlign: "center", // Center-align the content
  },
  title: {
    margin: "0", // Remove default margin to center the text vertically
  },
};

export default Contact;
