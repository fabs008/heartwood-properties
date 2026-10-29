// All copy and imagery is sourced from heartwoodproperties.co.za (Oct 2026).

export const SITE = 'https://heartwoodproperties.co.za'
const img = (f) => `/img/${f}.webp`

export const contact = {
  phone: '+27 (0)21 035 1744',
  phoneHref: 'tel:+27210351744',
  email: 'john@heartwoodprop.co.za',
  leasing: { name: 'Andrew', phone: '+27 (0)83 440 0261', phoneHref: 'tel:+27834400261', email: 'andrew@heartwoodprop.co.za' },
  vacancies: 'priscilla@heartwoodprop.co.za',
  address: ['Unit 8, Tonquani House', '6 Gardner Williams Avenue', 'Paardevlei, Somerset West', '7130, Western Cape'],
  linkedin: 'https://www.linkedin.com/company/heartwood-properties',
  paia: `${SITE}/wp-content/uploads/2022/02/PAIA-Manual-Heartwood-Properties-V1-2022.pdf`,
  privacy: `${SITE}/privacy-policy/`,
  ctse: 'https://www.ctexchange.co.za',
}

// Hero showcase slides
export const showcase = [
  { name: 'The Reserve', where: 'Paardevlei, Somerset West', status: 'In the pipeline', src: img('reserve-02'), id: 'the-reserve' },
  { name: 'The Summit', where: 'Paardevlei, Somerset West', status: 'Under construction', src: img('paardevlei-p1'), id: 'the-summit' },
  { name: 'The Heartwood', where: 'Paardevlei, Somerset West', status: 'To lease or buy', src: img('heartwood-02'), id: 'the-heartwood' },
  { name: 'The Bridge', where: 'Muldersvlei, Stellenbosch', status: 'Occupation 2027', src: img('bridge-05'), id: 'the-bridge' },
  { name: 'The Reserve', where: 'Paardevlei, Somerset West', status: 'In the pipeline', src: img('reserve-04'), id: 'the-reserve' },
]

export const developments = [
  {
    id: 'the-summit',
    name: 'The Summit',
    status: 'Under construction',
    where: 'Paardevlei Precinct, Beach Road, Somerset West',
    type: 'Offices',
    lede: 'A 2 000 m² office development on a highly visible corner at the entrance to Paardevlei, with two levels of offices over basement parking.',
    stats: [['2 000', 'm² development'], ['257–547', 'm² offices to let'], ['2', 'office levels']],
    note: 'Upper level fully let to WeconnectU. Ground-floor offices available now.',
    features: ['High-exposure signage', 'Basement parking', 'Passenger lift', 'Sea & mountain views', 'Wheelchair friendly', 'Generator', 'Solar PV & battery ready'],
    images: [img('paardevlei-p1'), img('summit-1'), img('summit-2')],
    href: `${SITE}/developments/the-summit/`,
  },
  {
    id: 'the-heartwood',
    name: 'The Heartwood',
    status: 'To lease or buy',
    where: 'Paardevlei Precinct, Beach Road, Somerset West',
    type: 'Office & retail',
    lede: 'A 2 000 m² office and retail address beside Busamed Private Hospital: basement parking, a ground-floor office and retail level, and offices above.',
    stats: [['2 000', 'm² office & retail'], ['127–216', 'm² sectional title units'], ['5 673', 'm² site']],
    note: 'Units can be combined into larger spaces.',
    features: ['High-exposure signage', 'Basement parking', 'Passenger lift', 'Sea & mountain views', 'Wheelchair friendly', 'Generator', 'Solar PV & battery ready'],
    images: [img('heartwood-02'), img('heartwood-04'), img('heartwood-09'), img('heartwood-10')],
    href: `${SITE}/developments/the-heartwood/`,
  },
  {
    id: 'the-reserve',
    name: 'The Reserve',
    status: 'In the pipeline',
    where: 'Paardevlei Precinct, Beach Road, Somerset West',
    type: 'Offices',
    lede: 'Six levels on the precinct’s most visible corner: four floors of offices, a roof deck with sea and mountain views, and basement parking.',
    stats: [['6', 'levels'], ['132–1 010', 'm² offices'], ['1', 'roof deck']],
    note: 'Available to lease or purchase.',
    features: ['High-exposure signage', 'Basement parking', 'Passenger lift', 'Sea & mountain views', 'Wheelchair friendly', 'Generator', 'Solar PV & battery ready'],
    images: [img('reserve-02'), img('reserve-05'), img('reserve-06'), img('reserve-04')],
    href: `${SITE}/developments/the-reserve/`,
  },
  {
    id: 'the-bridge',
    name: 'The Bridge',
    status: 'Occupation 2027',
    where: 'Muldersvlei, Stellenbosch · beside the N1',
    type: 'Warehousing',
    lede: 'Warehouses within a 340-hectare mixed-use estate between Cape Town, Paarl and the Stellenbosch winelands, built to tenant specification.',
    stats: [['7 300', 'm² warehouse · Phase 1'], ['3 382', 'm² warehouse · Phase 2'], ['340', 'hectare estate']],
    note: 'Phase 1 occupation 1 July 2027 (divisible into two units). Phase 2 occupation 1 November 2027.',
    features: ['Built to tenant spec', 'Phase 1 office: 348 m²', 'Phase 2 office: 496 m²', 'Phase 1 site: 20 655 m²', 'Divisible units', 'Direct N1 access'],
    images: [img('bridge-05'), img('bridge-08'), img('bridge-07'), img('bridge-06')],
    href: `${SITE}/developments/the-bridge/`,
  },
  {
    id: 'saxdowne',
    name: 'Saxdowne',
    status: 'Under development',
    where: 'Saxdowne & Stellenbosch Arterial Roads, Cape Town',
    type: 'Warehousing',
    lede: 'A new sectional title warehouse in Cape Town’s leading industrial node, close to the R300, and ready about eight months after signing.',
    stats: [['4 000', 'm² warehouse'], ['±8', 'months to occupation'], ['R300', 'on your doorstep']],
    note: 'Fire pumps and sprinkler tanks are already built and operational.',
    features: ['Sectional title', 'Sprinklers operational', 'Perimeter fencing', 'Controlled access', 'Sustainable design'],
    images: [img('saxdowne-1'), img('saxdowne-2'), img('tl-2026-saxdowne')],
    href: `${SITE}/developments/saxdowne/`,
  },
]

export const nearby = [
  ['Busamed Hospital', '2 min walk'],
  ['New Checkers', '2 min walk'],
  ['Strand Golf Course', '3 min walk'],
  ['Strand Beach', '5 min walk'],
  ['Lionel Smit Art Studio', '5 min walk'],
  ['Nuudo Luxury Spa', '5 min drive'],
  ['Virgin Active', '5 min drive'],
  ['Somerset Mall', '8 min drive'],
]

// Track record, oldest first, with photographs of each building.
export const timeline = [
  { year: 2011, month: 'Apr', title: 'Heartwood is founded', place: 'Private development company', src: img('tl-2011-founding') },
  { year: 2012, month: 'Dec', title: 'Willow Wood, Block A', place: 'For The Business Centre', src: img('tl-2012-ww-a') },
  { year: 2013, month: 'Dec', title: 'Willow Wood, Block C', place: 'For Cronimet SA', src: img('tl-2013-ww-c') },
  { year: 2015, month: 'Sep', title: 'The Media Connection', place: 'Lanseria Corporate Estate', src: img('tl-2015-media') },
  { year: 2017, month: 'Sep', title: 'Willow Wood, Block B', place: 'Gauteng', src: img('tl-2017-ww-b') },
  { year: 2018, month: 'Mar', title: 'Listed on the CTSE', place: 'Cape Town Stock Exchange', src: img('tl-2018-listing') },
  { year: 2018, month: 'Nov', title: 'D4 Electrical', place: 'Lanseria Corporate Estate', src: img('tl-2018-d4') },
  { year: 2019, month: 'Mar', title: 'Willow Wood, Block D', place: 'Anchor tenant Genesys', src: img('tl-2019-ww-d') },
  { year: 2020, month: 'Mar', title: 'Soleil', place: 'Multi-tenanted offices, Bryanston', src: img('tl-2020-soleil') },
  { year: 2021, month: 'Sep', title: 'PadelX', place: '2 600 m² showroom', src: img('tl-2021-padelx') },
  { year: 2022, month: 'Oct', title: 'Alveo Water', place: 'Western Cape', src: img('tl-2022-alveo') },
  { year: 2023, month: 'Feb', title: 'Blue Nova', place: 'Western Cape', src: img('tl-2023-bluenova') },
  { year: 2023, month: 'Dec', title: 'RB & Son', place: 'Western Cape', src: img('tl-2023-rbson') },
  { year: 2025, month: 'Nov', title: 'The Summit breaks ground', place: 'With Paardevlei Phase 2', src: img('tl-2025-summit') },
  { year: 2026, month: 'Oct', title: 'Saxdowne breaks ground', place: 'Cape Town', src: img('tl-2026-saxdowne') },
]

export const objectives = [
  { k: 'Quality', t: 'Modern, green, usable buildings, designed together with the people who will work in them.' },
  { k: 'Portfolio', t: 'A strong, growing portfolio of buildings with a desirable tenant mix.' },
  { k: 'Return', t: 'A long-term pre-tax return to shareholders in excess of 15% per annum, compounded.', stat: 15 },
  { k: 'Wealth', t: 'Lasting wealth for investors, shareholders and joint-venture partners.' },
]

// Directors first (executive, then independent non-executive), then management.
export const board = [
  { name: 'Julian Scher', role: 'Chairman · Independent Non-Executive Director', bio: 'Founding partner of Strauss Scher Attorneys, a real estate law firm established in 1994.' },
  { name: 'John Whall', role: 'Chief Executive Officer', bio: 'Former Financial Director at Group Five Construction, with some 20 years in property development.' },
  { name: 'Andrew Utterson', role: 'Executive Director', bio: 'Founded The Business Centre Group in 2005.' },
  { name: 'Martin Evans', role: 'Independent Non-Executive Director', bio: 'More than 30 years in the property industry.' },
  { name: 'Bernard Seeff', role: 'Independent Non-Executive Director', bio: 'Board experience across property ownership and management.' },
  { name: 'Peter Gent', role: 'Independent Non-Executive Director', bio: 'Former Chief Operating Officer of Rand Merchant Bank.' },
  { name: 'Geoff Jennett', role: 'Independent Non-Executive Director', bio: '35 years of financial leadership, including a decade as CEO of Emira Property Fund.' },
  { name: 'Koba Dumas', role: 'Chief Financial Officer', bio: 'Chartered Accountant (2003) with a background in audit and portfolio management.' },
  { name: 'Tia Williams', role: 'Financial Manager' },
]

export const investorLinks = [
  { label: 'Financial statements', href: `${SITE}/investors/financials/` },
  { label: 'Presentations', href: `${SITE}/investors/presentations/` },
  { label: 'Company announcements', href: `${SITE}/investors/company-announcements/` },
]

export const places = ['Paardevlei', 'Somerset West', 'Stellenbosch', 'Muldersvlei', 'Northriding', 'Lanseria', 'Bryanston', 'Cape Town']
