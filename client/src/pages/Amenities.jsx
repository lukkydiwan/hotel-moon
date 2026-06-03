import { motion } from 'framer-motion';
import { FiWifi, FiShield, FiPhone, FiDroplet } from 'react-icons/fi';
import { MdPool, MdSpa, MdRestaurant, MdFitnessCenter, MdLocalLaundryService, MdRoomService, MdMeetingRoom, MdLocalParking } from 'react-icons/md';
import { GiCandleLight, GiWineGlass } from 'react-icons/gi';

const categories = [
  {
    title: 'Dining & Bar',
    icon: MdRestaurant,
    items: [
      { name: 'The Moonrise Restaurant', desc: 'Multi-cuisine fine dining with panoramic views', icon: MdRestaurant },
      { name: 'Celestial Bar & Lounge', desc: 'Handcrafted cocktails and premium spirits', icon: GiWineGlass },
      { name: 'In-Room Dining', desc: '24/7 room service with curated menus', icon: MdRoomService },
      { name: 'Private Dining', desc: 'Exclusive dining experiences for special occasions', icon: GiCandleLight },
    ]
  },
  {
    title: 'Wellness & Recreation',
    icon: MdSpa,
    items: [
      { name: 'Luna Spa', desc: 'Holistic treatments and luxury therapies', icon: MdSpa },
      { name: 'Outdoor Pool', desc: 'Temperature-controlled infinity pool', icon: MdPool },
      { name: 'Fitness Center', desc: 'State-of-the-art gym with personal trainers', icon: MdFitnessCenter },
      { name: 'Jacuzzi', desc: 'Available in Suite and Presidential rooms', icon: FiDroplet },
    ]
  },
  {
    title: 'Business & Events',
    icon: MdMeetingRoom,
    items: [
      { name: 'Conference Hall', desc: 'Fully equipped for up to 200 guests', icon: MdMeetingRoom },
      { name: 'High-Speed Wi-Fi', desc: 'Complimentary throughout the property', icon: FiWifi },
      { name: 'Business Center', desc: 'Print, scan, and secretarial services', icon: FiPhone },
      { name: 'AV Equipment', desc: 'Complete audio-visual setup on request', icon: MdMeetingRoom },
    ]
  },
  {
    title: 'Convenience & Safety',
    icon: FiShield,
    items: [
      { name: '24/7 Security', desc: 'CCTV surveillance and trained security team', icon: FiShield },
      { name: 'Valet Parking', desc: 'Complimentary parking for all guests', icon: MdLocalParking },
      { name: 'Laundry Service', desc: 'Same-day laundry and dry cleaning', icon: MdLocalLaundryService },
      { name: 'Concierge', desc: 'Personal assistance for all your needs', icon: FiPhone },
    ]
  },
];

export default function Amenities() {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ background: '#0f1923', padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>Hotel Facilities</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 600 }}>Amenities & Services</h1>
          <div style={{ width: '60px', height: '3px', background: '#c9a96e', margin: '1.5rem auto 0' }} />
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '5rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.75rem' }}>World-Class Facilities</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#0f1923', marginBottom: '1.5rem' }}>Everything You Need, Under One Roof</h2>
        <p style={{ color: '#666', lineHeight: 1.9 }}>From indulgent spa treatments to gourmet dining, Hotel Moon offers a comprehensive range of amenities designed to make your stay truly exceptional.</p>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <section key={cat.title} style={{ padding: '4rem 2rem', background: ci % 2 === 1 ? '#f3ede4' : '#fff' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ width: 50, height: 50, background: '#0f1923', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <cat.icon color="#c9a96e" size={22} />
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#0f1923' }}>{cat.title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {cat.items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ padding: '1.75rem', background: ci % 2 === 1 ? '#fff' : '#f3ede4', border: '1px solid transparent', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <item.icon size={28} color="#c9a96e" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#0f1923', marginBottom: '0.5rem' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#888', lineHeight: 1.6 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
