import React, { useMemo, useState } from 'react';
import {
  Trash2,
  Plus,
  Link as LinkIcon,
  Upload,
  Search,
  Sparkles,
  Camera,
  Target,
  BookOpen,
  RefreshCcw,
  BarChart3,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const pastel = {
  bg: '#f7f4f2',
  panel: '#fffaf8',
  ink: '#2f4057',
  muted: '#7d8597',
  rose: '#e89a90',
  blush: '#e4c3bd',
  peach: '#f2c6b4',
  cream: '#ead6b8',
  butter: '#f3e0a3',
  yellow: '#e9c46a',
  aqua: '#8ecfd1',
  mist: '#b5c4c9',
  sky: '#a7c7e7',
  blue: '#7ea1c4',
  sage: '#c6c8a6',
  cloud: '#d9d9d9',
  navy: '#2e4057',
  slate: '#5c677d',
  coral: '#e56b6f',
  mauve: '#d98b99',
  pink: '#f4a7b9',
  lilac: '#d8c7df',
};

const chartColors = [
  pastel.rose,
  pastel.blush,
  pastel.peach,
  pastel.cream,
  pastel.butter,
  pastel.yellow,
  pastel.aqua,
  pastel.sky,
  pastel.blue,
  pastel.sage,
  pastel.mauve,
  pastel.pink,
  pastel.lilac,
  pastel.slate,
];

const allBooks = {
  Biology: [
    'The Cell',
    'Reproduction',
    'Embryogenesis & Development',
    'Nervous System',
    'Endocrine System',
    'Respiratory System',
    'Cardiovascular System',
    'Immune System',
    'Digestive System',
    'Homeostasis',
    'Musculoskeletal System',
    'Genetics & Evolution',
  ],
  Biochemistry: [
    'Amino Acids',
    'Proteins',
    'Enzymes',
    'Carbohydrate Structure & Function',
    'Lipids',
    'DNA & Biotechnology',
    'RNA & Genetic Code',
    'Biological Membranes',
    'Carbohydrate Metabolism',
    'Lipid & Amino Acid Metabolism',
    'Integration of Metabolism',
    'Bioenergetics',
  ],
  'General Chemistry': [
    'Atomic Structure',
    'Periodic Table',
    'Bonding & Interactions',
    'Compounds & Stoichiometry',
    'Chemical Kinetics',
    'Equilibrium',
    'Thermochemistry',
    'Gas Phase',
    'Solutions',
    'Acids & Bases',
    'Oxidation-Reduction',
    'Electrochemistry',
  ],
  'Physics & Math': [
    'Kinematics & Dynamics',
    'Work & Energy',
    'Thermodynamics',
    'Fluids',
    'Electrostatics & Magnetism',
    'Circuits',
    'Waves & Sound',
    'Light & Optics',
    'Atomic & Nuclear Phenomena',
    'Math & Units',
    'Experimental Design',
    'Data & Statistics',
  ],
  'Organic Chemistry': [
    'Functional Groups',
    'Nucleophile vs Electrophile',
    'Acid-Base Chemistry',
    'Reaction Mechanisms',
    'Carbonyl Chemistry',
    'Stability & Resonance',
    'Stereochemistry',
    'Spectroscopy',
    'Separation Techniques',
    'Lab Techniques / Experimental',
  ],
  'Behavioral Sciences': [
    'Biology & Behavior',
    'Sensation & Perception',
    'Learning & Memory',
    'Cognition & Language',
    'Motivation & Emotion',
    'Identity & Personality',
    'Psychological Disorders',
    'Social Processes & Behavior',
    'Social Structure & Demographics',
  ],
  CARS: [
    'Main Idea',
    'Inference',
    'Function',
    'Tone',
    'Author POV',
    'Reasoning Beyond the Text',
  ],
};

const kaplanStructure = {
  BB: { label: 'Biological and Biochemical Foundations', books: allBooks },
  CP: { label: 'Chemical and Physical Foundations', books: allBooks },
  PS: {
    label: 'Psychological, Social, and Biological Foundations',
    books: allBooks,
  },
  CARS: { label: 'Critical Analysis and Reasoning Skills', books: allBooks },
};

const errorTypes = ['Content Gap', 'Reasoning Error', 'Misread', 'Timing', 'Guess'];

const starterEntries = [
  {
    id: 1,
    date: '2026-04-21',
    source: 'UWorld',
    section: 'CP',
    category: 'Organic Chemistry',
    subcategory: 'Nucleophile vs Electrophile',
    secondarySection: 'BB',
    secondaryCategory: 'Biochemistry',
    secondarySubcategory: 'Enzymes',
    errorType: 'Content Gap',
    takeaway:
      'Carbonyl carbon is electrophilic because oxygen withdraws electron density.',
    questionRef: 'UWorld Q#12345',
    questionLink: '',
    screenshotName: '',
    screenshotUrl: '',
    onePagerLink: '',
    notes: 'Missed because I could not identify what gets attacked.',
    currentConfidence: 'Low',
    reviewInterval: 1,
    lastReviewed: '',
    nextReviewDue: '',
    reviewCount: 0,
    answerChoiceSelected: '',
    correctAnswer: 'B',
    answerExplanation:
      'The carbonyl carbon is electron-poor because oxygen pulls electron density away, making that carbon the electrophile.',
    revealState: false,
  },
  {
    id: 2,
    date: '2026-04-20',
    source: 'AAMC FL1',
    section: 'BB',
    category: 'Biochemistry',
    subcategory: 'Enzymes',
    secondarySection: '',
    secondaryCategory: '',
    secondarySubcategory: '',
    errorType: 'Reasoning Error',
    takeaway: 'Competitive inhibition increases Km but does not change Vmax.',
    questionRef: 'FL1 BB Passage 3 Q18',
    questionLink: '',
    screenshotName: '',
    screenshotUrl: '',
    onePagerLink: '',
    notes: 'Knew the content loosely but mixed up Km and Vmax under pressure.',
    currentConfidence: 'Low',
    reviewInterval: 1,
    lastReviewed: '',
    nextReviewDue: '',
    reviewCount: 0,
    answerChoiceSelected: '',
    correctAnswer: 'C',
    answerExplanation:
      'Competitive inhibitors compete at the active site, so more substrate is needed to reach half Vmax, which raises Km while Vmax stays the same.',
    revealState: false,
  },
];

const emptyForm = {
  date: '',
  source: '',
  section: 'BB',
  category: '',
  subcategory: '',
  secondarySection: '',
  secondaryCategory: '',
  secondarySubcategory: '',
  errorType: '',
  takeaway: '',
  questionRef: '',
  questionLink: '',
  screenshotName: '',
  screenshotUrl: '',
  onePagerLink: '',
  notes: '',
  correctAnswer: '',
  answerExplanation: '',
};

function countBy(items, keyFn) {
  const map = new Map();
  items.forEach((item) => {
    const key = keyFn(item);
    if (!key) return;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getNextInterval(previous, confidence) {
  if (confidence === 'Low') return 1;
  if (confidence === 'Medium') return Math.max(2, previous * 2);
  return Math.max(4, previous * 3);
}

function IconButton({ children, onClick, bg, color = pastel.navy }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: 18,
        padding: '12px 16px',
        cursor: 'pointer',
        fontWeight: 700,
        background: bg,
        color,
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [entries, setEntries] = useState(starterEntries);
  const [form, setForm] = useState(emptyForm);
  const [filterSection, setFilterSection] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [scores, setScores] = useState({
    overallCurrent: 495,
    overallGoal: 515,
    BB: 124,
    CP: 123,
    PS: 124,
    CARS: 124,
  });

  const primaryCategories = useMemo(() => {
    return form.section ? Object.keys(kaplanStructure[form.section].books) : [];
  }, [form.section]);

  const primarySubcategories = useMemo(() => {
    if (!form.section || !form.category) return [];
    return kaplanStructure[form.section].books[form.category] || [];
  }, [form.section, form.category]);

  const secondaryCategories = useMemo(() => {
    return form.secondarySection
      ? Object.keys(kaplanStructure[form.secondarySection].books)
      : [];
  }, [form.secondarySection]);

  const secondarySubcategories = useMemo(() => {
    if (!form.secondarySection || !form.secondaryCategory) return [];
    return kaplanStructure[form.secondarySection].books[form.secondaryCategory] || [];
  }, [form.secondarySection, form.secondaryCategory]);

  const filteredEntries = useMemo(() => {
    let data =
      filterSection === 'ALL'
        ? entries
        : entries.filter(
            (e) => e.section === filterSection || e.secondarySection === filterSection
          );

    if (!searchTerm.trim()) return data;

    const q = searchTerm.toLowerCase();
    return data.filter(
      (e) =>
        (e.source || '').toLowerCase().includes(q) ||
        (e.category || '').toLowerCase().includes(q) ||
        (e.subcategory || '').toLowerCase().includes(q) ||
        (e.secondaryCategory || '').toLowerCase().includes(q) ||
        (e.secondarySubcategory || '').toLowerCase().includes(q) ||
        (e.takeaway || '').toLowerCase().includes(q) ||
        (e.notes || '').toLowerCase().includes(q)
    );
  }, [entries, filterSection, searchTerm]);

  const subcategoryPieData = useMemo(() => {
    return countBy(filteredEntries, (e) => e.subcategory)
      .slice(0, 10)
      .map((item, i) => ({ ...item, fill: chartColors[i % chartColors.length] }));
  }, [filteredEntries]);

  const categoryBarData = useMemo(() => {
    return countBy(filteredEntries, (e) => `${e.section} • ${e.category}`).slice(
      0,
      10
    );
  }, [filteredEntries]);

  const todayStr = formatDate(new Date());

  const dueEntries = useMemo(() => {
    return entries
      .filter((e) => !e.nextReviewDue || e.nextReviewDue <= todayStr)
      .sort((a, b) => {
        if ((a.reviewCount || 0) !== (b.reviewCount || 0)) {
          return (a.reviewCount || 0) - (b.reviewCount || 0);
        }
        return new Date(a.date || '2100-01-01') - new Date(b.date || '2100-01-01');
      });
  }, [entries, todayStr]);

  const dailyReviewEntries = dueEntries.slice(0, 5);

  const progressData = useMemo(() => {
    return [
      {
        name: 'Overall',
        current: scores.overallCurrent,
        goal: scores.overallGoal,
        fill: pastel.rose,
      },
      { name: 'BB', current: scores.BB, goal: 132, fill: pastel.aqua },
      { name: 'CP', current: scores.CP, goal: 132, fill: pastel.sky },
      { name: 'PS', current: scores.PS, goal: 132, fill: pastel.butter },
      { name: 'CARS', current: scores.CARS, goal: 132, fill: pastel.mauve },
    ];
  }, [scores]);

  const addEntry = () => {
    if (!form.source || !form.section || !form.category || !form.subcategory || !form.takeaway) {
      return;
    }

    const newEntry = {
      ...form,
      id: Date.now(),
      currentConfidence: 'Low',
      reviewInterval: 1,
      lastReviewed: '',
      nextReviewDue: todayStr,
      reviewCount: 0,
      answerChoiceSelected: '',
      revealState: false,
    };

    setEntries([newEntry, ...entries]);
    setForm({ ...emptyForm, section: form.section });
  };

  const removeEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm({ ...form, screenshotName: file.name, screenshotUrl: url });
  };

  const setReviewChoice = (entryId, choice) => {
    setEntries(
      entries.map((e) =>
        e.id === entryId ? { ...e, answerChoiceSelected: choice, revealState: false } : e
      )
    );
  };

  const revealReviewAnswer = (entryId) => {
    setEntries(entries.map((e) => (e.id === entryId ? { ...e, revealState: true } : e)));
  };

  const reviewQuestion = (entryId, confidence) => {
    const now = new Date();
    setEntries(
      entries.map((e) => {
        if (e.id !== entryId) return e;
        const interval = getNextInterval(e.reviewInterval || 1, confidence);
        const nextDate = new Date(now);
        nextDate.setDate(nextDate.getDate() + interval);
        return {
          ...e,
          currentConfidence: confidence,
          reviewInterval: interval,
          lastReviewed: formatDate(now),
          nextReviewDue: formatDate(nextDate),
          reviewCount: (e.reviewCount || 0) + 1,
          answerChoiceSelected: '',
          revealState: false,
        };
      })
    );
  };

  const cardStyle = {
    background: pastel.panel,
    borderRadius: 26,
    padding: 18,
    boxShadow: '0 12px 28px rgba(47,64,87,.08)',
  };

  const inputStyle = {
    width: '100%',
    border: `1px solid ${pastel.cloud}`,
    borderRadius: 18,
    padding: '12px 14px',
    background: 'white',
    color: pastel.ink,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: pastel.bg,
        color: pastel.ink,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: '0 18px 42px rgba(47,64,87,.1)',
            background: `linear-gradient(135deg, ${pastel.blush} 0%, #fff 35%, ${pastel.aqua} 100%)`,
            padding: 32,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr .9fr',
              gap: 18,
              alignItems: 'end',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,.7)',
                  fontSize: 14,
                }}
              >
                <Sparkles size={16} />
                cute analytics for chaotic MCAT prep
              </div>
              <h1 style={{ margin: '14px 0 0', fontSize: 42, lineHeight: 1.08 }}>
                MCAT Mistake Tracker
              </h1>
              <p style={{ marginTop: 10, color: pastel.slate, maxWidth: 750 }}>
                Track missed questions, attach screenshots when useful, review old
                questions on a spaced schedule, and see exactly where your weak areas
                live.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                gap: 12,
                background: 'rgba(255,255,255,.75)',
                padding: 16,
                borderRadius: 24,
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: pastel.muted }}>Total logged</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{entries.length}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: pastel.muted }}>Due today</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>
                  {dailyReviewEntries.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: pastel.muted }}>Overall</div>
                <div style={{ fontWeight: 700 }}>
                  {scores.overallCurrent} / {scores.overallGoal}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: pastel.muted }}>Top miss</div>
                <div style={{ fontWeight: 700 }}>
                  {subcategoryPieData[0]?.name || '—'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
            gap: 8,
            padding: 6,
            background: pastel.panel,
            borderRadius: 22,
            boxShadow: '0 12px 28px rgba(47,64,87,.08)',
            marginTop: 18,
          }}
        >
          {[
            ['dashboard', 'Dashboard'],
            ['review', 'Daily Review'],
            ['log', 'Add Entry'],
            ['entries', 'All Entries'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                border: 'none',
                borderRadius: 16,
                background: activeTab === key ? 'white' : 'transparent',
                padding: '12px 10px',
                color: activeTab === key ? pastel.ink : pastel.muted,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: '2fr 1fr',
              }}
            >
              <div style={cardStyle}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>
                    <BarChart3 size={18} style={{ verticalAlign: '-3px', marginRight: 8 }} />
                    Most Missed Subconcepts
                  </div>
                  <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                    Pastel pie chart of the topics showing up most often in your misses
                  </div>
                </div>
                <div style={{ height: 340 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subcategoryPieData}
                        dataKey="count"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={115}
                        paddingAngle={3}
                      >
                        {subcategoryPieData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>
                    <Target size={18} style={{ verticalAlign: '-3px', marginRight: 8 }} />
                    Score Progress
                  </div>
                  <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                    Overall target plus section-by-section tracking
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  {progressData.map((row) => {
                    const pct = Math.min(100, Math.round((row.current / row.goal) * 100));
                    return (
                      <div key={row.name}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          <span>{row.name}</span>
                          <span>
                            {row.current} / {row.goal}
                          </span>
                        </div>
                        <div
                          style={{
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            background: pastel.cloud,
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              borderRadius: 999,
                              width: `${pct}%`,
                              background: row.fill,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                        Current overall
                      </div>
                      <input
                        style={inputStyle}
                        value={scores.overallCurrent}
                        onChange={(e) =>
                          setScores({ ...scores, overallCurrent: Number(e.target.value || 0) })
                        }
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                        Goal overall
                      </div>
                      <input
                        style={inputStyle}
                        value={scores.overallGoal}
                        onChange={(e) =>
                          setScores({ ...scores, overallGoal: Number(e.target.value || 0) })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: '2fr 1fr',
                marginTop: 16,
              }}
            >
              <div style={cardStyle}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>Most Missed Categories</div>
                  <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                    See which Kaplan books are driving your misses the most
                  </div>
                </div>
                <div style={{ height: 340 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryBarData}
                      layout="vertical"
                      margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={pastel.cloud} />
                      <XAxis type="number" stroke={pastel.slate} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={130}
                        tick={{ fontSize: 12, fill: pastel.slate }}
                      />
                      <Tooltip />
                      <Bar dataKey="count" radius={[0, 10, 10, 0]} fill={pastel.aqua} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={cardStyle}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 20 }}>Quick Filters</div>
                  <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                    Use this to isolate one section or search by concept
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Section
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                  >
                    <option value="ALL">All Sections</option>
                    <option value="BB">BB</option>
                    <option value="CP">CP</option>
                    <option value="PS">PS</option>
                    <option value="CARS">CARS</option>
                  </select>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Search
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Search
                      size={16}
                      style={{ position: 'absolute', left: 12, top: 13, color: pastel.muted }}
                    />
                    <input
                      style={{ ...inputStyle, paddingLeft: 36 }}
                      placeholder="Search notes, books, or chapters"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: pastel.bg,
                    padding: 12,
                    borderRadius: 18,
                    fontSize: 14,
                    color: pastel.slate,
                  }}
                >
                  Best way to use this page: look at the pie chart, pick your top 2–3 weak
                  areas, then review those one-pagers before doing more questions.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div
            style={{
              marginTop: 18,
              display: 'grid',
              gap: 16,
              gridTemplateColumns: '2fr 1fr',
            }}
          >
            <div style={cardStyle}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>
                  <RefreshCcw size={18} style={{ verticalAlign: '-3px', marginRight: 8 }} />
                  Daily Review Queue
                </div>
                <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                  Re-attempt old questions like a mini quiz, then rate confidence after
                  you reveal the answer.
                </div>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                {dailyReviewEntries.length ? (
                  dailyReviewEntries.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        background: 'white',
                        border: `1px solid ${pastel.blush}`,
                        borderRadius: 22,
                        padding: 16,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                        <div>
                          <div style={{ fontSize: 13, color: pastel.muted }}>
                            {entry.source} • {entry.questionRef || 'No question ref'}
                          </div>
                          <div style={{ marginTop: 4, fontSize: 18, fontWeight: 800 }}>
                            {entry.section} • {entry.category} → {entry.subcategory}
                          </div>
                          {entry.secondarySection && (
                            <div style={{ fontSize: 13, color: pastel.slate, marginTop: 4 }}>
                              Secondary tag: {entry.secondarySection} • {entry.secondaryCategory}{' '}
                              → {entry.secondarySubcategory}
                            </div>
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: pastel.muted }}>
                          Reviewed {entry.reviewCount || 0} times
                        </div>
                      </div>

                      {entry.screenshotUrl ? (
                        <div
                          style={{
                            marginTop: 16,
                            overflow: 'hidden',
                            borderRadius: 18,
                            border: `1px solid ${pastel.blush}`,
                          }}
                        >
                          <img
                            src={entry.screenshotUrl}
                            alt={entry.screenshotName || 'Question screenshot'}
                            style={{
                              width: '100%',
                              maxHeight: 420,
                              objectFit: 'contain',
                              background: 'white',
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: 16,
                            background: pastel.bg,
                            padding: 12,
                            borderRadius: 18,
                            fontSize: 14,
                            color: pastel.slate,
                          }}
                        >
                          No screenshot attached for this question yet. You can still use
                          the concept, notes, and takeaway for review.
                        </div>
                      )}

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
                          gap: 10,
                          marginTop: 16,
                        }}
                      >
                        {['A', 'B', 'C', 'D'].map((choice) => (
                          <button
                            key={choice}
                            onClick={() => setReviewChoice(entry.id, choice)}
                            style={{
                              border: `1px solid ${
                                entry.answerChoiceSelected === choice ? pastel.rose : pastel.cloud
                              }`,
                              borderRadius: 18,
                              padding: '12px 16px',
                              cursor: 'pointer',
                              fontWeight: 700,
                              background:
                                entry.answerChoiceSelected === choice ? pastel.blush : 'white',
                              color: pastel.navy,
                            }}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
                        <IconButton
                          onClick={() => revealReviewAnswer(entry.id)}
                          bg={pastel.navy}
                          color="white"
                        >
                          Reveal answer
                        </IconButton>
                        {entry.questionLink && (
                          <a
                            href={entry.questionLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              border: `1px solid ${pastel.cloud}`,
                              padding: '10px 14px',
                              borderRadius: 999,
                              fontSize: 14,
                            }}
                          >
                            <LinkIcon size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                            Open question
                          </a>
                        )}
                        {entry.onePagerLink && (
                          <a
                            href={entry.onePagerLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              border: `1px solid ${pastel.cloud}`,
                              padding: '10px 14px',
                              borderRadius: 999,
                              fontSize: 14,
                            }}
                          >
                            <BookOpen size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                            One-Pager
                          </a>
                        )}
                      </div>

                      {entry.revealState && (
                        <div
                          style={{
                            background: pastel.bg,
                            borderRadius: 20,
                            padding: 14,
                            marginTop: 16,
                          }}
                        >
                          <div style={{ fontSize: 13 }}>
                            <strong>Your answer:</strong>{' '}
                            {entry.answerChoiceSelected || 'No choice selected'}
                          </div>
                          <div style={{ fontSize: 13, marginTop: 8 }}>
                            <strong>Correct answer:</strong> {entry.correctAnswer || 'Not entered'}
                          </div>
                          {entry.answerExplanation && (
                            <div style={{ fontSize: 13, color: pastel.slate, marginTop: 10 }}>
                              <strong style={{ color: pastel.ink }}>Why:</strong>{' '}
                              {entry.answerExplanation}
                            </div>
                          )}

                          <div
                            style={{
                              background: 'white',
                              padding: 12,
                              borderRadius: 18,
                              fontSize: 14,
                              marginTop: 12,
                            }}
                          >
                            <strong>Takeaway:</strong> {entry.takeaway}
                          </div>

                          {entry.notes && (
                            <div style={{ fontSize: 13, color: pastel.slate, marginTop: 12 }}>
                              {entry.notes}
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 14 }}>
                            <IconButton
                              onClick={() => reviewQuestion(entry.id, 'Low')}
                              bg={pastel.peach}
                            >
                              Low confidence
                            </IconButton>
                            <IconButton
                              onClick={() => reviewQuestion(entry.id, 'Medium')}
                              bg={pastel.cream}
                            >
                              Medium confidence
                            </IconButton>
                            <IconButton
                              onClick={() => reviewQuestion(entry.id, 'High')}
                              bg={pastel.aqua}
                            >
                              High confidence
                            </IconButton>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      background: pastel.bg,
                      padding: 12,
                      borderRadius: 18,
                      fontSize: 14,
                    }}
                  >
                    No questions due today. Cute and suspicious.
                  </div>
                )}
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>Review Rules</div>
                <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                  Simple spaced repetition for your old misses
                </div>
              </div>

              <div style={{ display: 'grid', gap: 12, color: pastel.slate }}>
                <div
                  style={{
                    background: pastel.bg,
                    padding: 12,
                    borderRadius: 18,
                    fontSize: 14,
                  }}
                >
                  <strong>Low confidence:</strong> comes back tomorrow.
                </div>
                <div
                  style={{
                    background: pastel.bg,
                    padding: 12,
                    borderRadius: 18,
                    fontSize: 14,
                  }}
                >
                  <strong>Medium confidence:</strong> interval doubles.
                </div>
                <div
                  style={{
                    background: pastel.bg,
                    padding: 12,
                    borderRadius: 18,
                    fontSize: 14,
                  }}
                >
                  <strong>High confidence:</strong> interval triples.
                </div>
                <div
                  style={{
                    background: pastel.bg,
                    padding: 12,
                    borderRadius: 18,
                    fontSize: 14,
                  }}
                >
                  Older questions naturally come back because anything due gets pulled
                  into the review queue first.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'log' && (
          <div style={{ marginTop: 18 }}>
            <div style={cardStyle}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>Add Missed Question</div>
                <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                  Section = MCAT section, category = Kaplan book, subcategory = Kaplan
                  chapter or concept bucket
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 14,
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Date
                  </div>
                  <input
                    style={inputStyle}
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Source
                  </div>
                  <input
                    style={inputStyle}
                    placeholder="UWorld, AAMC FL1, etc."
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                  />
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Section
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={form.section}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        section: e.target.value,
                        category: '',
                        subcategory: '',
                      })
                    }
                  >
                    <option value="BB">BB</option>
                    <option value="CP">CP</option>
                    <option value="PS">PS</option>
                    <option value="CARS">CARS</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Kaplan Book
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value,
                        subcategory: '',
                      })
                    }
                  >
                    <option value="">Choose book</option>
                    {primaryCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Primary Chapter / Concept
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                  >
                    <option value="">Choose chapter</option>
                    {primarySubcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Error Type
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={form.errorType}
                    onChange={(e) => setForm({ ...form, errorType: e.target.value })}
                  >
                    <option value="">Choose error type</option>
                    {errorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Secondary Tag Section (optional)
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={form.secondarySection}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        secondarySection: e.target.value,
                        secondaryCategory: '',
                        secondarySubcategory: '',
                      })
                    }
                  >
                    <option value="">None</option>
                    <option value="BB">BB</option>
                    <option value="CP">CP</option>
                    <option value="PS">PS</option>
                    <option value="CARS">CARS</option>
                  </select>
                </div>

                {form.secondarySection && (
                  <>
                    <div>
                      <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                        Secondary Kaplan Book
                      </div>
                      <select
                        style={{ ...inputStyle, height: 46 }}
                        value={form.secondaryCategory}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            secondaryCategory: e.target.value,
                            secondarySubcategory: '',
                          })
                        }
                      >
                        <option value="">Choose secondary book</option>
                        {secondaryCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                        Secondary Chapter / Concept
                      </div>
                      <select
                        style={{ ...inputStyle, height: 46 }}
                        value={form.secondarySubcategory}
                        onChange={(e) =>
                          setForm({ ...form, secondarySubcategory: e.target.value })
                        }
                      >
                        <option value="">Choose secondary chapter</option>
                        {secondarySubcategories.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Takeaway
                  </div>
                  <textarea
                    style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
                    placeholder="Write the reusable rule or concept you learned"
                    value={form.takeaway}
                    onChange={(e) => setForm({ ...form, takeaway: e.target.value })}
                  />
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Question Reference
                  </div>
                  <input
                    style={inputStyle}
                    placeholder="e.g. UWorld Q#12345"
                    value={form.questionRef}
                    onChange={(e) => setForm({ ...form, questionRef: e.target.value })}
                  />
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Question Link
                  </div>
                  <input
                    style={inputStyle}
                    placeholder="Paste link if you have one"
                    value={form.questionLink}
                    onChange={(e) => setForm({ ...form, questionLink: e.target.value })}
                  />
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Correct Answer
                  </div>
                  <select
                    style={{ ...inputStyle, height: 46 }}
                    value={form.correctAnswer}
                    onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                  >
                    <option value="">Choose correct answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Answer Explanation
                  </div>
                  <input
                    style={inputStyle}
                    placeholder="Short explanation for why the right answer is right"
                    value={form.answerExplanation}
                    onChange={(e) =>
                      setForm({ ...form, answerExplanation: e.target.value })
                    }
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Question Screenshot
                  </div>
                  <label
                    style={{
                      ...inputStyle,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          padding: 8,
                          borderRadius: 12,
                          background: pastel.bg,
                        }}
                      >
                        <Camera size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>Upload a snip only when useful</div>
                        <div style={{ fontSize: 13, color: pastel.muted }}>
                          Use Snipping Tool, save, then attach here
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        border: `1px solid ${pastel.cloud}`,
                        padding: '8px 12px',
                        borderRadius: 999,
                        fontSize: 13,
                      }}
                    >
                      <Upload size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                      Choose file
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </label>
                  {form.screenshotName && (
                    <div
                      style={{
                        background: pastel.bg,
                        padding: 12,
                        borderRadius: 18,
                        fontSize: 14,
                        marginTop: 8,
                      }}
                    >
                      Attached: <strong>{form.screenshotName}</strong>
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    One-Pager Link
                  </div>
                  <input
                    style={inputStyle}
                    placeholder="Link your one-pager or note"
                    value={form.onePagerLink}
                    onChange={(e) => setForm({ ...form, onePagerLink: e.target.value })}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 14, color: pastel.slate, fontWeight: 600, marginBottom: 8 }}>
                    Notes
                  </div>
                  <textarea
                    style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
                    placeholder="Why did you miss it? what confused you?"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>

                <div
                  style={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <IconButton onClick={addEntry} bg={pastel.rose}>
                    <Plus size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />
                    Add Entry
                  </IconButton>
                  <div style={{ fontSize: 13, color: pastel.muted }}>
                    Log wrong or guessed questions. Save screenshots only when the visual
                    matters.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entries' && (
          <div style={{ marginTop: 18 }}>
            <div style={cardStyle}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>All Logged Questions</div>
                <div style={{ fontSize: 14, color: pastel.muted, marginTop: 4 }}>
                  Your searchable archive of missed and guessed questions
                </div>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      background: 'white',
                      border: `1px solid ${pastel.blush}`,
                      borderRadius: 24,
                      padding: 16,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ fontSize: 13, color: pastel.muted }}>
                          {entry.date || 'No date'} • {entry.source}
                        </div>
                        <div style={{ marginTop: 4, fontWeight: 800 }}>
                          {entry.section} • {entry.category} → {entry.subcategory}
                        </div>
                        <div style={{ fontSize: 13, marginTop: 4 }}>
                          Error type: <strong>{entry.errorType}</strong>
                        </div>
                        {entry.secondarySection && (
                          <div style={{ fontSize: 13, marginTop: 4, color: pastel.slate }}>
                            Secondary tag: {entry.secondarySection} • {entry.secondaryCategory}{' '}
                            → {entry.secondarySubcategory}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeEntry(entry.id)}
                        style={{
                          border: `1px solid ${pastel.cloud}`,
                          borderRadius: 14,
                          background: 'white',
                          padding: '10px 12px',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div
                      style={{
                        background: pastel.bg,
                        padding: 12,
                        borderRadius: 18,
                        fontSize: 14,
                        marginTop: 12,
                      }}
                    >
                      <strong>Takeaway:</strong> {entry.takeaway}
                    </div>

                    {entry.notes && (
                      <div style={{ fontSize: 13, color: pastel.slate, marginTop: 12 }}>
                        {entry.notes}
                      </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
                      {entry.questionRef && (
                        <span
                          style={{
                            border: `1px solid ${pastel.cloud}`,
                            padding: '8px 12px',
                            borderRadius: 999,
                            fontSize: 13,
                            background: 'white',
                          }}
                        >
                          {entry.questionRef}
                        </span>
                      )}
                      {entry.questionLink && (
                        <a
                          href={entry.questionLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            border: `1px solid ${pastel.cloud}`,
                            padding: '8px 12px',
                            borderRadius: 999,
                            fontSize: 13,
                            background: 'white',
                          }}
                        >
                          <LinkIcon size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                          Question
                        </a>
                      )}
                      {entry.onePagerLink && (
                        <a
                          href={entry.onePagerLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            border: `1px solid ${pastel.cloud}`,
                            padding: '8px 12px',
                            borderRadius: 999,
                            fontSize: 13,
                            background: 'white',
                          }}
                        >
                          <BookOpen size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                          One-Pager
                        </a>
                      )}
                      {entry.screenshotUrl && (
                        <a
                          href={entry.screenshotUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            border: `1px solid ${pastel.cloud}`,
                            padding: '8px 12px',
                            borderRadius: 999,
                            fontSize: 13,
                            background: 'white',
                          }}
                        >
                          <Camera size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                          Screenshot
                        </a>
                      )}
                    </div>

                    <div style={{ fontSize: 13, color: pastel.muted, marginTop: 12 }}>
                      Confidence: {entry.currentConfidence} • Next review:{' '}
                      {entry.nextReviewDue || 'today'} • Interval: every {entry.reviewInterval}{' '}
                      day(s)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
