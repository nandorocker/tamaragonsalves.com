// JavaScript to set email links and replace the [email] placeholder
(function setupEmailLinks() {
  // Parts of the email address (keeps it off plain HTML to reduce scraping)
  const user = "info";
  const domain = "tamaragonsalves.com";

  // Combine parts to form the full email
  const email = `${user}@${domain}`;

  const run = () => {
    // Find the email link element and set the mailto href, but don't overwrite
    // the server-rendered/localized button text unless it's empty.
    const emailLink = document.getElementById("email-link");
    if (emailLink) {
      emailLink.href = `mailto:${email}`;
      if (!emailLink.textContent || !emailLink.textContent.trim()) {
        // Fallback label if the button has no text
        emailLink.textContent = "Send me an email";
      }
    }

    // Replace any [email] placeholder inside the contact section with a mailto link.
    const contactSection = document.getElementById("contact-me");
    if (contactSection) {
      // Look for elements that contain the literal '[email]' and have no child elements
      // (we want to replace plain text nodes, not complex nodes)
      const candidates = contactSection.querySelectorAll("p, span, div, li");
      candidates.forEach((el) => {
        if (el.children.length === 0 && el.textContent && el.textContent.includes("[email]")) {
          // Replace the placeholder with an anchor mailto link
          el.innerHTML = el.innerHTML.replace(/\[email\]/g, `<a href="mailto:${email}">${email}</a>`);
        }
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    // DOM already parsed, run immediately
    run();
  }
})();
