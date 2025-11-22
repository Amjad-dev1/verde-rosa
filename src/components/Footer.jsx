
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div className="footer-content">
        <p className="footer-store">Verde Rosa © 2025</p>
        <p className="footer-creators">Created by Amjad & Layth</p>
        <p className="footer-legal">
          All rights reserved. Any unauthorized use or copyright infringement is strictly prohibited.
        </p>
        <div className="footer-divider"></div>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
        </div>
      </div>
    </footer>
  );
}
