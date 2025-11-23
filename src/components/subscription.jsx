import "../styles/loginregister.css";
export default function Subscription(){
    return(
        <>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>

            <div className="wrapper glass">

                <div className="sub-header">
                    <i className='bx bx-mail-send'></i>
                    <p>Be the first to know</p>
                </div>

                <form>
                    <h1>Subscribe</h1>

                    <p className="sub-desc">
                        Get exclusive offers, seasonal deals, and early access to new products directly in your inbox or WhatsApp.
                    </p>

                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <i className='bx bxs-envelope'></i>
                    </div>

                    <button type="submit" className="btn">Subscribe</button>

                    <p className="sub-note">No spam. Unsubscribe anytime.</p>
                </form>

                <div className="corner-line"></div>
            </div>
    </>

    );
}