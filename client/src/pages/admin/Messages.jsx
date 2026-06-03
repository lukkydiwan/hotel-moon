import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getMessages, markMessageRead, deleteMessage } from '../../api';
import { FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { getMessages().then(r => setMessages(r.data)).finally(() => setLoading(false)); }, []);

  const handleSelect = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      await markMessageRead(msg._id);
      setMessages(m => m.map(x => x._id === msg._id ? { ...x, read: true } : x));
    }
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    setMessages(m => m.filter(x => x._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <AdminLayout>
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.8rem' }}>Messages</h1>
          {unread > 0 && <span style={{ background: '#c9a96e', color: '#0f1923', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>{unread} new</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* List */}
          <div style={{ background: '#0f1923', border: '1px solid rgba(201,169,110,0.1)', maxHeight: '70vh', overflowY: 'auto' }}>
            {loading ? <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading...</div> :
              messages.length === 0 ? <div style={{ padding: '2rem', textAlign: 'center', color: '#555' }}>No messages</div> :
              messages.map(msg => (
                <div key={msg._id} onClick={() => handleSelect(msg)}
                  style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected?._id === msg._id ? 'rgba(201,169,110,0.08)' : 'transparent', borderLeft: !msg.read ? '3px solid #c9a96e' : '3px solid transparent', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <p style={{ color: msg.read ? '#aaa' : '#fff', fontWeight: msg.read ? 400 : 600, fontSize: '0.875rem' }}>{msg.name}</p>
                    <p style={{ color: '#555', fontSize: '0.75rem' }}>{new Date(msg.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{msg.subject}</p>
                  <p style={{ color: '#555', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</p>
                </div>
              ))
            }
          </div>

          {/* Detail */}
          <div style={{ background: '#0f1923', border: '1px solid rgba(201,169,110,0.1)', padding: selected ? '1.5rem' : '3rem', minHeight: '300px', display: 'flex', alignItems: selected ? 'flex-start' : 'center', justifyContent: selected ? 'flex-start' : 'center', flexDirection: 'column' }}>
            {selected ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{selected.subject}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#888', fontSize: '0.8rem' }}>
                        <FiMail size={13} color="#c9a96e" /> {selected.email}
                      </span>
                      {selected.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#888', fontSize: '0.8rem' }}>
                        <FiPhone size={13} color="#c9a96e" /> {selected.phone}
                      </span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(selected._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>
                    <FiTrash2 size={18} />
                  </button>
                </div>
                <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)', paddingTop: '1.25rem', width: '100%' }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', color: '#c9a96e', fontSize: '0.875rem', marginBottom: '0.75rem' }}>From: {selected.name}</p>
                  <p style={{ color: '#bbb', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>
              </>
            ) : (
              <p style={{ color: '#555' }}>Select a message to read</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
