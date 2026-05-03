import { useState, useEffect, useRef } from 'react';

const API = '/api';
const TOKEN_KEY = 'cms_token';

function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

function cmsHeaders(extra?: Record<string, string>): Record<string, string> {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken() ?? ''}`, ...extra };
}

type Tab = 'products' | 'journal' | 'hero' | 'media' | 'settings';

function useApiAuth() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  const login = async (pw: string): Promise<string | null> => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/cms/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        const { token } = await res.json();
        sessionStorage.setItem(TOKEN_KEY, token);
        setAuthed(true);
        return null;
      }
      return 'Incorrect password';
    } catch {
      return 'Connection error — is the server running?';
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
  };

  return { authed, loading, login, logout };
}

export default function AdminPage() {
  const { authed, loading, login, logout } = useApiAuth();
  const [tab, setTab] = useState<Tab>('products');
  const [pw, setPw] = useState('');
  const [loginErr, setLoginErr] = useState('');

  const handleLogin = async () => {
    const err = await login(pw);
    if (err) setLoginErr(err);
  };

  if (!authed) {
    return (
      <div style={S.loginWrap}>
        <div style={S.loginCard}>
          <div style={S.loginLogo}>Isola Vitale</div>
          <div style={S.loginSub}>Content Management</div>
          <input
            style={S.input}
            type="password"
            placeholder="Enter admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin(); }}
          />
          {loginErr && <p style={{ color: '#c00', fontSize: 13, marginTop: 8 }}>{loginErr}</p>}
          <button style={S.btn} onClick={handleLogin} disabled={loading}>
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.wrap}>
      <div style={S.sidebar}>
        <div style={S.sidebarLogo}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400 }}>Isola Vitale</span>
          <span style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>Content Management</span>
        </div>
        {(['products', 'journal', 'hero', 'media', 'settings'] as Tab[]).map(t => (
          <button
            key={t}
            style={{ ...S.navItem, ...(tab === t ? S.navItemActive : {}) }}
            onClick={() => setTab(t)}
          >
            {t === 'products' && '◈ '}
            {t === 'journal' && '◉ '}
            {t === 'hero' && '◻ '}
            {t === 'media' && '◫ '}
            {t === 'settings' && '◦ '}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button style={S.logoutBtn} onClick={logout}>Sign Out</button>
      </div>

      <div style={S.main}>
        {tab === 'products' && <ProductsPanel />}
        {tab === 'journal' && <JournalPanel />}
        {tab === 'hero' && <HeroPanel />}
        {tab === 'media' && <MediaPanel />}
        {tab === 'settings' && <SettingsPanel />}
      </div>
    </div>
  );
}

// ── Products Panel ────────────────────────────────────────────────────────────

function ProductsPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`${API}/cms/products`, { headers: cmsHeaders() })
      .then(r => r.json()).then(d => { setProducts(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `${API}/cms/products/${editing.id}` : `${API}/cms/products`;
    const res = await fetch(url, { method, headers: cmsHeaders(), body: JSON.stringify(editing) });
    const data = await res.json();
    if (editing.id) {
      setProducts(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      setProducts(prev => [...prev, data]);
    }
    setEditing(null);
    setSaving(false);
    setMsg('Saved successfully');
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`${API}/cms/products/${id}`, { method: 'DELETE', headers: cmsHeaders() });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (editing) return (
    <ProductEditor
      product={editing}
      onChange={setEditing}
      onSave={save}
      onCancel={() => setEditing(null)}
      saving={saving}
    />
  );

  return (
    <div>
      <PanelHeader
        title="Products"
        sub={`${products.length} products in database`}
        action={<button style={S.btn} onClick={() => setEditing({ name: '', slug: '', collection: 'laboratory', fullPrice: 0, refillPrice: 0 })}>+ New Product</button>}
      />
      {msg && <Toast msg={msg} />}
      {loading ? <Spinner /> : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {['Name', 'Collection', 'Price', 'Refill', 'Active', 'Actions'].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={S.tr}>
                  <td style={S.td}>
                    {p.imageUrl && <img src={p.imageUrl} style={{ width: 32, height: 40, objectFit: 'contain', marginRight: 10, verticalAlign: 'middle' }} />}
                    <strong>{p.name}</strong>
                  </td>
                  <td style={S.td}><span style={S.badge}>{p.collection}</span></td>
                  <td style={S.td}>${p.fullPrice}</td>
                  <td style={S.td}>${p.refillPrice}</td>
                  <td style={S.td}><span style={{ color: p.isActive ? '#2a7a3b' : '#999' }}>{p.isActive ? '● Active' : '○ Hidden'}</span></td>
                  <td style={S.td}>
                    <button style={S.linkBtn} onClick={() => setEditing(p)}>Edit</button>
                    <button style={{ ...S.linkBtn, color: '#c00' }} onClick={() => del(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <EmptyState
              icon="◈"
              title="No products yet"
              sub="Create your first product or seed from the static catalog"
              action={<SeedProductsBtn onSeeded={setProducts} />}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ProductEditor({ product, onChange, onSave, onCancel, saving }: any) {
  const update = (k: string, v: any) => onChange((prev: any) => ({ ...prev, [k]: v }));

  return (
    <div>
      <PanelHeader
        title={product.id ? `Edit: ${product.name}` : 'New Product'}
        sub=""
        action={
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={S.btnGhost} onClick={onCancel}>Cancel</button>
            <button style={S.btn} onClick={onSave} disabled={saving}>{saving ? 'Saving…' : 'Save Product'}</button>
          </div>
        }
      />
      <div style={S.formGrid}>
        <Field label="Product Name" span={2}>
          <input style={S.input} value={product.name || ''} onChange={e => update('name', e.target.value)} />
        </Field>
        <Field label="Slug">
          <input style={S.input} value={product.slug || ''} onChange={e => update('slug', e.target.value)} placeholder="the-cellular-essence" />
        </Field>
        <Field label="Collection">
          <select style={S.input} value={product.collection || 'laboratory'} onChange={e => update('collection', e.target.value)}>
            <option value="laboratory">Laboratory</option>
            <option value="daily">Daily</option>
            <option value="chronos">Cellular Chronos</option>
          </select>
        </Field>
        <Field label="Full Price ($)">
          <input style={S.input} type="number" value={product.fullPrice || ''} onChange={e => update('fullPrice', parseFloat(e.target.value))} />
        </Field>
        <Field label="Refill Price ($)">
          <input style={S.input} type="number" value={product.refillPrice || ''} onChange={e => update('refillPrice', parseFloat(e.target.value))} />
        </Field>
        <Field label="Image URL" span={2}>
          <ImageUrlField value={product.imageUrl || ''} onChange={v => update('imageUrl', v)} />
        </Field>
        <Field label="Technologies / Subtitle" span={2}>
          <input style={S.input} value={product.technologies || ''} onChange={e => update('technologies', e.target.value)} />
        </Field>
        <Field label="Step (e.g. Serum, Moisturizer)">
          <input style={S.input} value={product.step || ''} onChange={e => update('step', e.target.value)} />
        </Field>
        <Field label="Texture">
          <input style={S.input} value={product.texture || ''} onChange={e => update('texture', e.target.value)} />
        </Field>
        <Field label="Description" span={2}>
          <textarea style={{ ...S.input, minHeight: 100, resize: 'vertical' }} value={product.description || ''} onChange={e => update('description', e.target.value)} />
        </Field>
        <Field label="Usage Instructions" span={2}>
          <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={product.usage || ''} onChange={e => update('usage', e.target.value)} />
        </Field>
        <Field label="Who It's For" span={2}>
          <textarea style={{ ...S.input, minHeight: 60, resize: 'vertical' }} value={product.whoItsFor || ''} onChange={e => update('whoItsFor', e.target.value)} />
        </Field>
        <Field label="Active">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={product.isActive !== false} onChange={e => update('isActive', e.target.checked)} />
            Show this product
          </label>
        </Field>
        <Field label="Sort Order">
          <input style={S.input} type="number" value={product.sortOrder || 0} onChange={e => update('sortOrder', parseInt(e.target.value))} />
        </Field>
      </div>
    </div>
  );
}

// ── Journal Panel ────────────────────────────────────────────────────────────

function JournalPanel() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`${API}/cms/journal`, { headers: cmsHeaders() })
      .then(r => r.json()).then(d => { setPosts(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `${API}/cms/journal/${editing.id}` : `${API}/cms/journal`;
    const res = await fetch(url, { method, headers: cmsHeaders(), body: JSON.stringify(editing) });
    const data = await res.json();
    if (editing.id) {
      setPosts(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      setPosts(prev => [...prev, data]);
    }
    setEditing(null);
    setSaving(false);
    setMsg('Saved');
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`${API}/cms/journal/${id}`, { method: 'DELETE', headers: cmsHeaders() });
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (editing) return (
    <div>
      <PanelHeader
        title={editing.id ? `Edit: ${editing.title}` : 'New Article'}
        sub=""
        action={
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={S.btnGhost} onClick={() => setEditing(null)}>Cancel</button>
            <button style={S.btn} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Article'}</button>
          </div>
        }
      />
      <div style={S.formGrid}>
        <Field label="Title" span={2}>
          <input style={S.input} value={editing.title || ''} onChange={e => setEditing((p: any) => ({ ...p, title: e.target.value }))} />
        </Field>
        <Field label="Slug">
          <input style={S.input} value={editing.slug || ''} onChange={e => setEditing((p: any) => ({ ...p, slug: e.target.value }))} />
        </Field>
        <Field label="Category">
          <input style={S.input} value={editing.category || ''} onChange={e => setEditing((p: any) => ({ ...p, category: e.target.value }))} />
        </Field>
        <Field label="Author">
          <input style={S.input} value={editing.author || ''} onChange={e => setEditing((p: any) => ({ ...p, author: e.target.value }))} />
        </Field>
        <Field label="Read Time (mins)">
          <input style={S.input} type="number" value={editing.readTime || 6} onChange={e => setEditing((p: any) => ({ ...p, readTime: parseInt(e.target.value) }))} />
        </Field>
        <Field label="Cover Image URL" span={2}>
          <ImageUrlField value={editing.imageUrl || ''} onChange={v => setEditing((p: any) => ({ ...p, imageUrl: v }))} />
        </Field>
        <Field label="Excerpt" span={2}>
          <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={editing.excerpt || ''} onChange={e => setEditing((p: any) => ({ ...p, excerpt: e.target.value }))} />
        </Field>
        <Field label="Body (HTML supported)" span={2}>
          <textarea style={{ ...S.input, minHeight: 200, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} value={editing.body || ''} onChange={e => setEditing((p: any) => ({ ...p, body: e.target.value }))} />
        </Field>
        <Field label="Published">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={editing.isPublished || false} onChange={e => setEditing((p: any) => ({ ...p, isPublished: e.target.checked }))} />
            Publish this article
          </label>
        </Field>
      </div>
    </div>
  );

  return (
    <div>
      <PanelHeader
        title="Journal"
        sub={`${posts.length} articles`}
        action={<button style={S.btn} onClick={() => setEditing({ title: '', slug: '', category: 'Cellular Science', author: 'The Isola Vitale Atelier', readTime: 6 })}>+ New Article</button>}
      />
      {msg && <Toast msg={msg} />}
      {loading ? <Spinner /> : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {['Title', 'Category', 'Author', 'Status', 'Actions'].map(h => <th key={h} style={S.th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} style={S.tr}>
                  <td style={S.td}><strong>{p.title}</strong></td>
                  <td style={S.td}><span style={S.badge}>{p.category}</span></td>
                  <td style={S.td}>{p.author}</td>
                  <td style={S.td}><span style={{ color: p.isPublished ? '#2a7a3b' : '#999' }}>{p.isPublished ? '● Published' : '○ Draft'}</span></td>
                  <td style={S.td}>
                    <button style={S.linkBtn} onClick={() => setEditing(p)}>Edit</button>
                    <button style={{ ...S.linkBtn, color: '#c00' }} onClick={() => del(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <EmptyState icon="◉" title="No articles yet" sub="Create your first journal article" />}
        </div>
      )}
    </div>
  );
}

// ── Hero Panel ────────────────────────────────────────────────────────────────

function HeroPanel() {
  const pages = ['home', 'products', 'journal', 'origin', 'system', 'technology'];
  const [sections, setSections] = useState<Record<string, any>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`${API}/cms/hero`, { headers: cmsHeaders() }).then(r => r.json()).then((data: any[]) => {
      const m: Record<string, any> = {};
      data.forEach(s => { m[s.page] = s; });
      setSections(m);
      setLoading(false);
    });
  }, []);

  const current = editing ? (sections[editing] || { page: editing }) : null;

  const save = async () => {
    if (!editing || !current) return;
    setSaving(true);
    const res = await fetch(`${API}/cms/hero/${editing}`, {
      method: 'PUT',
      headers: cmsHeaders(),
      body: JSON.stringify(current)
    });
    const data = await res.json();
    setSections(prev => ({ ...prev, [editing]: data }));
    setEditing(null);
    setSaving(false);
    setMsg('Saved');
    setTimeout(() => setMsg(''), 3000);
  };

  const update = (k: string, v: string) => {
    if (!editing) return;
    setSections(prev => ({ ...prev, [editing]: { ...prev[editing], [k]: v } }));
  };

  if (editing && current) return (
    <div>
      <PanelHeader
        title={`Hero Section: ${editing.charAt(0).toUpperCase() + editing.slice(1)} Page`}
        sub="Edit headline, copy, image, and video"
        action={
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={S.btnGhost} onClick={() => setEditing(null)}>Cancel</button>
            <button style={S.btn} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Section'}</button>
          </div>
        }
      />
      <div style={S.formGrid}>
        <Field label="Headline" span={2}>
          <input style={S.input} value={current.headline || ''} onChange={e => update('headline', e.target.value)} />
        </Field>
        <Field label="Subheadline" span={2}>
          <input style={S.input} value={current.subheadline || ''} onChange={e => update('subheadline', e.target.value)} />
        </Field>
        <Field label="Body Copy" span={2}>
          <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={current.bodyCopy || ''} onChange={e => update('bodyCopy', e.target.value)} />
        </Field>
        <Field label="CTA Label">
          <input style={S.input} value={current.ctaLabel || ''} onChange={e => update('ctaLabel', e.target.value)} placeholder="Discover the Ritual" />
        </Field>
        <Field label="CTA Link">
          <input style={S.input} value={current.ctaHref || ''} onChange={e => update('ctaHref', e.target.value)} placeholder="/products" />
        </Field>
        <Field label="Hero Image URL" span={2}>
          <ImageUrlField value={current.imageUrl || ''} onChange={v => update('imageUrl', v)} />
        </Field>
        <Field label="Hero Video URL" span={2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input style={S.input} value={current.videoUrl || ''} onChange={e => update('videoUrl', e.target.value)} placeholder="https://... or /api/storage/objects/..." />
            <VideoUploadBtn onUploaded={v => update('videoUrl', v)} />
          </div>
        </Field>
      </div>
    </div>
  );

  return (
    <div>
      <PanelHeader title="Hero Sections" sub="Edit headline, images, and video for each page" action={null} />
      {msg && <Toast msg={msg} />}
      {loading ? <Spinner /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {pages.map(page => {
            const s = sections[page];
            return (
              <div key={page} style={S.heroCard}>
                {s?.imageUrl && (
                  <div style={{ width: '100%', height: 120, overflow: 'hidden', borderRadius: 4, marginBottom: 12 }}>
                    <img src={s.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, marginBottom: 6 }}>{page}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, marginBottom: 8 }}>
                  {s?.headline || <span style={{ opacity: 0.3 }}>No headline set</span>}
                </div>
                {s?.videoUrl && <div style={{ fontSize: 11, color: '#2a7a3b', marginBottom: 8 }}>▶ Video set</div>}
                <button style={S.btnSm} onClick={() => setEditing(page)}>Edit Section</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Media Panel ────────────────────────────────────────────────────────────────

function MediaPanel() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API}/cms/media`, { headers: cmsHeaders() })
      .then(r => r.json()).then(d => { setAssets(d); setLoading(false); });
  }, []);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const urlRes = await fetch(`${API}/storage/uploads/request-url`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type })
      });
      const { uploadURL, objectPath } = await urlRes.json();
      await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
      const regRes = await fetch(`${API}/cms/media`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({ filename: file.name, objectPath, mimeType: file.type, sizeBytes: file.size })
      });
      const asset = await regRes.json();
      setAssets(prev => [asset, ...prev]);
      setMsg('Uploaded successfully');
      setTimeout(() => setMsg(''), 3000);
    } catch (e: any) {
      setMsg('Upload failed: ' + e.message);
    }
    setUploading(false);
  };

  const del = async (id: number) => {
    if (!confirm('Remove this asset from the library?')) return;
    await fetch(`${API}/cms/media/${id}`, { method: 'DELETE', headers: cmsHeaders() });
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const copyUrl = (asset: any) => {
    const url = `/api/storage${asset.objectPath}`;
    navigator.clipboard.writeText(url);
    setMsg('URL copied to clipboard');
    setTimeout(() => setMsg(''), 2000);
  };

  const images = assets.filter(a => a.mimeType?.startsWith('image/'));
  const videos = assets.filter(a => a.mimeType?.startsWith('video/'));
  const others = assets.filter(a => !a.mimeType?.startsWith('image/') && !a.mimeType?.startsWith('video/'));

  return (
    <div>
      <PanelHeader
        title="Media Library"
        sub={`${assets.length} assets uploaded`}
        action={
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {uploading && <span style={{ fontSize: 13, opacity: 0.6 }}>Uploading…</span>}
            <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
            <button style={S.btn} onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? 'Uploading…' : '↑ Upload File'}
            </button>
          </div>
        }
      />
      {msg && <Toast msg={msg} />}
      {loading ? <Spinner /> : (
        <>
          {assets.length === 0 && <EmptyState icon="◫" title="No media yet" sub="Upload images and videos to use across the site" />}

          {images.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={S.sectionLabel}>Images ({images.length})</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {images.map(a => (
                  <div key={a.id} style={S.mediaCard}>
                    <img src={`/api/storage${a.objectPath}`} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                    <div style={S.mediaCardBody}>
                      <div style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.6 }}>{a.filename}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                        <button style={S.linkBtn} onClick={() => copyUrl(a)}>Copy URL</button>
                        <button style={{ ...S.linkBtn, color: '#c00' }} onClick={() => del(a.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {videos.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={S.sectionLabel}>Videos ({videos.length})</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {videos.map(a => (
                  <div key={a.id} style={S.mediaCard}>
                    <video src={`/api/storage${a.objectPath}`} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} controls muted />
                    <div style={S.mediaCardBody}>
                      <div style={{ fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.6 }}>{a.filename}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                        <button style={S.linkBtn} onClick={() => copyUrl(a)}>Copy URL</button>
                        <button style={{ ...S.linkBtn, color: '#c00' }} onClick={() => del(a.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              <div style={S.sectionLabel}>Other Files ({others.length})</div>
              {others.map(a => (
                <div key={a.id} style={{ ...S.tr, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px' }}>
                  <span style={{ opacity: 0.7 }}>{a.filename}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.linkBtn} onClick={() => copyUrl(a)}>Copy URL</button>
                    <button style={{ ...S.linkBtn, color: '#c00' }} onClick={() => del(a.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Settings Panel ────────────────────────────────────────────────────────────

function SettingsPanel() {
  const defaultSettings = [
    { key: 'banner_text', label: 'Announcement Banner', value: 'Complimentary shipping on orders over €200' },
    { key: 'banner_enabled', label: 'Show Banner', value: 'true' },
    { key: 'free_shipping_threshold', label: 'Free Shipping Threshold ($)', value: '200' },
    { key: 'subscription_discount', label: 'Subscription Discount (%)', value: '20' },
    { key: 'footer_tagline', label: 'Footer Tagline', value: 'Cellular Vitality. Isola Crafted.' },
    { key: 'instagram_url', label: 'Instagram URL', value: '' },
    { key: 'contact_email', label: 'Contact Email', value: 'atelier@isolavitale.com' },
  ];

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`${API}/cms/settings`, { headers: cmsHeaders() }).then(r => r.json()).then((data: any[]) => {
      const m: Record<string, string> = {};
      data.forEach(s => { m[s.key] = s.value; });
      defaultSettings.forEach(d => { if (!m[d.key]) m[d.key] = d.value; });
      setSettings(m);
      setLoading(false);
    });
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(
      Object.entries(settings).map(([key, value]) =>
        fetch(`${API}/cms/settings/${key}`, {
          method: 'PUT',
          headers: cmsHeaders(),
          body: JSON.stringify({ value, label: defaultSettings.find(d => d.key === key)?.label })
        })
      )
    );
    setSaving(false);
    setMsg('Settings saved');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <PanelHeader
        title="Site Settings"
        sub="Global configuration for the storefront"
        action={<button style={S.btn} onClick={saveAll} disabled={saving}>{saving ? 'Saving…' : 'Save All Settings'}</button>}
      />
      {msg && <Toast msg={msg} />}
      {loading ? <Spinner /> : (
        <div style={S.formGrid}>
          {defaultSettings.map(def => (
            <Field key={def.key} label={def.label} span={def.key.includes('url') || def.key === 'banner_text' ? 2 : 1}>
              {def.key === 'banner_enabled' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={settings[def.key] === 'true'}
                    onChange={e => setSettings(prev => ({ ...prev, [def.key]: e.target.checked ? 'true' : 'false' }))} />
                  Show announcement banner
                </label>
              ) : (
                <input
                  style={S.input}
                  value={settings[def.key] || ''}
                  onChange={e => setSettings(prev => ({ ...prev, [def.key]: e.target.value }))}
                />
              )}
            </Field>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function PanelHeader({ title, sub, action }: { title: string; sub: string; action: React.ReactNode }) {
  return (
    <div style={S.panelHeader}>
      <div>
        <h2 style={S.panelTitle}>{title}</h2>
        {sub && <p style={S.panelSub}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Field({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: number }) {
  return (
    <div style={{ gridColumn: `span ${span}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={S.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function ImageUrlField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const urlRes = await fetch(`${API}/storage/uploads/request-url`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type })
      });
      const { uploadURL, objectPath } = await urlRes.json();
      await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
      await fetch(`${API}/cms/media`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({ filename: file.name, objectPath, mimeType: file.type, sizeBytes: file.size })
      });
      onChange(`/api/storage${objectPath}`);
    } catch {}
    setUploading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input style={{ ...S.input, flex: 1 }} value={value} onChange={e => onChange(e.target.value)} placeholder="/serum-uniform.png or /api/storage/objects/..." />
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
        <button type="button" style={S.btnSm} onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? '…' : '↑ Upload'}
        </button>
      </div>
      {value && (
        <img src={value} style={{ width: 80, height: 80, objectFit: 'contain', border: '1px solid #eee', borderRadius: 4 }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      )}
    </div>
  );
}

function VideoUploadBtn({ onUploaded }: { onUploaded: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File) => {
    setUploading(true);
    setProgress(10);
    try {
      const urlRes = await fetch(`${API}/storage/uploads/request-url`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type })
      });
      const { uploadURL, objectPath } = await urlRes.json();
      setProgress(30);
      await fetch(uploadURL, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
      setProgress(80);
      await fetch(`${API}/cms/media`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({ filename: file.name, objectPath, mimeType: file.type, sizeBytes: file.size })
      });
      setProgress(100);
      onUploaded(`/api/storage${objectPath}`);
    } catch {}
    setUploading(false);
    setProgress(0);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <input ref={fileRef} type="file" accept="video/*" style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
      <button type="button" style={S.btnSm} onClick={() => fileRef.current?.click()} disabled={uploading}>
        {uploading ? `Uploading ${progress}%…` : '↑ Upload Video'}
      </button>
      <span style={{ fontSize: 12, opacity: 0.5 }}>Supports MP4, WebM</span>
    </div>
  );
}

function SeedProductsBtn({ onSeeded }: { onSeeded: (p: any[]) => void }) {
  const [seeding, setSeeding] = useState(false);

  const seed = async () => {
    setSeeding(true);
    const { PRODUCTS } = await import('../data/items');
    for (const p of PRODUCTS.slice(0, 12)) {
      await fetch(`${API}/cms/products`, {
        method: 'POST',
        headers: cmsHeaders(),
        body: JSON.stringify({
          slug: p.slug, name: p.name, collection: p.collection || 'laboratory',
          technologies: p.technologies, step: p.step, description: p.description,
          texture: p.texture, usage: p.usage, fullPrice: p.fullPrice || 0,
          refillPrice: p.refillPrice || 0, subscriptionPrice: p.subscriptionPrice,
          imageUrl: p.imageSrc || (p as any).image, benefits: p.benefits || [],
          keyIngredients: p.keyIngredients || [], whoItsFor: p.whoItsFor || '',
          isActive: true, sortOrder: 0
        })
      });
    }
    const res = await fetch(`${API}/cms/products`, { headers: cmsHeaders() });
    const data = await res.json();
    onSeeded(data);
    setSeeding(false);
  };

  return (
    <button style={S.btn} onClick={seed} disabled={seeding}>
      {seeding ? 'Seeding…' : 'Import from Static Catalog'}
    </button>
  );
}

function Toast({ msg }: { msg: string }) {
  return <div style={S.toast}>{msg}</div>;
}

function Spinner() {
  return <div style={{ padding: 40, textAlign: 'center', opacity: 0.4 }}>Loading…</div>;
}

function EmptyState({ icon, title, sub, action }: { icon: string; title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 40px' }}>
      <div style={{ fontSize: 40, opacity: 0.2, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 8 }}>{title}</h3>
      <p style={{ opacity: 0.5, fontSize: 14, marginBottom: 20 }}>{sub}</p>
      {action}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  loginWrap: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#0A1A15', fontFamily: 'Work Sans, system-ui, sans-serif'
  },
  loginCard: {
    background: 'white', padding: '48px 40px', borderRadius: 8, width: 360,
    display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  loginLogo: { fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 400, color: '#0A1A15', textAlign: 'center' },
  loginSub: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C5A059', textAlign: 'center', marginTop: -12 },

  wrap: { display: 'flex', minHeight: '100vh', fontFamily: 'Work Sans, system-ui, sans-serif', background: '#F9F9F7' },

  sidebar: {
    width: 220, background: '#0A1A15', color: '#FAFAF8', display: 'flex',
    flexDirection: 'column', gap: 4, padding: '0 0 24px', flexShrink: 0,
    position: 'sticky', top: 0, height: '100vh'
  },
  sidebarLogo: { padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 },
  navItem: {
    background: 'none', border: 'none', color: 'rgba(250,250,248,0.6)', textAlign: 'left',
    padding: '10px 20px', cursor: 'pointer', fontSize: 14, fontFamily: 'Work Sans, system-ui, sans-serif',
    transition: 'all 0.15s', borderRadius: 0, width: '100%'
  },
  navItemActive: { background: 'rgba(255,255,255,0.08)', color: '#FAFAF8', borderLeft: '3px solid #C5A059' },
  logoutBtn: {
    marginTop: 'auto', background: 'none', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(250,250,248,0.4)', padding: '8px 20px', cursor: 'pointer', fontSize: 13,
    fontFamily: 'Work Sans, system-ui, sans-serif', margin: '20px 16px 0'
  },

  main: { flex: 1, padding: '32px 40px', maxWidth: 1100, overflow: 'auto' },

  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  panelTitle: { fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: '#0A1A15', marginBottom: 4 },
  panelSub: { fontSize: 13, opacity: 0.5, margin: 0 },

  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 16px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, borderBottom: '1px solid #e8e8e4' },
  tr: { borderBottom: '1px solid #f0f0ec', transition: 'background 0.15s' },
  td: { padding: '14px 16px', fontSize: 14, verticalAlign: 'middle' },

  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px', maxWidth: 800 },
  fieldLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0A1A15', opacity: 0.55, fontWeight: 600 },
  input: {
    width: '100%', padding: '10px 12px', border: '1px solid rgba(10,26,21,0.15)', borderRadius: 4,
    fontFamily: 'Work Sans, system-ui, sans-serif', fontSize: 14, background: 'white',
    color: '#050505', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s'
  },

  btn: {
    background: '#0A1A15', color: '#FAFAF8', border: 'none', padding: '10px 20px',
    fontFamily: 'Work Sans, system-ui, sans-serif', fontSize: 13, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', borderRadius: 3,
    transition: 'background 0.2s'
  },
  btnGhost: {
    background: 'transparent', color: '#0A1A15', border: '1px solid rgba(10,26,21,0.2)',
    padding: '10px 20px', fontFamily: 'Work Sans, system-ui, sans-serif', fontSize: 13,
    cursor: 'pointer', borderRadius: 3
  },
  btnSm: {
    background: '#0A1A15', color: '#FAFAF8', border: 'none', padding: '7px 14px',
    fontFamily: 'Work Sans, system-ui, sans-serif', fontSize: 12, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', borderRadius: 3,
    whiteSpace: 'nowrap' as const
  },
  linkBtn: {
    background: 'none', border: 'none', color: '#0A1A15', fontSize: 12, cursor: 'pointer',
    textDecoration: 'underline', fontFamily: 'Work Sans, system-ui, sans-serif', padding: '2px 6px'
  },

  badge: {
    display: 'inline-block', padding: '2px 8px', background: 'rgba(10,26,21,0.06)',
    borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em'
  },

  heroCard: {
    background: 'white', border: '1px solid rgba(10,26,21,0.08)', borderRadius: 6,
    padding: 20, display: 'flex', flexDirection: 'column'
  },

  mediaCard: {
    background: 'white', border: '1px solid rgba(10,26,21,0.08)', borderRadius: 6, overflow: 'hidden'
  },
  mediaCardBody: { padding: '10px 12px' },

  sectionLabel: {
    fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.4,
    marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e8e8e4'
  },

  toast: {
    position: 'fixed' as const, bottom: 24, right: 24, background: '#0A1A15', color: '#FAFAF8',
    padding: '12px 20px', borderRadius: 4, fontSize: 13, fontWeight: 600,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 9999, letterSpacing: '0.04em'
  }
};
