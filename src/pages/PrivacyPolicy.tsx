import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />
      <main>

      <section style={{ padding: '60px 40px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontWeight: '800', fontSize: '32px', marginBottom: '8px', marginTop: 0 }}>Privacy Policy</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px', marginTop: 0 }}>Last updated: Aug 22, 2025</p>

        {[
          { h: null, p: 'We value your privacy very highly. Please read this Privacy Policy carefully before using the https://www.dangpestcontrol.com/ website (the "Website") operated by Dang Pest Control, LLC, a(n) Limited Liability Company formed in Texas, United States ("us, we, our") as this Privacy Policy contains important information regarding your privacy and how we may use the information we collect about you.' },
          { h: null, p: 'Your access to or use of the Website is conditional upon your acceptance of and compliance with this Privacy Policy. This Privacy Policy applies to everyone, including but not limited to visitors, users and others, who wish to access or use the Website.' },
          { h: null, p: 'By accessing or using the Website, you agree to be bound by this Privacy Policy. If you disagree with any part of this Privacy Policy, you do not have our permission to access or use the Website.' },
          { h: 'What information we collect and store', p: 'We collect and store any and all information that you enter on this Website. We collect and store the following information about you: Identifying information - Name; Postal / Shipping address; Phone number; IP address; Email address; Device identifier; Information regarding your interaction with our website or application; Information regarding your interactions with advertisements. We are not required to collect this information by a law, court order, nor by a tribunal order. We combine or link the personal information that we hold about you.' },
          { h: 'With whom we share your personal information', p: 'We share the personal information we collect with third party service providers. Please note that these third parties will store your personal information that has been provided to them.' },
          { h: 'How we protect your personal information', p: 'We protect and safeguard your personal information by using SSL encryption or other secure technologies when receiving or sending personal information beyond internal networks.' },
          { h: 'Sale of your information', p: 'We do not sell your personal information.' },
          { h: 'Cookies', p: 'A cookie is a small piece of data sent from a website and stored on your device by your browser. This Website sets cookies. Please visit our Cookie Policy to learn more about what cookies we set, why we set them, and how to change your cookie settings.' },
          { h: "Children's privacy", p: 'This Website is intended for use by a general audience and does not offer services to children. Should a child whom we know to be under 18 send personal information to us, we will use that information only to respond to that child to inform them that they cannot use this Website.' },
          { h: 'Analytics programs', p: 'This Website uses Google Analytics to collect information about you and your behaviors. If you would like to opt-out of Google Analytics, please visit https://tools.google.com/dlpage/gaoptout/. You can also opt out of cookies by using our cookie consent banner.' },
          { h: 'Information retention', p: 'We retain all of the information that we collect until we no longer need the information to contact you.' },
          { h: 'Direct marketing', p: 'We use the information that we collect about you for direct marketing purposes. Direct marketing is the act of selling products or services directly to consumers rather than through retailers.' },
          { h: 'SMS', p: 'We will not share your opt-in to an SMS campaign with any third party for purposes unrelated to providing you with the services of that campaign. We may share your Personal Data, including your SMS opt-in or consent status, with third parties that help us provide our messaging services, including but not limited to platform providers, phone companies, and any other vendors who assist us in the delivery of text messages. All of the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties for their own marketing purposes.' },
          { h: 'Your rights', p: 'Depending upon where you reside, you may have the following rights with regard to your personal information: the right to access, receive, transmit, amend, withdraw consent, restrict processing, delete, lodge complaints about, and opt out of use of your personal information for direct marketing, sales, location tracking, profiling, and automated decision making.' },
          { h: 'Third-party websites', p: 'This Website may contain hyperlinks to websites operated by parties other than us. We provide such hyperlinks for your reference only. We do not control such websites and are not responsible for their contents or the privacy or other practices of such websites.' },
          { h: 'Do Not Track', p: 'Do Not Track ("DNT") is a preference you can set on your browser to inform websites that you do not want to be tracked. We do not support DNT.' },
          { h: 'Questions', p: 'If you have any questions about this Privacy Policy, please contact us at info@the-web-guys.com.' },
          { h: 'Changes to Privacy Policy', p: 'We reserve the right to amend this Privacy Policy at any time. We will notify you of any changes to this Privacy Policy by posting the updated Privacy Policy to this website.' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '24px' }}>
            {item.h && <h2 style={{ fontWeight: '700', fontSize: '18px', marginBottom: '8px', marginTop: 0 }}>{item.h}</h2>}
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', margin: 0 }}>{item.p}</p>
          </div>
        ))}
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
