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
    const emailLinks = document.querySelectorAll("#email-link");
    emailLinks.forEach((emailLink) => {
      emailLink.href = `mailto:${email}`;
      if (!emailLink.textContent || !emailLink.textContent.trim()) {
        emailLink.textContent = "Send me an email";
      }
    });

    // Replace any [email] placeholder inside contact sections with a mailto link.
    const contactSections = [document.getElementById("contact-me"), document.getElementById("contact")];
    contactSections.forEach((contactSection) => {
      if (contactSection) {
        const candidates = contactSection.querySelectorAll("p, span, div, li");
        candidates.forEach((el) => {
          if (el.children.length === 0 && el.textContent && el.textContent.includes("[email]")) {
            el.innerHTML = el.innerHTML.replace(/\[email\]/g, `<a href="mailto:${email}">${email}</a>`);
          }
        });
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // Re-run after Astro client-side navigation
  document.addEventListener('astro:page-load', run);
})();
