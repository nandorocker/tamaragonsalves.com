// JavaScript to hide the email
document.addEventListener("DOMContentLoaded", function () {
  // Parts of the email address
  const user = "info";
  const domain = "tamaragonsalves.com";

  // Combine parts to form the full email
  const email = `${user}@${domain}`;

  // Find the email link element
  const emailLink = document.getElementById("email-link");

  // Set the href and text content
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = "Send me an email"; // Optional: set the visible text
});
