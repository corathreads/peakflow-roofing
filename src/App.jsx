import React, { useEffect, useMemo, useState } from 'react'
import { hasSupabaseConfig, supabase } from './supabaseClient'

const DEFAULT_MATERIALS = {
  roofing: [
    { id: 'roof-1', name: 'Corrugated sheeting', unit: 'sqm', price: 18, group: 'Sheeting' },
    { id: 'roof-2', name: 'Zinc corrugated sheeting', unit: 'sqm', price: 18, group: 'Sheeting' },
    { id: 'roof-3', name: 'Colorbond corrugated', unit: 'sqm', price: 21, group: 'Sheeting' },
    { id: 'roof-4', name: 'Trimdek', unit: 'sqm', price: 24, group: 'Sheeting' },
    { id: 'roof-5', name: 'Klip-Lok 700', unit: 'sqm', price: 32, group: 'Sheeting' },
    { id: 'roof-6', name: 'Klip-Lok 406', unit: 'sqm', price: 36, group: 'Sheeting' },
    { id: 'roof-7', name: 'Spandek', unit: 'sqm', price: 25, group: 'Sheeting' },
    { id: 'roof-8', name: 'Custom orb', unit: 'sqm', price: 22, group: 'Sheeting' },
    { id: 'roof-9', name: 'Longrun roof sheeting', unit: 'sqm', price: 23, group: 'Sheeting' },
    { id: 'roof-10', name: 'Insulated panel roofing', unit: 'sqm', price: 58, group: 'Sheeting' },
    { id: 'roof-11', name: 'Polycarbonate roofing', unit: 'sqm', price: 34, group: 'Sheeting' },
    { id: 'roof-12', name: 'Fibreglass roofing', unit: 'sqm', price: 29, group: 'Sheeting' },
    { id: 'roof-13', name: 'Mini orb', unit: 'sqm', price: 28, group: 'Sheeting' },
    { id: 'roof-14', name: 'Standing seam', unit: 'sqm', price: 55, group: 'Sheeting' },
    { id: 'roof-15', name: 'Snap lock cladding', unit: 'sqm', price: 48, group: 'Sheeting' },
    { id: 'roof-16', name: 'Deck roofing', unit: 'sqm', price: 31, group: 'Sheeting' },
    { id: 'roof-17', name: 'Tile profile sheet', unit: 'sqm', price: 30, group: 'Sheeting' },
    { id: 'roof-18', name: 'Colonial profile', unit: 'sqm', price: 27, group: 'Sheeting' },
    { id: 'roof-19', name: 'Heritage galvanised', unit: 'sqm', price: 26, group: 'Sheeting' },
    { id: 'roof-20', name: 'Aluminium roofing', unit: 'sqm', price: 39, group: 'Sheeting' },
    { id: 'roof-21', name: 'Copper roofing', unit: 'sqm', price: 145, group: 'Sheeting' },
    { id: 'roof-22', name: 'Zinc standing seam', unit: 'sqm', price: 120, group: 'Sheeting' },
    { id: 'roof-23', name: 'Stainless steel roofing', unit: 'sqm', price: 98, group: 'Sheeting' },
    { id: 'roof-24', name: 'Curved roofing sheet', unit: 'sqm', price: 42, group: 'Sheeting' },
    { id: 'roof-25', name: 'Patio roofing panel', unit: 'sqm', price: 26, group: 'Sheeting' },
    { id: 'roof-26', name: 'Commercial box profile', unit: 'sqm', price: 33, group: 'Sheeting' },
    { id: 'roof-27', name: '5 Rib profile', unit: 'sqm', price: 26, group: 'Sheeting' },
    { id: 'roof-28', name: '6 Rib profile', unit: 'sqm', price: 27, group: 'Sheeting' },
    { id: 'roof-29', name: 'KingKlip profile', unit: 'sqm', price: 38, group: 'Sheeting' },
    { id: 'roof-30', name: 'Concealed fix panel', unit: 'sqm', price: 44, group: 'Sheeting' },
    { id: 'roof-31', name: 'Roof safety mesh', unit: 'sqm', price: 9, group: 'Accessories' },
    { id: 'roof-32', name: 'Anticon roof blanket', unit: 'sqm', price: 14, group: 'Accessories' },
    { id: 'roof-33', name: 'Sarking / anticon lite', unit: 'sqm', price: 8, group: 'Accessories' },
    { id: 'roof-34', name: 'Ridge capping', unit: 'lm', price: 19, group: 'Flashings' },
    { id: 'roof-35', name: 'Barge capping', unit: 'lm', price: 21, group: 'Flashings' },
    { id: 'roof-36', name: 'Valley flashing', unit: 'lm', price: 24, group: 'Flashings' },
    { id: 'roof-37', name: 'Apron flashing', unit: 'lm', price: 24, group: 'Flashings' },
    { id: 'roof-38', name: 'Back tray flashing', unit: 'lm', price: 28, group: 'Flashings' },
    { id: 'roof-39', name: 'Roof penetration flashing', unit: 'each', price: 95, group: 'Flashings' },
    { id: 'roof-40', name: 'Custom flashings', unit: 'lm', price: 50, group: 'Flashings' }
  ],
  gutters: [
    { id: 'gutter-1', name: 'Quad gutter', unit: 'lm', price: 20, group: 'Gutter profiles' },
    { id: 'gutter-2', name: 'Half round gutter', unit: 'lm', price: 46, group: 'Gutter profiles' },
    { id: 'gutter-3', name: 'OG gutter', unit: 'lm', price: 42, group: 'Gutter profiles' },
    { id: 'gutter-4', name: 'Box gutter', unit: 'lm', price: 48, group: 'Gutter profiles' },
    { id: 'gutter-5', name: 'Fascia gutter', unit: 'lm', price: 28, group: 'Gutter profiles' },
    { id: 'gutter-6', name: 'Deep flow gutter', unit: 'lm', price: 34, group: 'Gutter profiles' },
    { id: 'gutter-7', name: 'Square front gutter', unit: 'lm', price: 26, group: 'Gutter profiles' },
    { id: 'gutter-8', name: 'Beaded half round', unit: 'lm', price: 49, group: 'Gutter profiles' },
    { id: 'gutter-9', name: 'M-line gutter', unit: 'lm', price: 27, group: 'Gutter profiles' },
    { id: 'gutter-10', name: 'Concealed box gutter', unit: 'lm', price: 56, group: 'Gutter profiles' },
    { id: 'gutter-11', name: 'Gutter bracket set', unit: 'lm', price: 6, group: 'Gutter accessories' },
    { id: 'gutter-12', name: 'Stop end set', unit: 'each', price: 18, group: 'Gutter accessories' }
  ],
  fascia: [
    { id: 'fascia-1', name: 'Metal fascia cover', unit: 'lm', price: 24 },
    { id: 'fascia-2', name: 'Timber fascia replacement', unit: 'lm', price: 52 }
  ],
  insulation: [{ id: 'ins-1', name: 'Blanket insulation', unit: 'sqm', price: 14 }],
  labour: [
    { id: 'labour-1', name: 'Roofing labourer day rate', unit: 'day', price: 350, group: 'Crew rates' },
    { id: 'labour-2', name: 'Leading hand day rate', unit: 'day', price: 420, group: 'Crew rates' },
    { id: 'labour-3', name: 'Apprentice day rate', unit: 'day', price: 240, group: 'Crew rates' },
    { id: 'labour-4', name: 'Site expenses per day', unit: 'day', price: 800, group: 'Operating costs' },
    { id: 'labour-5', name: 'Return trip labour day', unit: 'day', price: 700, group: 'Operating costs' }
  ],
  extras: [
    { id: 'extra-1', name: 'Downpipe set', unit: 'each', price: 145, group: 'Site extras' },
    { id: 'extra-2', name: 'Parapet capping', unit: 'lm', price: 50, group: 'Site extras' },
    { id: 'extra-3', name: 'Scaffold allowance', unit: 'job', price: 950, group: 'Site extras' },
    { id: 'extra-4', name: 'Delivery fee', unit: 'each', price: 300, group: 'Logistics' }
  ]
}

const DEFAULT_FORM = {
  jobName: '',
  client: '',
  suburb: '',
  bookedStartDate: '2026-04-08',
  status: 'Quoted',
  roofArea: 180,
  roofMaterial: 'Corrugated sheeting',
  insulationIncluded: true,
  gutterLength: 36,
  gutterType: 'Quad gutter',
  fasciaLength: 36,
  fasciaType: 'Metal fascia cover',
  flashingLength: 0,
  downpipesRequired: false,
  parapetsRequired: false,
  complexity: 1,
  employees: 2,
  wagePerEmployeePerDay: 350,
  expensesPerDay: 800,
  markupPercent: 20,
  depositPercent: 25,
  notes: ''
}

const CATEGORY_LABELS = {
  roofing: 'Roofing',
  gutters: 'Gutters',
  fascia: 'Fascia',
  insulation: 'Insulation',
  labour: 'Labour',
  extras: 'Extras'
}

const STATUS_OPTIONS = ['Lead', 'Quoted', 'Booked', 'In Progress', 'Complete']

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 16,
  border: '1px solid #d6e4ea',
  background: 'rgba(255,255,255,0.88)',
  fontSize: 15,
  boxSizing: 'border-box'
}

const sectionCardStyle = {
  background: 'rgba(255,255,255,0.78)',
  border: '1px solid rgba(208, 222, 231, 0.95)',
  borderRadius: 28,
  padding: 22,
  backdropFilter: 'blur(18px)',
  boxShadow: '0 22px 50px rgba(15, 23, 42, 0.08)'
}

const metricCardStyle = {
  background: 'linear-gradient(145deg, #ecfeff 0%, #eff6ff 100%)',
  borderRadius: 20,
  padding: 18,
  border: '1px solid #d4e5ee'
}

const AUTH_USERS_KEY = 'roofing-pipeline-users'
const AUTH_SESSION_KEY = 'roofing-pipeline-session'
const APP_STATE_PREFIX = 'roofing-pipeline-state'

function formatMoney(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0)
}

function formatDate(value) {
  if (!value) {
    return 'Not booked'
  }

  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(`${value}T00:00:00`))
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`
}

function monthLabel(date) {
  return new Intl.DateTimeFormat('en-AU', {
    month: 'long',
    year: 'numeric'
  }).format(date)
}

function isSameMonth(dateValue, monthDate) {
  const date = new Date(`${dateValue}T00:00:00`)
  return date.getFullYear() === monthDate.getFullYear() && date.getMonth() === monthDate.getMonth()
}

function sortJobsByStartDate(jobs) {
  return [...jobs].sort(
    (first, second) =>
      new Date(`${first.bookedStartDate}T00:00:00`) - new Date(`${second.bookedStartDate}T00:00:00`)
  )
}

function getJobStatusTone(status) {
  switch (status) {
    case 'Booked':
      return { background: '#d9f99d', color: '#365314' }
    case 'In Progress':
      return { background: '#bfdbfe', color: '#1d4ed8' }
    case 'Complete':
      return { background: '#dcfce7', color: '#166534' }
    case 'Lead':
      return { background: '#fef3c7', color: '#92400e' }
    default:
      return { background: '#e4edd8', color: '#334329' }
  }
}

function summarisePipeline(jobs, calendarMonth) {
  const sortedJobs = sortJobsByStartDate(jobs)
  const totalQuoted = jobs.reduce((sum, job) => sum + (job.estimate?.sellPrice || 0), 0)
  const bookedJobs = jobs.filter((job) => job.status === 'Booked' || job.status === 'In Progress')
  const upcomingJob = sortedJobs.find(
    (job) => new Date(`${job.bookedStartDate}T00:00:00`) >= new Date(new Date().toDateString())
  )
  const monthJobs = jobs.filter((job) => isSameMonth(job.bookedStartDate, calendarMonth))
  const returnVisits = jobs.reduce((sum, job) => sum + (job.estimate?.followUpDays > 0 ? 1 : 0), 0)

  return {
    totalQuoted,
    bookedCount: bookedJobs.length,
    monthRevenue: monthJobs.reduce((sum, job) => sum + (job.estimate?.sellPrice || 0), 0),
    returnVisits,
    upcomingJob
  }
}

function readStoredUsers() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(AUTH_USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function readStoredSession() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(AUTH_SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readLocalAppState(userId) {
  if (typeof window === 'undefined' || !userId) {
    return null
  }

  try {
    const raw = window.localStorage.getItem(`${APP_STATE_PREFIX}-${userId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeLocalAppState(userId, data) {
  if (typeof window === 'undefined' || !userId) {
    return
  }

  window.localStorage.setItem(`${APP_STATE_PREFIX}-${userId}`, JSON.stringify(data))
}

function createEmptyMaterial() {
  return { category: 'roofing', name: '', unit: 'sqm', price: 0, group: 'Sheeting' }
}

function getCategoryItems(materials, category) {
  return materials[category] || []
}

function getMaterialPrice(materials, category, name) {
  const match = getCategoryItems(materials, category).find((item) => item.name === name)
  return match ? match.price : 0
}

function groupMaterials(items) {
  return items.reduce((groups, item) => {
    const key = item.group || 'General'
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {})
}

function estimateJob(form, materials) {
  const roofRate = getMaterialPrice(materials, 'roofing', form.roofMaterial)
  const gutterRate = getMaterialPrice(materials, 'gutters', form.gutterType)
  const fasciaRate = getMaterialPrice(materials, 'fascia', form.fasciaType)
  const blanketRate = getMaterialPrice(materials, 'insulation', 'Blanket insulation')
  const flashingsRate = getMaterialPrice(materials, 'roofing', 'Custom flashings')
  const deliveryFeeRate = getMaterialPrice(materials, 'extras', 'Delivery fee')
  const libraryLabourRate =
    getMaterialPrice(materials, 'labour', 'Roofing labourer day rate') || form.wagePerEmployeePerDay
  const libraryExpenseRate =
    getMaterialPrice(materials, 'labour', 'Site expenses per day') || form.expensesPerDay
  const deliveryFeesCount = 3

  const roofMaterialCost = Math.round(form.roofArea * roofRate)
  const gutterMaterialCost = Math.round(form.gutterLength * gutterRate)
  const fasciaMaterialCost = Math.round(form.fasciaLength * fasciaRate)
  const insulationCost = form.insulationIncluded ? Math.round(form.roofArea * blanketRate) : 0
  const flashingCost = Math.round(form.flashingLength * flashingsRate)
  const deliveryFeesCost = Math.round(deliveryFeesCount * deliveryFeeRate)
  const materialTotal =
    roofMaterialCost +
    gutterMaterialCost +
    fasciaMaterialCost +
    insulationCost +
    flashingCost +
    deliveryFeesCost

  const roofDays = Math.max(1, Math.ceil((form.roofArea / 200) * form.complexity))
  const gutterAndFasciaDays =
    form.gutterLength > 0 || form.fasciaLength > 0
      ? Math.max(1, Math.ceil((Math.max(form.gutterLength, form.fasciaLength) / 60) * form.complexity))
      : 0
  const flashingDays = form.flashingLength > 0 ? Math.max(1, Math.ceil(form.flashingLength / 50)) : 0
  const installFlashingDays = form.parapetsRequired ? 0 : flashingDays
  const followUpParapetDays = form.parapetsRequired && form.flashingLength > 0 ? flashingDays : 0
  const followUpDownpipeDays = form.downpipesRequired ? 1 : 0
  const installDays = roofDays + gutterAndFasciaDays + installFlashingDays
  const followUpDays = followUpParapetDays + followUpDownpipeDays
  const totalDays = installDays + followUpDays

  const crewDailyWages = form.employees * libraryLabourRate
  const dailyOperatingCost = crewDailyWages + libraryExpenseRate
  const labourAndExpenseCost = totalDays * dailyOperatingCost
  const baseCost = materialTotal + labourAndExpenseCost
  const sellPrice = baseCost * (1 + form.markupPercent / 100)
  const depositAmount = sellPrice * (form.depositPercent / 100)
  const balanceAmount = sellPrice - depositAmount

  const startDate = new Date(`${form.bookedStartDate}T00:00:00`)
  const followUpDate =
    followUpDays > 0 ? toDateKey(addDays(startDate, installDays + 28)) : ''

  return {
    roofMaterialCost,
    gutterMaterialCost,
    fasciaMaterialCost,
    insulationCost,
    flashingCost,
    deliveryFeesCount,
    deliveryFeesCost,
    materialTotal,
    roofDays,
    gutterAndFasciaDays,
    installFlashingDays,
    followUpParapetDays,
    followUpDownpipeDays,
    installDays,
    followUpDays,
    totalDays,
    crewDailyWages,
    labourRateUsed: libraryLabourRate,
    expenseRateUsed: libraryExpenseRate,
    dailyOperatingCost,
    labourAndExpenseCost,
    baseCost,
    sellPrice,
    depositAmount,
    balanceAmount,
    followUpDate
  }
}

function getScheduleEvents(job) {
  const events = [
    {
      id: `${job.id}-install`,
      title: job.jobName,
      suburb: job.suburb,
      startDate: job.bookedStartDate,
      duration: job.estimate.installDays,
      type: 'Install',
      detail: `Roof + fascia + gutter${job.estimate.installFlashingDays > 0 ? ' + flashings' : ''}`
    }
  ]

  if (job.estimate.followUpDays > 0 && job.estimate.followUpDate) {
    const detail = [job.downpipesRequired ? 'Downpipes' : '', job.parapetsRequired ? 'Parapets' : '']
      .filter(Boolean)
      .join(' + ')

    events.push({
      id: `${job.id}-followup`,
      title: `${job.jobName} follow-up`,
      suburb: job.suburb,
      startDate: job.estimate.followUpDate,
      duration: job.estimate.followUpDays,
      type: 'Return',
      detail
    })
  }

  return events
}

function Field({ label, children, hint }) {
  return (
    <label style={{ display: 'grid', gap: 8 }}>
      <span style={{ fontWeight: 700, color: '#314126' }}>{label}</span>
      {children}
      {hint ? <span style={{ fontSize: 13, color: '#65735a' }}>{hint}</span> : null}
    </label>
  )
}

function NumberField({ label, value, onChange, hint, min = 0, step = 1 }) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={inputStyle}
      />
    </Field>
  )
}

function MetricTile({ label, value, caption, tone = 'light' }) {
  const tones = {
    light: {
      background: 'linear-gradient(145deg, #ecfeff 0%, #eff6ff 100%)',
      border: '1px solid #d4e5ee',
      color: '#0f172a',
      accent: '#0f766e'
    },
    dark: {
      background: 'linear-gradient(145deg, rgba(15,23,42,0.96) 0%, rgba(8,145,178,0.94) 100%)',
      border: '1px solid rgba(125,211,252,0.24)',
      color: '#f8fafc',
      accent: '#67e8f9'
    }
  }

  const palette = tones[tone]

  return (
    <div
      style={{
        background: palette.background,
        borderRadius: 22,
        padding: 18,
        border: palette.border,
        color: palette.color
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: palette.accent }}>
        {label}
      </div>
      <div style={{ marginTop: 8, fontSize: 28, fontWeight: 800 }}>{value}</div>
      {caption ? <div style={{ marginTop: 8, lineHeight: 1.5, opacity: 0.82 }}>{caption}</div> : null}
    </div>
  )
}

function OverviewBar({ jobs, calendarMonth, isMobile }) {
  const summary = summarisePipeline(jobs, calendarMonth)

  return (
    <section
      style={{
        ...sectionCardStyle,
        marginBottom: 16,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(12, 74, 110, 0.95) 55%, rgba(8, 145, 178, 0.92) 100%)',
        color: '#f8fafc',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
          <div>
            <div style={{ textTransform: 'uppercase', letterSpacing: 1.8, fontSize: 12, color: '#a5f3fc', fontWeight: 800 }}>
              Business Snapshot
            </div>
            <h2 style={{ margin: '8px 0 10px', fontSize: isMobile ? 28 : 34 }}>
              Keep quoting, bookings, and follow-ups in one run sheet.
            </h2>
            <p style={{ margin: 0, maxWidth: 720, lineHeight: 1.6, color: '#d9f7ff' }}>
              This month is tracking {formatMoney(summary.monthRevenue)} across scheduled starts, with
              {` ${summary.returnVisits} `}jobs already earmarked for a return visit.
            </p>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', fontWeight: 700 }}>
            {jobs.length} jobs in pipeline
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
          <MetricTile label="Quoted Value" value={formatMoney(summary.totalQuoted)} caption="Current pipeline total" tone="dark" />
          <MetricTile label="Booked Jobs" value={`${summary.bookedCount}`} caption="Booked or actively underway" tone="dark" />
          <MetricTile label="Next Install" value={summary.upcomingJob ? formatDate(summary.upcomingJob.bookedStartDate) : 'Not booked'} caption={summary.upcomingJob ? summary.upcomingJob.jobName : 'No future jobs scheduled yet'} tone="dark" />
          <MetricTile label="Return Visits" value={`${summary.returnVisits}`} caption="Jobs with a follow-up already planned" tone="dark" />
        </div>
      </div>
    </section>
  )
}

function useViewport() {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isMobile: viewportWidth < 720,
    isTablet: viewportWidth < 1024,
    viewportWidth
  }
}

function Header({ activePage, setActivePage, isMobile }) {
  const descriptions = {
    estimator: {
      title: 'Simple quoting with the job math done for you.',
      text: 'Enter the site quantities, then let the software work out materials, crew cost, install time, and follow-up bookings.'
    },
    materials: {
      title: 'One clean place for your supply rates.',
      text: 'Keep roofing, gutters, fascia, insulation, and extras priced here so every quote uses the same numbers.'
    },
    calendar: {
      title: 'See installs and return trips in one calendar.',
      text: 'Main installs and the 4-week downpipe or parapet follow-up bookings are laid out automatically.'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        marginBottom: 24,
        alignItems: isMobile ? 'stretch' : 'flex-start'
      }}
    >
      <div>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, color: '#0891b2', fontWeight: 800 }}>
          PeakFlow Roofing
        </p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1, margin: '8px 0 10px' }}>
          {descriptions[activePage].title}
        </h1>
        <p style={{ maxWidth: 760, fontSize: 17, lineHeight: 1.6, color: '#475569', margin: 0 }}>
          {descriptions[activePage].text}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
          width: isMobile ? '100%' : 'auto',
          background: 'rgba(255,255,255,0.72)',
          border: '1px solid #d7e7ef',
          padding: 6,
          borderRadius: 20,
          gap: 6,
          backdropFilter: 'blur(14px)'
        }}
      >
        {[
          { id: 'estimator', label: 'Job Estimator' },
          { id: 'materials', label: 'Materials Pricing' },
          { id: 'calendar', label: 'Booking Calendar' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePage(tab.id)}
            style={{
              border: 'none',
              borderRadius: 14,
              padding: '12px 18px',
              background: activePage === tab.id ? 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)' : 'transparent',
              color: activePage === tab.id ? '#f8fafc' : '#0f172a',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function AuthPage({ authMode, setAuthMode, authForm, setAuthForm, authError, authNotice, submitAuth }) {
  const { isMobile } = useViewport()

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 40px)',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 980,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.1fr) minmax(320px, 0.9fr)',
          gap: 24,
          alignItems: 'stretch'
        }}
      >
        <section
          style={{
            ...sectionCardStyle,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(8, 145, 178, 0.9) 100%)',
            color: '#f8fafc',
            padding: 28
          }}
        >
          <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, color: '#bae6fd', fontWeight: 800 }}>
            PeakFlow Roofing
          </p>
          <h1 style={{ margin: '10px 0 14px', fontSize: 'clamp(2rem, 6vw, 3.8rem)', lineHeight: 1 }}>
            Run quotes, pricing, and bookings from one clean web app.
          </h1>
          <p style={{ margin: 0, maxWidth: 520, color: '#dbeafe', fontSize: 17, lineHeight: 1.7 }}>
            Sign in to manage your roofing quotes, pricing, labour, and bookings in one place.
          </p>

          <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
            {[
              'Mobile-friendly quoting and scheduling',
              'Editable materials and labour price library',
              'Automatic install and follow-up booking dates'
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e0f2fe', fontWeight: 600 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#67e8f9', display: 'inline-block' }} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...sectionCardStyle, padding: 28 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              width: '100%',
              background: 'rgba(241,245,249,0.95)',
              borderRadius: 18,
              padding: 6,
              gap: 6,
              marginBottom: 22
            }}
          >
            {['login', 'signup'].map((mode) => (
              <button
                key={mode}
                onClick={() => setAuthMode(mode)}
                style={{
                  border: 'none',
                  borderRadius: 14,
                  padding: '12px 18px',
                  background: authMode === mode ? 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)' : 'transparent',
                  color: authMode === mode ? '#f8fafc' : '#0f172a',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {mode === 'login' ? 'Login' : 'Sign up'}
              </button>
            ))}
          </div>

          <h2 style={{ marginTop: 0 }}>{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {authMode === 'signup' ? (
              <Field label="Full name">
                <input
                  value={authForm.name}
                  onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </Field>
            ) : null}

            <Field label="Email">
              <input
                type="email"
                value={authForm.email}
                onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="name@example.com"
                style={inputStyle}
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Password"
                style={inputStyle}
              />
            </Field>

            {authError ? (
              <div
                style={{
                  borderRadius: 16,
                  padding: '14px 16px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  fontWeight: 600
                }}
              >
                {authError}
              </div>
            ) : null}

            {authNotice ? (
              <div
                style={{
                  borderRadius: 16,
                  padding: '14px 16px',
                  background: '#ecfeff',
                  border: '1px solid #a5f3fc',
                  color: '#155e75',
                  fontWeight: 600
                }}
              >
                {authNotice}
              </div>
            ) : null}

            <button
              onClick={submitAuth}
              style={{
                border: 'none',
                borderRadius: 18,
                padding: '15px 18px',
                background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)',
                color: '#f8fafc',
                fontWeight: 800,
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              {authMode === 'login' ? 'Login to dashboard' : 'Create account'}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function EstimatorPage({
  form,
  estimate,
  jobs,
  materials,
  updateField,
  saveJob,
  loadJobIntoForm,
  deleteJob,
  resetForm,
  formError,
  saveLabel,
  isMobile,
  isTablet
}) {
  const formColumns = isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))'

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : 'minmax(0, 1.3fr) minmax(320px, 0.9fr)',
          gap: 24,
          alignItems: 'start'
        }}
      >
        <div style={{ display: 'grid', gap: 20 }}>
          <section style={sectionCardStyle}>
            <h2 style={{ marginTop: 0 }}>1. Job details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: formColumns, gap: 16 }}>
              <Field label="Job name">
                <input value={form.jobName} onChange={(event) => updateField('jobName', event.target.value)} placeholder="Smith reroof" style={inputStyle} />
              </Field>
              <Field label="Client">
                <input value={form.client} onChange={(event) => updateField('client', event.target.value)} placeholder="Client name" style={inputStyle} />
              </Field>
              <Field label="Suburb">
                <input value={form.suburb} onChange={(event) => updateField('suburb', event.target.value)} placeholder="Adelaide Hills" style={inputStyle} />
              </Field>
              <Field label="Install start date">
                <input type="date" value={form.bookedStartDate} onChange={(event) => updateField('bookedStartDate', event.target.value)} style={inputStyle} />
              </Field>
              <Field label="Pipeline status">
                <select value={form.status} onChange={(event) => updateField('status', event.target.value)} style={inputStyle}>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </Field>
              <NumberField
                label="Complexity factor"
                value={form.complexity}
                onChange={(value) => updateField('complexity', value)}
                step={0.1}
                min={0.8}
                hint="Leave at 1.0 unless access or roof shape is harder than normal."
              />
            </div>
          </section>

          <section style={sectionCardStyle}>
            <h2 style={{ marginTop: 0 }}>2. Site quantities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: formColumns, gap: 16 }}>
              <NumberField label="Roof area (sqm)" value={form.roofArea} onChange={(value) => updateField('roofArea', value)} />
              <Field label="Roof material">
                <select value={form.roofMaterial} onChange={(event) => updateField('roofMaterial', event.target.value)} style={inputStyle}>
                  {materials.roofing.filter((item) => item.unit === 'sqm').map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Blanket insulation">
                <select value={form.insulationIncluded ? 'Included' : 'Not included'} onChange={(event) => updateField('insulationIncluded', event.target.value === 'Included')} style={inputStyle}>
                  <option>Included</option>
                  <option>Not included</option>
                </select>
              </Field>
              <NumberField label="Gutter length (lm)" value={form.gutterLength} onChange={(value) => updateField('gutterLength', value)} />
              <Field label="Gutter type">
                <select value={form.gutterType} onChange={(event) => updateField('gutterType', event.target.value)} style={inputStyle}>
                  {materials.gutters.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Field>
              <NumberField label="Fascia length (lm)" value={form.fasciaLength} onChange={(value) => updateField('fasciaLength', value)} />
              <Field label="Fascia type">
                <select value={form.fasciaType} onChange={(event) => updateField('fasciaType', event.target.value)} style={inputStyle}>
                  {materials.fascia.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </Field>
              <NumberField
                label="Flashing / parapet length (lm)"
                value={form.flashingLength}
                onChange={(value) => updateField('flashingLength', value)}
                hint="Custom flashings run at 50 lm per day."
              />
            </div>
          </section>

          <section style={sectionCardStyle}>
            <h2 style={{ marginTop: 0 }}>3. Crew and follow-up</h2>
            <div style={{ display: 'grid', gridTemplateColumns: formColumns, gap: 16, marginBottom: 18 }}>
              <NumberField label="Employees per job" value={form.employees} onChange={(value) => updateField('employees', value)} min={1} />
              <NumberField label="Markup %" value={form.markupPercent} onChange={(value) => updateField('markupPercent', value)} />
              <NumberField label="Deposit %" value={form.depositPercent} onChange={(value) => updateField('depositPercent', value)} />
              <Field label="Labour rate from price library" hint="Edit this on the Labour section of the pricing page.">
                <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', fontWeight: 800 }}>
                  {formatMoney(estimate.labourRateUsed)} per employee / day
                </div>
              </Field>
              <Field label="Site cost from price library" hint="Edit this on the Labour section of the pricing page.">
                <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', fontWeight: 800 }}>
                  {formatMoney(estimate.expenseRateUsed)} per day
                </div>
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 18 }}>
              <label style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f4f7ee', border: '1px solid #d8dfcb', borderRadius: 14, padding: '12px 14px', fontWeight: 600 }}>
                <input type="checkbox" checked={form.downpipesRequired} onChange={(event) => updateField('downpipesRequired', event.target.checked)} />
                Downpipes return trip
              </label>
              <label style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f4f7ee', border: '1px solid #d8dfcb', borderRadius: 14, padding: '12px 14px', fontWeight: 600 }}>
                <input type="checkbox" checked={form.parapetsRequired} onChange={(event) => updateField('parapetsRequired', event.target.checked)} />
                Parapets booked 4 weeks later
              </label>
            </div>

            <Field label="Notes">
              <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} rows={4} placeholder="Access, scaffold, supplier notes..." style={{ ...inputStyle, resize: 'vertical' }} />
            </Field>
            {formError ? (
              <div style={{ marginTop: 14, borderRadius: 16, padding: '14px 16px', background: '#fff7ed', border: '1px solid #fdba74', color: '#9a3412', fontWeight: 700 }}>
                {formError}
              </div>
            ) : null}
          </section>
        </div>

        <div style={{ position: isTablet ? 'static' : 'sticky', top: 20, display: 'grid', gap: 20 }}>
          <section style={{ ...sectionCardStyle, background: '#23301c', color: '#f7f6ef' }}>
            <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12, color: '#c7d2bb' }}>
              Live quote
            </p>
            <h2 style={{ margin: '8px 0 18px', fontSize: 34 }}>{formatMoney(estimate.sellPrice)}</h2>

            <div style={{ display: 'grid', gap: 12 }}>
              <div style={metricCardStyle}>
                <div style={{ fontSize: 13, color: '#5d694d', textTransform: 'uppercase' }}>Install days</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#203018' }}>{estimate.installDays}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                <div style={metricCardStyle}>
                  <div style={{ fontSize: 13, color: '#5d694d', textTransform: 'uppercase' }}>Deposit</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#203018' }}>{formatMoney(estimate.depositAmount)}</div>
                </div>
                <div style={metricCardStyle}>
                  <div style={{ fontSize: 13, color: '#5d694d', textTransform: 'uppercase' }}>Balance</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#203018' }}>{formatMoney(estimate.balanceAmount)}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, display: 'grid', gap: 8, fontSize: 15, color: '#dbe4d2' }}>
              <div>Materials: {formatMoney(estimate.materialTotal)}</div>
              <div>Delivery fees: {estimate.deliveryFeesCount} x {formatMoney(estimate.deliveryFeesCost / Math.max(estimate.deliveryFeesCount, 1))}</div>
              <div>Daily operating cost: {formatMoney(estimate.dailyOperatingCost)}</div>
              <div>Labour + expenses: {formatMoney(estimate.labourAndExpenseCost)}</div>
              <div>Total crew days: {estimate.totalDays}</div>
              <div>Follow-up date: {estimate.followUpDate ? formatDate(estimate.followUpDate) : 'Not required'}</div>
            </div>

            <button onClick={saveJob} style={{ marginTop: 20, width: '100%', border: 'none', borderRadius: 16, padding: '14px 18px', background: '#f4d676', color: '#2c2a1c', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
              {saveLabel}
            </button>
            <button onClick={resetForm} style={{ marginTop: 12, width: '100%', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, padding: '13px 18px', background: 'rgba(255,255,255,0.08)', color: '#f8fafc', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Reset estimator
            </button>
          </section>

          <section style={sectionCardStyle}>
            <h2 style={{ marginTop: 0 }}>Auto breakdown</h2>
            <div style={{ display: 'grid', gap: 10, color: '#516144', lineHeight: 1.5 }}>
              <div>Roof install: {estimate.roofDays} day/s at 200 sqm/day</div>
              <div>Fascia + gutter: {estimate.gutterAndFasciaDays} day/s at 60 lm/day</div>
              <div>Main flashings: {estimate.installFlashingDays} day/s at 50 lm/day</div>
              <div>Downpipe return: {estimate.followUpDownpipeDays} day/s</div>
              <div>Parapet return: {estimate.followUpParapetDays} day/s</div>
            </div>
          </section>
        </div>
      </div>
      <section style={{ ...sectionCardStyle, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0 }}>Pipeline</h2>
            <p style={{ margin: '6px 0 0', color: '#5c6a50' }}>Each job keeps the quote, install window, and follow-up timing together.</p>
          </div>
          <div style={{ fontWeight: 700, color: '#314126' }}>{jobs.length} jobs saved</div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {jobs.length === 0 ? (
            <div style={{ border: '1px dashed #bcc8b1', borderRadius: 18, padding: 22, color: '#5e6d53', background: '#f6f8f1' }}>
              Add a job to start building your pipeline.
            </div>
          ) : (
            jobs.map((job) => (
              <article key={job.id} style={{ borderRadius: 20, padding: 20, border: '1px solid #d7ddca', background: '#f8fbf5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 23, fontWeight: 800 }}>{job.jobName}</div>
                    <div style={{ color: '#607055' }}>
                      {job.client || 'No client listed'}
                      {job.suburb ? ` | ${job.suburb}` : ''}
                    </div>
                  </div>
                  <div style={{ ...getJobStatusTone(job.status), padding: '6px 10px', borderRadius: 999, fontWeight: 700, fontSize: 13 }}>
                    {job.status}
                  </div>
                </div>

                <div style={{ marginTop: 16, display: 'grid', gap: 8, color: '#415036' }}>
                  <div>Quote: {formatMoney(job.estimate.sellPrice)}</div>
                  <div>Install starts: {formatDate(job.bookedStartDate)}</div>
                  <div>Install days: {job.estimate.installDays}</div>
                  <div>Follow-up: {job.estimate.followUpDate ? formatDate(job.estimate.followUpDate) : 'Not required'}</div>
                  <div>Scope: {job.roofArea} sqm roof, {job.gutterLength} lm gutter, {job.fasciaLength} lm fascia</div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                  <button onClick={() => loadJobIntoForm(job)} style={{ border: 'none', borderRadius: 14, padding: '10px 14px', background: '#0f766e', color: '#f8fafc', fontWeight: 800, cursor: 'pointer' }}>
                    Load into estimator
                  </button>
                  <button onClick={() => deleteJob(job.id)} style={{ border: '1px solid #fecaca', borderRadius: 14, padding: '10px 14px', background: '#fff1f2', color: '#be123c', fontWeight: 800, cursor: 'pointer' }}>
                    Delete job
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  )
}

function MaterialsPage({
  materials,
  draftMaterial,
  setDraftMaterial,
  addMaterial,
  removeMaterial,
  updateMaterial,
  isMobile,
  isTablet
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : 'minmax(320px, 0.85fr) minmax(0, 1.4fr)',
        gap: 24
      }}
    >
      <section style={sectionCardStyle}>
        <h2 style={{ marginTop: 0 }}>Add pricing item</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          <Field label="Category">
            <select value={draftMaterial.category} onChange={(event) => setDraftMaterial((current) => ({ ...current, category: event.target.value }))} style={inputStyle}>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </Field>

          <Field label="Material name">
            <input value={draftMaterial.name} onChange={(event) => setDraftMaterial((current) => ({ ...current, name: event.target.value }))} placeholder="Custom box gutter" style={inputStyle} />
          </Field>

          <Field label="Unit">
            <select value={draftMaterial.unit} onChange={(event) => setDraftMaterial((current) => ({ ...current, unit: event.target.value }))} style={inputStyle}>
              <option value="sqm">sqm</option>
              <option value="lm">lm</option>
              <option value="each">each</option>
              <option value="job">job</option>
              <option value="day">day</option>
            </select>
          </Field>

          <Field label="Sub-group">
            <input value={draftMaterial.group} onChange={(event) => setDraftMaterial((current) => ({ ...current, group: event.target.value }))} placeholder="Sheeting" style={inputStyle} />
          </Field>

          <NumberField label="Price" value={draftMaterial.price} onChange={(value) => setDraftMaterial((current) => ({ ...current, price: value }))} />

          <button onClick={addMaterial} style={{ border: 'none', borderRadius: 16, padding: '14px 18px', background: '#23301c', color: '#f7f6ef', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Add material price
          </button>
        </div>
      </section>

      <section style={sectionCardStyle}>
        <h2 style={{ marginTop: 0 }}>Materials price library</h2>
        <div style={{ display: 'grid', gap: 18 }}>
          {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
            <div key={category}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h3 style={{ margin: 0 }}>{label}</h3>
                <div style={{ color: '#5c6a50', fontWeight: 700 }}>{materials[category].length} items</div>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                {Object.entries(groupMaterials(materials[category])).map(([groupName, groupItems]) => (
                  <div key={`${category}-${groupName}`} style={{ display: 'grid', gap: 12 }}>
                    <div style={{ fontWeight: 800, color: '#4f5e43', textTransform: 'uppercase', letterSpacing: 1 }}>
                      {groupName}
                    </div>
                    {groupItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) auto',
                          gap: 14,
                          alignItems: 'center',
                          borderRadius: 18,
                          padding: 16,
                          border: '1px solid #d7ddca',
                          background: '#f8fbf5'
                        }}
                      >
                        <div>
                          <input
                            value={item.name}
                            onChange={(event) => updateMaterial(category, item.id, 'name', event.target.value)}
                            style={{ ...inputStyle, fontWeight: 800, fontSize: 16, marginBottom: 8 }}
                          />
                          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '120px 120px', gap: 10 }}>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(event) => updateMaterial(category, item.id, 'price', Number(event.target.value))}
                              style={inputStyle}
                            />
                            <select
                              value={item.unit}
                              onChange={(event) => updateMaterial(category, item.id, 'unit', event.target.value)}
                              style={inputStyle}
                            >
                              <option value="sqm">sqm</option>
                              <option value="lm">lm</option>
                              <option value="each">each</option>
                              <option value="job">job</option>
                              <option value="day">day</option>
                            </select>
                          </div>
                          <div style={{ color: '#5c6a50', marginTop: 8 }}>{formatMoney(item.price)} / {item.unit}</div>
                        </div>
                        <button onClick={() => removeMaterial(category, item.id)} style={{ border: '1px solid #d7ddca', borderRadius: 12, padding: '10px 14px', background: '#fffef8', color: '#415036', cursor: 'pointer', fontWeight: 700 }}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function CalendarPage({ jobs, calendarMonth, setCalendarMonth, isMobile }) {
  const monthStart = startOfMonth(calendarMonth)
  const firstGridDate = addDays(monthStart, -monthStart.getDay())
  const calendarDays = Array.from({ length: 42 }, (_, index) => addDays(firstGridDate, index))
  const events = jobs.flatMap((job) => getScheduleEvents(job))

  const eventsByDate = events.reduce((accumulator, event) => {
    const startDate = new Date(`${event.startDate}T00:00:00`)
    for (let index = 0; index < event.duration; index += 1) {
      const dayKey = toDateKey(addDays(startDate, index))
      if (!accumulator[dayKey]) {
        accumulator[dayKey] = []
      }
      accumulator[dayKey].push(event)
    }
    return accumulator
  }, {})

  const monthEvents = events.filter((event) => {
    const startDate = new Date(`${event.startDate}T00:00:00`)
    return startDate.getFullYear() === monthStart.getFullYear() && startDate.getMonth() === monthStart.getMonth()
  })

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <section style={sectionCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <div>
            <h2 style={{ margin: 0 }}>Booking calendar</h2>
            <p style={{ margin: '6px 0 0', color: '#5c6a50' }}>Install work and 4-week follow-ups are both shown below.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
            <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} style={{ ...inputStyle, width: 'auto', cursor: 'pointer', fontWeight: 800 }}>
              Previous
            </button>
            <div style={{ fontWeight: 800, minWidth: 170, textAlign: 'center' }}>{monthLabel(calendarMonth)}</div>
            <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} style={{ ...inputStyle, width: 'auto', cursor: 'pointer', fontWeight: 800 }}>
              Next
            </button>
          </div>
        </div>

        {isMobile ? (
          <div style={{ display: 'grid', gap: 12 }}>
            {monthEvents.length === 0 ? (
              <div style={{ borderRadius: 18, padding: 18, background: '#f6f8f1', border: '1px dashed #bcc8b1', color: '#5e6d53' }}>
                Save jobs with a start date to see them listed here.
              </div>
            ) : (
              monthEvents.map((event) => (
                <div key={`mobile-${event.id}`} style={{ borderRadius: 18, padding: 16, background: '#f8fbf5', border: '1px solid #d7ddca', display: 'grid', gap: 8 }}>
                  <div style={{ fontSize: 19, fontWeight: 800 }}>{event.title}</div>
                  <div style={{ color: '#5c6a50' }}>{event.detail}</div>
                  <div style={{ fontWeight: 700, color: '#334329' }}>{formatDate(event.startDate)}</div>
                  <div style={{ color: '#415036' }}>{event.duration} day/s{event.suburb ? ` | ${event.suburb}` : ''}</div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 10 }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} style={{ fontWeight: 800, color: '#5b684f', padding: '0 4px' }}>{day}</div>
            ))}
            {calendarDays.map((day) => {
              const dayKey = toDateKey(day)
              const dayEvents = eventsByDate[dayKey] || []
              const isCurrentMonth = day.getMonth() === calendarMonth.getMonth()

              return (
                <div key={dayKey} style={{ minHeight: 148, borderRadius: 18, padding: 12, background: isCurrentMonth ? '#f8fbf5' : '#eef2e8', border: '1px solid #d7ddca', display: 'grid', alignContent: 'start', gap: 8 }}>
                  <div style={{ fontWeight: 800, color: isCurrentMonth ? '#24321d' : '#7a8570' }}>{day.getDate()}</div>
                  {dayEvents.length === 0 ? (
                    <div style={{ color: '#9aa38f', fontSize: 13 }}>No booking</div>
                  ) : (
                    dayEvents.map((event) => (
                      <div key={`${dayKey}-${event.id}`} style={{ borderRadius: 12, padding: '8px 10px', background: event.type === 'Return' ? '#5d7a42' : '#23301c', color: '#f7f6ef', fontSize: 13, lineHeight: 1.4 }}>
                        <div style={{ fontWeight: 800 }}>{event.title}</div>
                        <div>{event.type}</div>
                        <div>{event.detail}</div>
                      </div>
                    ))
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section style={sectionCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0 }}>Bookings this month</h2>
            <p style={{ margin: '6px 0 0', color: '#5c6a50' }}>Every install and return trip starting in {monthLabel(calendarMonth)}.</p>
          </div>
          <div style={{ fontWeight: 700, color: '#314126' }}>{monthEvents.length} bookings this month</div>
        </div>

        <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
          {monthEvents.length === 0 ? (
            <div style={{ borderRadius: 18, padding: 18, background: '#f6f8f1', border: '1px dashed #bcc8b1', color: '#5e6d53' }}>
              Save jobs with a start date to see them listed here.
            </div>
          ) : (
            monthEvents.map((event) => (
              <div key={`month-${event.id}`} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) auto auto', gap: 16, alignItems: 'center', borderRadius: 18, padding: 18, background: '#f8fbf5', border: '1px solid #d7ddca' }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{event.title}</div>
                  <div style={{ color: '#5c6a50' }}>{event.detail}{event.suburb ? ` | ${event.suburb}` : ''}</div>
                </div>
                <div style={{ fontWeight: 700, color: '#334329' }}>{formatDate(event.startDate)}</div>
                <div style={{ fontWeight: 700, color: '#334329' }}>{event.duration} day/s</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const { isMobile, isTablet } = useViewport()
  const [users, setUsers] = useState(() => readStoredUsers())
  const [currentUser, setCurrentUser] = useState(() => readStoredSession())
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [authNotice, setAuthNotice] = useState('')
  const [activePage, setActivePage] = useState('estimator')
  const [jobs, setJobs] = useState([])
  const [materials, setMaterials] = useState(DEFAULT_MATERIALS)
  const [draftMaterial, setDraftMaterial] = useState(createEmptyMaterial())
  const [form, setForm] = useState(DEFAULT_FORM)
  const [calendarMonth, setCalendarMonth] = useState(new Date('2026-04-01T00:00:00'))
  const [dataReady, setDataReady] = useState(false)
  const [formError, setFormError] = useState('')
  const [editingJobId, setEditingJobId] = useState(null)
  const [syncNotice, setSyncNotice] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users))
    }
  }, [users])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentUser) {
        window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(currentUser))
      } else {
        window.localStorage.removeItem(AUTH_SESSION_KEY)
      }
    }
  }, [currentUser])

  useEffect(() => {
    let cancelled = false

    async function restoreSupabaseSession() {
      if (!hasSupabaseConfig || !supabase) {
        return
      }

      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!cancelled && session?.user) {
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email || 'User',
          email: session.user.email || ''
        })
      }
    }

    restoreSupabaseSession()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      return undefined
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email || 'User',
          email: session.user.email || ''
        })
      } else {
        setCurrentUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadAppData() {
      if (!currentUser) {
        setJobs([])
        setMaterials(DEFAULT_MATERIALS)
        setDataReady(false)
        return
      }

      if (hasSupabaseConfig && supabase) {
        const { data, error } = await supabase
          .from('app_snapshots')
          .select('materials, jobs')
          .eq('user_id', currentUser.id)
          .maybeSingle()

        if (!cancelled) {
          if (error) {
            setAuthNotice('Signed in, but cloud data could not be loaded yet. Using local backup.')
          }

          if (data) {
            setMaterials(data.materials || DEFAULT_MATERIALS)
            setJobs(data.jobs || [])
            setDataReady(true)
            return
          }
        }
      }

      const localState = readLocalAppState(currentUser.id)
      if (!cancelled) {
        setMaterials(localState?.materials || DEFAULT_MATERIALS)
        setJobs(localState?.jobs || [])
        setDataReady(true)
      }
    }

    loadAppData()

    return () => {
      cancelled = true
    }
  }, [currentUser])

  useEffect(() => {
    let cancelled = false

    async function syncAppData() {
      if (!currentUser || !dataReady) {
        return
      }

      const snapshot = {
        user_id: currentUser.id,
        full_name: currentUser.name,
        materials,
        jobs,
        updated_at: new Date().toISOString()
      }

      writeLocalAppState(currentUser.id, { materials, jobs })

      if (hasSupabaseConfig && supabase) {
        const { error } = await supabase.from('app_snapshots').upsert(snapshot)
        if (!cancelled && error) {
          setAuthNotice('Cloud sync is not ready yet. Your latest changes are still stored in this browser.')
        } else if (!cancelled) {
          setSyncNotice(`Saved ${new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit' }).format(new Date())}`)
        }
      } else if (!cancelled) {
        setSyncNotice('Saved in this browser')
      }
    }

    syncAppData()

    return () => {
      cancelled = true
    }
  }, [currentUser, dataReady, materials, jobs])

  const estimate = useMemo(() => estimateJob(form, materials), [form, materials])
  const sortedJobs = useMemo(() => sortJobsByStartDate(jobs), [jobs])

  const updateField = (key, value) => {
    if (formError) {
      setFormError('')
    }
    setForm((current) => ({ ...current, [key]: value }))
  }

  const saveJob = () => {
    if (!form.jobName.trim()) {
      setFormError('Add a job name so the quote can be saved to the pipeline.')
      return
    }

    const savedJob = { ...form, id: editingJobId || `${Date.now()}`, estimate: estimateJob(form, materials) }

    setJobs((current) => {
      if (editingJobId) {
        return current.map((job) => (job.id === editingJobId ? savedJob : job))
      }

      return [savedJob, ...current]
    })

    setForm((current) => ({
      ...DEFAULT_FORM,
      bookedStartDate: current.bookedStartDate,
      roofMaterial: current.roofMaterial,
      gutterType: current.gutterType,
      fasciaType: current.fasciaType
    }))
    setEditingJobId(null)
    setFormError('')
  }

  const resetForm = () => {
    setForm((current) => ({
      ...DEFAULT_FORM,
      bookedStartDate: current.bookedStartDate,
      roofMaterial: current.roofMaterial,
      gutterType: current.gutterType,
      fasciaType: current.fasciaType
    }))
    setEditingJobId(null)
    setFormError('')
  }

  const loadJobIntoForm = (job) => {
    const { estimate: _estimate, ...jobForm } = job
    setForm(jobForm)
    setEditingJobId(job.id)
    setActivePage('estimator')
    setFormError('')
  }

  const deleteJob = (jobId) => {
    setJobs((current) => current.filter((job) => job.id !== jobId))
    if (editingJobId === jobId) {
      resetForm()
    }
  }

  const addMaterial = () => {
    if (!draftMaterial.name.trim()) {
      return
    }

    const item = { ...draftMaterial, id: `${draftMaterial.category}-${Date.now()}` }
    setMaterials((current) => ({
      ...current,
      [draftMaterial.category]: [item, ...current[draftMaterial.category]]
    }))
    setDraftMaterial(createEmptyMaterial())
  }

  const removeMaterial = (category, id) => {
    setMaterials((current) => ({
      ...current,
      [category]: current[category].filter((item) => item.id !== id)
    }))
  }

  const updateMaterial = (category, id, field, value) => {
    setMaterials((current) => ({
      ...current,
      [category]: current[category].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const submitAuth = () => {
    const email = authForm.email.trim().toLowerCase()
    const password = authForm.password.trim()

    if (!email || !password) {
      setAuthError('Enter your email and password.')
      return
    }

    const run = async () => {
      setAuthError('')
      setAuthNotice('')

      if (hasSupabaseConfig && supabase) {
        if (authMode === 'signup') {
          const name = authForm.name.trim()
          if (!name) {
            setAuthError('Enter your full name.')
            return
          }

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name
              }
            }
          })

          if (error) {
            setAuthError(error.message)
            return
          }

          if (data.session?.user) {
            setCurrentUser({
              id: data.session.user.id,
              name: data.session.user.user_metadata?.full_name || name,
              email: data.session.user.email || email
            })
            setAuthNotice('Account created and signed in.')
            setAuthForm({ name: '', email: '', password: '' })
            return
          }

          if (data.user) {
            setAuthMode('login')
            setAuthNotice('Account created. Check your email if confirmation is enabled, then log in.')
            setAuthForm({ name: '', email, password: '' })
          }
          return
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          setAuthError(error.message)
          return
        }

        if (data.user) {
          setCurrentUser({
            id: data.user.id,
            name: data.user.user_metadata?.full_name || data.user.email || 'User',
            email: data.user.email || email
          })
          setAuthForm({ name: '', email: '', password: '' })
        }
        return
      }

      if (authMode === 'signup') {
        const name = authForm.name.trim()
        if (!name) {
          setAuthError('Enter your full name.')
          return
        }

        if (users.some((user) => user.email === email)) {
          setAuthError('That email is already registered.')
          return
        }

        const newUser = {
          id: `${Date.now()}`,
          name,
          email,
          password
        }

        setUsers((current) => [...current, newUser])
        setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email })
        setAuthNotice('Using local browser auth until Supabase keys are added.')
        setAuthForm({ name: '', email: '', password: '' })
        return
      }

      const existingUser = users.find((user) => user.email === email && user.password === password)
      if (!existingUser) {
        setAuthError('Incorrect email or password.')
        return
      }

      setCurrentUser({ id: existingUser.id, name: existingUser.name, email: existingUser.email })
      setAuthNotice('Using local browser auth until Supabase keys are added.')
      setAuthForm({ name: '', email: '', password: '' })
    }

    run()
  }

  const logout = () => {
    if (hasSupabaseConfig && supabase) {
      supabase.auth.signOut()
    }
    setCurrentUser(null)
    setAuthMode('login')
    setAuthForm({ name: '', email: '', password: '' })
    setAuthError('')
    setAuthNotice('')
  }

  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', fontFamily: '"Inter", "Segoe UI", sans-serif', padding: '20px 16px calc(32px + env(safe-area-inset-bottom))' }}>
        <AuthPage
          authMode={authMode}
          setAuthMode={(mode) => {
            setAuthMode(mode)
            setAuthError('')
            setAuthNotice('')
          }}
          authForm={authForm}
          setAuthForm={setAuthForm}
          authError={authError}
          authNotice={authNotice}
          submitAuth={submitAuth}
        />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', fontFamily: '"Inter", "Segoe UI", sans-serif', padding: '20px 16px calc(32px + env(safe-area-inset-bottom))' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ color: '#475569', fontWeight: 600 }}>Signed in as {currentUser.name}</div>
          <button
            onClick={logout}
            style={{
              border: '1px solid #d6e4ea',
              borderRadius: 16,
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.84)',
              color: '#0f172a',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
        {authNotice ? (
          <div style={{ ...sectionCardStyle, marginBottom: 16, padding: 16, color: '#155e75', background: 'rgba(236,254,255,0.78)', border: '1px solid #a5f3fc' }}>
            {authNotice}
          </div>
        ) : null}
        <OverviewBar jobs={jobs} calendarMonth={calendarMonth} isMobile={isMobile} />
        {syncNotice ? (
          <div style={{ marginBottom: 16, color: '#5f6f61', fontWeight: 700 }}>
            {syncNotice}
          </div>
        ) : null}
        <Header activePage={activePage} setActivePage={setActivePage} isMobile={isMobile} />

        {activePage === 'estimator' ? (
          <EstimatorPage
            form={form}
            estimate={estimate}
            jobs={sortedJobs}
            materials={materials}
            updateField={updateField}
            saveJob={saveJob}
            loadJobIntoForm={loadJobIntoForm}
            deleteJob={deleteJob}
            resetForm={resetForm}
            formError={formError}
            saveLabel={editingJobId ? 'Update job' : 'Save to pipeline'}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ) : activePage === 'materials' ? (
          <MaterialsPage
            materials={materials}
            draftMaterial={draftMaterial}
            setDraftMaterial={setDraftMaterial}
            addMaterial={addMaterial}
            removeMaterial={removeMaterial}
            updateMaterial={updateMaterial}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        ) : (
          <CalendarPage
            jobs={jobs}
            calendarMonth={calendarMonth}
            setCalendarMonth={setCalendarMonth}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  )
}
