import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />
      <main>

      <section style={{ padding: '60px 40px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontWeight: '800', fontSize: '32px', marginBottom: '8px', marginTop: 0 }}>Terms of Service</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px', marginTop: 0 }}>Last updated: Jan 01, 2026</p>

        {[
          { h: null, p: 'Please read this Terms of Service ("Terms", "Terms of Service") carefully before using the https://www.dangpestcontrol.com/ website (the "Website") operated by Dang Pest Control, LLC, a(n) Limited Liability Company formed in Texas, United States ("us", "we", "our") as this Terms of Service contains important information regarding limitations of our liability. Your access to and use of this Website is conditional upon your acceptance of and compliance with these Terms.' },
          { h: null, p: 'By accessing or using the Website, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you do not have our permission to access or use the Website.' },
          { h: 'Prohibited uses', p: 'You agree that you will use this Website in accordance with all applicable laws, rules, regulations and these Terms at all times. Prohibited uses include: impersonating Dang Pest Control or its employees; misrepresenting your identity; sending spam or unsolicited promotional material; engaging in conduct that restricts others\' use of the Website; using the Website in any manner that could disable or damage the Website; using automated means to access the Website; using any device or software that interferes with proper working of the Website; attempting unauthorized access to any parts of the Website; attacking the Website via denial-of-service; or using the Website in violation of any applicable laws.' },
          { h: 'NO WARRANTY ON WEBSITE', p: 'THIS WEBSITE IS PROVIDED "AS IS". NO WARRANTY, EXPRESS OR IMPLIED (INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, OF SATISFACTORY QUALITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE) SHALL APPLY TO THIS WEBSITE, WHETHER ARISING BY LAW, COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OF TRADE OR OTHERWISE.' },
          { h: 'Availability, errors and inaccuracies', p: 'We assume no liability for the availability, errors or inaccuracies of the information, products or services provided on this Website. We may experience delays in updating information on this Website. The information, products and services found on the Website may contain errors or inaccuracies or may not be complete or current.' },
          { h: 'DAMAGES AND LIMITATION OF LIABILITY', p: 'IN NO EVENT SHALL DANG PEST CONTROL, LLC BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF, RELATING TO OR IN ANY WAY CONNECTED WITH YOUR ACCESS TO, DISPLAY OF OR USE OF THIS WEBSITE. THE AGGREGATE LIABILITY OF DANG PEST CONTROL, LLC SHALL BE LIMITED TO THE AMOUNT OF FEES ACTUALLY RECEIVED BY DANG PEST CONTROL, LLC FROM YOU.' },
          { h: 'Links to third party websites', p: 'This Website may contain hyperlinks to websites operated by third parties and not by us. We provide such hyperlinks for your reference only. We do not control such websites and are not responsible for their contents or the privacy or other practices of such websites.' },
          { h: 'Intellectual property and DMCA', p: 'All contents of this Website are © 2024 - 2026 Dang Pest Control, LLC or third parties. All rights reserved. If you believe in good faith that Content infringes on your intellectual property rights, you may send a written notice to: The Web Guys, info@the-web-guys.com, 317-805-4933, 11550 N Meridian St Suite 300, Carmel, IN 46032.' },
          { h: 'Governing law and dispute resolution', p: 'These Terms shall be governed and construed in accordance with the laws of the state of Indiana, United States. Any controversy or claim arising out of or relating to these Terms shall be resolved in a court of competent jurisdiction in Hamilton County, Indiana. YOU AND DANG PEST CONTROL, LLC AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION.' },
          { h: 'Changes to Terms of Service', p: 'We reserve the right to make changes to these Terms of Service at any time. We will notify you immediately of making any changes to these Terms of Service by posting the updated terms of service to this website.' },
          { h: 'Questions', p: 'If you have any questions about our Terms of Service, please contact us at info@the-web-guys.com.' },
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

export default TermsOfService;
