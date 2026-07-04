import { useEffect, useMemo, useState } from 'react'
import './App.css'
import phoenixLogo from './assets/phoenix-logo.png'

const ACCESS_PIN = '186'
const ADMIN_PIN = '186'

const navSections = [
  {
    title: 'Operations',
    items: [
      { page: 'Beds & Respawns', label: 'Beds & Respawns', icon: '▣' },
      { page: 'Ship Supplies', label: 'Ship Supplies', icon: '▤' },
      { page: 'Supply Issue', label: 'Supply Issue', icon: '□' },
    ],
  },
  {
    title: 'Personnel',
    items: [
      { page: 'Medic Roster', label: 'Medic Roster', icon: '☤' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { page: 'MEDEVAC 9-Liner', label: 'MEDEVAC 9-Liner', icon: '☎' },
    ],
  },
  {
    title: 'Command',
    items: [
      { page: 'Activity Log', label: 'Activity Log', icon: '◷' },
      { page: 'Reports', label: 'Reports', icon: '✦' },
    ],
  },
]

const startingShips = [
  {
    id: 'idris',
    name: 'Idris',
    className: 'Capital Medical Bay',
    status: 'Active',
    type: 'Fixed Medical Bay',
    configuration: 'T3 x4 / T2 x1',
  },
  {
    id: 'apollo-medivac',
    name: 'RSI Apollo Medivac',
    className: 'Modular Medical Ship',
    status: 'Standby',
    type: 'Module Based',
    configuration: 'T3 Module',
  },
  {
    id: 'apollo-triage',
    name: 'RSI Apollo Triage',
    className: 'Modular Medical Ship',
    status: 'Standby',
    type: 'Module Based',
    configuration: 'T3 Module',
  },
  {
    id: 'c8r',
    name: 'C8R Pisces Rescue',
    className: 'Rapid Response Craft',
    status: 'Active',
    type: 'Fixed Rescue Bed',
    configuration: 'Fixed Layout',
  },
  {
    id: 'terrapin',
    name: 'Terrapin Medic',
    className: 'Armored Medical Rescue Craft',
    status: 'Offline',
    type: 'Fixed Medical Craft',
    configuration: 'Fixed Layout',
  },
]

const startingBeds = [
  {
    id: 'idris-bed-1',
    shipId: 'idris',
    bedName: 'Bed 1',
    tier: 'T3 - Basic',
    location: 'Medical Bay',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'idris-bed-2',
    shipId: 'idris',
    bedName: 'Bed 2',
    tier: 'T3 - Basic',
    location: 'Medical Bay',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'idris-bed-3',
    shipId: 'idris',
    bedName: 'Bed 3',
    tier: 'T3 - Basic',
    location: 'Medical Bay',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'idris-bed-4',
    shipId: 'idris',
    bedName: 'Bed 4',
    tier: 'T3 - Basic',
    location: 'Medical Bay',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'idris-bed-5',
    shipId: 'idris',
    bedName: 'Bed 5',
    tier: 'T2 - Standard',
    location: 'Operations Room',
    status: 'Vacant',
    medGelCurrent: 400,
    medGelMax: 400,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-medivac-left-t3-1',
    shipId: 'apollo-medivac',
    bedName: 'Left T3 Bed 1',
    tier: 'T3 - Basic',
    location: 'Left Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-medivac-left-t3-2',
    shipId: 'apollo-medivac',
    bedName: 'Left T3 Bed 2',
    tier: 'T3 - Basic',
    location: 'Left Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-medivac-left-t3-3',
    shipId: 'apollo-medivac',
    bedName: 'Left T3 Bed 3',
    tier: 'T3 - Basic',
    location: 'Left Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-medivac-right-t3-1',
    shipId: 'apollo-medivac',
    bedName: 'Right T3 Bed 1',
    tier: 'T3 - Basic',
    location: 'Right Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-medivac-right-t3-2',
    shipId: 'apollo-medivac',
    bedName: 'Right T3 Bed 2',
    tier: 'T3 - Basic',
    location: 'Right Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-medivac-right-t3-3',
    shipId: 'apollo-medivac',
    bedName: 'Right T3 Bed 3',
    tier: 'T3 - Basic',
    location: 'Right Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-triage-left-t3-1',
    shipId: 'apollo-triage',
    bedName: 'Left T3 Bed 1',
    tier: 'T3 - Basic',
    location: 'Left Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-triage-left-t3-2',
    shipId: 'apollo-triage',
    bedName: 'Left T3 Bed 2',
    tier: 'T3 - Basic',
    location: 'Left Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-triage-left-t3-3',
    shipId: 'apollo-triage',
    bedName: 'Left T3 Bed 3',
    tier: 'T3 - Basic',
    location: 'Left Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-triage-right-t3-1',
    shipId: 'apollo-triage',
    bedName: 'Right T3 Bed 1',
    tier: 'T3 - Basic',
    location: 'Right Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-triage-right-t3-2',
    shipId: 'apollo-triage',
    bedName: 'Right T3 Bed 2',
    tier: 'T3 - Basic',
    location: 'Right Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'apollo-triage-right-t3-3',
    shipId: 'apollo-triage',
    bedName: 'Right T3 Bed 3',
    tier: 'T3 - Basic',
    location: 'Right Module',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 2,
    respawns: [],
  },
  {
    id: 'c8r-bed-1',
    shipId: 'c8r',
    bedName: 'Rescue Bed 1',
    tier: 'T3 - Basic',
    location: 'Rescue Cabin',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 1,
    respawns: [],
  },
  {
    id: 'terrapin-bed-1',
    shipId: 'terrapin',
    bedName: 'Medical Station 1',
    tier: 'T3 - Basic',
    location: 'Armored Rescue Bay',
    status: 'Vacant',
    medGelCurrent: 200,
    medGelMax: 200,
    canisters: 1,
    respawns: [],
  },
]

const startingSupplies = [
  { id: 'hemozal', name: 'Hemozal', description: 'Haemostatic', quantity: 99 },
  { id: 'adrenapen', name: 'AdrenaPen', description: 'Adrenaline / stimulant', quantity: 30 },
  { id: 'detoxpen', name: 'DetoxPen', description: 'Toxin removal', quantity: 30 },
  { id: 'oxypen', name: 'OxyPen', description: 'Oxygenation', quantity: 40 },
  { id: 'opiopen', name: 'OpioPen', description: 'Analgesic / pain', quantity: 30 },
  { id: 'deconpen', name: 'DeconPen', description: 'Decontamination', quantity: 30 },
  { id: 'corticopen', name: 'CorticoPen', description: 'Corticosteroid', quantity: 30 },
  { id: 'paramed-device', name: 'Paramed Device', description: 'Para-medical unit', quantity: 8 },
  { id: 'paramed-refill', name: 'Paramed Refill', description: 'Refill cartridge', quantity: 99 },
  { id: 'medgel', name: 'MedGel', description: 'Topical healing', quantity: 20 },
]

const startingRoster = [
  { name: 'Mike Ramirez', callsign: 'Phoenix Actual', role: 'Medical Command', status: 'Active' },
  { name: 'Phoenix Med-1', callsign: 'Med-1', role: 'Corpsman', status: 'Active' },
  { name: 'Phoenix Med-2', callsign: 'Med-2', role: 'Corpsman', status: 'Standby' },
  { name: 'Phoenix Pilot-1', callsign: 'Dustoff-1', role: 'CASEVAC Pilot', status: 'Active' },
]

function loadStoredData(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return fallback
    return JSON.parse(stored)
  } catch {
    return fallback
  }
}

function getApolloModuleTier(ship) {
  if (ship?.moduleTier) return ship.moduleTier

  if (ship?.configuration?.includes('T1')) return 'T1'
  if (ship?.configuration?.includes('T2')) return 'T2'

  return 'T3'
}

function buildApolloBeds(shipId, moduleTier) {
  const moduleSettings = {
    T3: {
      bedsPerSide: 3,
      tier: 'T3 - Basic',
      medGelMax: 200,
    },
    T2: {
      bedsPerSide: 2,
      tier: 'T2 - Standard',
      medGelMax: 400,
    },
    T1: {
      bedsPerSide: 1,
      tier: 'T1 - Advanced',
      medGelMax: 800,
    },
  }

  const settings = moduleSettings[moduleTier] || moduleSettings.T3
  const sides = ['Left', 'Right']
  const nextBeds = []

  sides.forEach((side) => {
    for (let index = 1; index <= settings.bedsPerSide; index += 1) {
      nextBeds.push({
        id: `${shipId}-${side.toLowerCase()}-${moduleTier.toLowerCase()}-${index}`,
        shipId,
        bedName: `${side} ${moduleTier} Bed ${index}`,
        tier: settings.tier,
        location: `${side} Module`,
        status: 'Vacant',
        medGelCurrent: settings.medGelMax,
        medGelMax: settings.medGelMax,
        canisters: 2,
        respawns: [],
      })
    }
  })

  return nextBeds
}
function formatActivityTime() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = now.toLocaleString('en-US', { month: 'short' })
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')

  return `${day} ${month} ${hour}:${minute}`
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('phoenixAuthenticated') === 'true'
  })
  const [accessPin, setAccessPin] = useState('')
  const [bootComplete, setBootComplete] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [activePage, setActivePage] = useState('Beds & Respawns')
  const [selectedShipId, setSelectedShipId] = useState('idris')

  const [ships, setShips] = useState(() =>
    loadStoredData('phoenixShips', startingShips),
  )
  const [beds, setBeds] = useState(() =>
    loadStoredData('phoenixBeds', startingBeds),
  )
const [supplies, setSupplies] = useState(() =>
  loadStoredData('phoenixSupplies', startingSupplies),
)
const [roster, setRoster] = useState(() =>
  loadStoredData('phoenixRoster', startingRoster),
)
const [activityLog, setActivityLog] = useState(() =>
  loadStoredData('phoenixActivityLog', []),
)

  useEffect(() => {
    localStorage.setItem('phoenixShips', JSON.stringify(ships))
  }, [ships])

  useEffect(() => {
    localStorage.setItem('phoenixBeds', JSON.stringify(beds))
  }, [beds])

useEffect(() => {
  localStorage.setItem('phoenixSupplies', JSON.stringify(supplies))
}, [supplies])

useEffect(() => {
  localStorage.setItem('phoenixRoster', JSON.stringify(roster))
}, [roster])

useEffect(() => {
  localStorage.setItem('phoenixActivityLog', JSON.stringify(activityLog))
}, [activityLog])

  useEffect(() => {
    if (isAuthenticated) return

    const timer = setTimeout(() => {
      setBootComplete(true)
    }, 3200)

    return () => clearTimeout(timer)
  }, [isAuthenticated])

  const selectedShip =
    ships.find((ship) => ship.id === selectedShipId) || ships[0]

  const shipBeds = beds.filter((bed) => bed.shipId === selectedShipId)

  const occupiedBeds = beds.filter(
    (bed) => bed.status === 'Occupied' || bed.respawns.length > 0,
  ).length

  const boxesLowOnStock = supplies.filter((item) => item.quantity <= 10).length

  function addActivity(message, shipId = selectedShipId, icon = '✦') {
    const ship = ships.find((item) => item.id === shipId)

    const entry = {
      id: crypto.randomUUID(),
      icon,
      message,
      ship: ship?.name || 'Phoenix Medical',
      time: formatActivityTime(),
    }

    setActivityLog((currentLog) => [entry, ...currentLog].slice(0, 100))
  }

  function authenticatePortal(event) {
    event.preventDefault()

    if (accessPin === ACCESS_PIN) {
      localStorage.setItem('phoenixAuthenticated', 'true')
      setIsAuthenticated(true)
      setAccessPin('')
    } else {
      window.alert('Incorrect access PIN')
    }
  }

  function logoutPortal() {
    localStorage.removeItem('phoenixAuthenticated')
    setIsAuthenticated(false)
    setIsAdminMode(false)
    setBootComplete(false)
  }

  function toggleAdminMode() {
    if (isAdminMode) {
      setIsAdminMode(false)
      return
    }

    const pin = window.prompt('Enter Phoenix Medical admin PIN')

    if (pin === ADMIN_PIN) {
      setIsAdminMode(true)
    } else if (pin !== null) {
      window.alert('Incorrect admin PIN')
    }
  }

    function updateShipStatus(shipId, newStatus) {
    const ship = ships.find((item) => item.id === shipId)
    const oldStatus = ship?.status || 'Unknown'

    setShips((currentShips) =>
      currentShips.map((item) =>
        item.id === shipId ? { ...item, status: newStatus } : item,
      ),
    )

    addActivity(
      `${ship?.name || 'Ship'} status: ${oldStatus} → ${newStatus}`,
      shipId,
      '🚦',
    )
  }
  function clearAllRespawnsForShip(shipId) {
    const ship = ships.find((item) => item.id === shipId)

    setBeds((currentBeds) =>
      currentBeds.map((bed) =>
        bed.shipId === shipId
          ? {
              ...bed,
              respawns: [],
              status: bed.status === 'Occupied' ? 'Vacant' : bed.status,
            }
          : bed,
      ),
    )

    addActivity(
      `All respawn imprints cleared from ${ship?.name || 'ship'}`,
      shipId,
      '🧹',
    )
  }
  function updateApolloModuleConfig(shipId, moduleTier) {
    const ship = ships.find((item) => item.id === shipId)

    if (!ship) return

    const confirmed = window.confirm(
      `Change ${ship.name} to ${moduleTier} Module? This will rebuild that Apollo's beds and clear current respawns for that ship.`,
    )

    if (!confirmed) return

    const rebuiltBeds = buildApolloBeds(shipId, moduleTier)

    setShips((currentShips) =>
      currentShips.map((item) =>
        item.id === shipId
          ? {
              ...item,
              moduleTier,
              configuration: `${moduleTier} Module`,
            }
          : item,
      ),
    )

    setBeds((currentBeds) => [
      ...currentBeds.filter((bed) => bed.shipId !== shipId),
      ...rebuiltBeds,
    ])

    addActivity(
      `${ship.name} module configuration changed to ${moduleTier} Module`,
      shipId,
      '🧩',
    )
  }

  function renderPage() {
    if (activePage === 'Beds & Respawns') {
      return (
        <BedsAndRespawns
          selectedShip={selectedShip}
          beds={shipBeds}
          isAdminMode={isAdminMode}
          setBeds={setBeds}
          addActivity={addActivity}
          clearAllRespawnsForShip={clearAllRespawnsForShip}
          updateShipStatus={updateShipStatus}
          updateApolloModuleConfig={updateApolloModuleConfig}
        />
      )
    }

    if (activePage === 'Ship Supplies') {
      return <ShipSupplies supplies={supplies} />
    }

    if (activePage === 'Supply Issue') {
      return (
        <SupplyIssue
          ships={ships}
          supplies={supplies}
          setSupplies={setSupplies}
          addActivity={addActivity}
          isAdminMode={isAdminMode}
        />
      )
    }

if (activePage === 'Medic Roster') {
  return (
    <MedicRoster
      roster={roster}
      setRoster={setRoster}
      isAdminMode={isAdminMode}
      addActivity={addActivity}
    />
  )
}

if (activePage === 'MEDEVAC 9-Liner') {
  return <Tools addActivity={addActivity} ships={ships} />
}

    if (activePage === 'Activity Log') {
      return (
        <ActivityLog
          activityLog={activityLog}
          clearLog={() => setActivityLog([])}
          isAdminMode={isAdminMode}
        />
      )
    }

    if (activePage === 'Reports') {
      return (
        <Reports
          ships={ships}
          beds={beds}
          supplies={supplies}
          activityLog={activityLog}
        />
      )
    }

    return null
  }

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        {!bootComplete ? (
          <div className="boot-console">
            <div className="boot-header">
              <span>PHOENIX MED BAY</span>
              <small>v1.0</small>
            </div>

            <div className="boot-lines">
              <p className="boot-line boot-1">
                &gt; CONNECTING TO PHOENIX MEDICAL COMMAND...
              </p>
              <p className="boot-line boot-2">
                &gt; VERIFYING FLEET MEDICAL ASSETS...
              </p>
              <p className="boot-line boot-3">
                &gt; LOADING IDRIS MEDICAL BAY...
              </p>
              <p className="boot-line boot-4">
                &gt; LOADING APOLLO MODULE CONFIGURATIONS...
              </p>
              <p className="boot-line boot-5">
                &gt; CHECKING C8R / TERRAPIN MEDICAL READINESS...
              </p>
              <p className="boot-line boot-6">
                &gt; SYNCING SHIP SUPPLIES...
              </p>
              <p className="boot-line boot-7">
                &gt; CLASSIFICATION: RESTRICTED
              </p>
              <p className="boot-line boot-8">
                &gt; AUTHENTICATION REQUIRED
              </p>
            </div>

            <div className="boot-footer">
              <span>STATION: PHOENIX SQUADRON MEDICAL</span>
              <span>STATUS: CONNECTING...</span>
            </div>
          </div>
        ) : (
          <div className="login-shell">
            <img
              className="login-emblem"
              src={phoenixLogo}
              alt="Phoenix Squadron Medical logo"
            />

            <form className="login-card" onSubmit={authenticatePortal}>
              <p className="login-kicker">Phoenix Squadron</p>
              <h1>Phoenix Med Bay</h1>
              <p className="login-subtitle">Medical Response Command</p>

              <input
                type="password"
                placeholder="ACCESS CODE"
                value={accessPin}
                onChange={(event) => setAccessPin(event.target.value)}
                autoFocus
              />

              <button type="submit">Authenticate</button>
            </form>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="console-app">
      <TopBar
        ships={ships}
        supplies={supplies}
        occupiedBeds={occupiedBeds}
        totalBeds={beds.length}
        boxesLowOnStock={boxesLowOnStock}
      />

      <aside className="console-sidebar">
        <div className="sidebar-brand">
          <img src={phoenixLogo} alt="Phoenix Squadron Medical logo" />
          <div>
            <h1>Phoenix Med Bay</h1>
            <span>Medical Command</span>
          </div>
        </div>

        <div className="sidebar-section-title">Fleet Ships</div>

        <div className="ship-list">
          {ships.map((ship) => (
            <button
              key={ship.id}
              className={
                selectedShipId === ship.id ? 'ship-button active' : 'ship-button'
              }
              onClick={() => setSelectedShipId(ship.id)}
            >
              <span>{ship.name}</span>
              <small>{ship.status}</small>
            </button>
          ))}
        </div>

        {navSections.map((section) => (
          <div className="sidebar-nav-section" key={section.title}>
            <div className="sidebar-section-title">{section.title}</div>

            <nav className="console-nav">
              {section.items.map((item) => (
                <button
                  key={item.page}
                  className={
                    activePage === item.page ? 'nav-link active' : 'nav-link'
                  }
                  onClick={() => setActivePage(item.page)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        ))}

        <div className="sidebar-bottom">
          <button className="sidebar-control" onClick={toggleAdminMode}>
            {isAdminMode ? 'Admin Mode' : 'View Mode'}
          </button>

          <button className="sidebar-control danger" onClick={logoutPortal}>
            Logout
          </button>
        </div>
      </aside>

      <main className="console-main">{renderPage()}</main>
    </div>
  )
}

function TopBar({ ships, supplies, occupiedBeds, totalBeds, boxesLowOnStock }) {
  const activeShips = ships.filter((ship) => ship.status === 'Active').length
  const totalSupplies = supplies.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="top-bar">
      <div className="top-title">
        <span>Phoenix Med Bay</span>
        <small>v1.0</small>
      </div>

      <div className="top-classification">
        Classification: Restricted • Phoenix Squadron Medical
      </div>

      <div className="top-sync">
        <span className="sync-dot"></span>
        Live Sync
      </div>

      <div className="top-stat">
        <span>Fleet Ships</span>
        <strong>{activeShips}</strong>
      </div>

      <div className="top-stat">
        <span>Supply Items</span>
        <strong>{totalSupplies}</strong>
      </div>

      <div className="top-stat">
        <span>Boxes Low</span>
        <strong>{boxesLowOnStock}</strong>
      </div>

      <div className="top-stat">
        <span>Beds Occupied</span>
        <strong>
          {occupiedBeds} / {totalBeds}
        </strong>
      </div>
    </header>
  )
}

function BedsAndRespawns({
  selectedShip,
  beds,
  isAdminMode,
  setBeds,
  addActivity,
  clearAllRespawnsForShip,
  updateShipStatus,
  updateApolloModuleConfig,
}) {
const [viewMode, setViewMode] = useState('List View')
const [draftBeds, setDraftBeds] = useState({})
const [selectedBedId, setSelectedBedId] = useState(null)

  useEffect(() => {
    const nextDrafts = {}

    beds.forEach((bed) => {
      nextDrafts[bed.id] = {
        medGelCurrent: bed.medGelCurrent,
        medGelMax: bed.medGelMax,
        canisters: bed.canisters,
        newRespawnName: '',
      }
    })

    setDraftBeds(nextDrafts)
  }, [beds])

  function updateDraft(bedId, field, value) {
    setDraftBeds((currentDrafts) => ({
      ...currentDrafts,
      [bedId]: {
        ...currentDrafts[bedId],
        [field]: value,
      },
    }))
  }

  function saveBedSupply(bed) {
    const draft = draftBeds[bed.id]

    setBeds((currentBeds) =>
      currentBeds.map((item) =>
        item.id === bed.id
          ? {
              ...item,
              medGelCurrent: Math.max(0, Number(draft.medGelCurrent) || 0),
              medGelMax: Math.max(1, Number(draft.medGelMax) || 1),
              canisters: Math.max(0, Number(draft.canisters) || 0),
            }
          : item,
      ),
    )

    addActivity(
      `${bed.bedName} MedGel updated on ${selectedShip.name}`,
      selectedShip.id,
      '🧪',
    )
  }

  function updateBedStatus(bed, newStatus) {
    setBeds((currentBeds) =>
      currentBeds.map((item) =>
        item.id === bed.id ? { ...item, status: newStatus } : item,
      ),
    )

    addActivity(
      `${selectedShip.name} ${bed.bedName} status set to ${newStatus}`,
      selectedShip.id,
      '🚦',
    )
  }

  function addRespawn(bed) {
    const draftName = draftBeds[bed.id]?.newRespawnName?.trim()

    if (!draftName) return

    setBeds((currentBeds) =>
      currentBeds.map((item) =>
        item.id === bed.id
          ? {
              ...item,
              status: 'Occupied',
              respawns: [...item.respawns, draftName],
            }
          : item,
      ),
    )

    updateDraft(bed.id, 'newRespawnName', '')

    addActivity(
      `${draftName} set respawn on ${selectedShip.name} ${bed.bedName}`,
      selectedShip.id,
      '🛏️',
    )
  }

  function removeRespawn(bed, respawnName) {
    setBeds((currentBeds) =>
      currentBeds.map((item) => {
        if (item.id !== bed.id) return item

        const remainingRespawns = item.respawns.filter(
          (name) => name !== respawnName,
        )

        return {
          ...item,
          respawns: remainingRespawns,
          status: remainingRespawns.length > 0 ? item.status : 'Vacant',
        }
      }),
    )

    addActivity(
      `${respawnName} removed from ${selectedShip.name} ${bed.bedName}`,
      selectedShip.id,
      '🔓',
    )
  }
  function useMedGel(bed, amount, reason) {
    setBeds((currentBeds) =>
      currentBeds.map((item) =>
        item.id === bed.id
          ? {
              ...item,
              medGelCurrent: Math.max(0, item.medGelCurrent - amount),
            }
          : item,
      ),
    )

    addActivity(
      `${selectedShip.name} ${bed.bedName}: ${reason} used ${amount} cSCU MedGel`,
      selectedShip.id,
      '🧪',
    )
  }

  function loadIntoTank(bed) {
    if (bed.canisters <= 0 || bed.medGelCurrent >= bed.medGelMax) return

    setBeds((currentBeds) =>
      currentBeds.map((item) =>
        item.id === bed.id
          ? {
              ...item,
              canisters: Math.max(0, item.canisters - 1),
              medGelCurrent: item.medGelMax,
            }
          : item,
      ),
    )

    addActivity(
      `${selectedShip.name} ${bed.bedName}: loaded one canister into tank`,
      selectedShip.id,
      '📦',
    )
  }

  function returnToBox(bed) {
    setBeds((currentBeds) =>
      currentBeds.map((item) =>
        item.id === bed.id
          ? {
              ...item,
              canisters: item.canisters + 1,
            }
          : item,
      ),
    )

    addActivity(
      `${selectedShip.name} ${bed.bedName}: returned one canister to box`,
      selectedShip.id,
      '📦',
    )
  }
  function selectBedFromFloorPlan(bedId) {
  setSelectedBedId(bedId)
  setViewMode('List View')

  setTimeout(() => {
    const bedElement = document.getElementById(`bed-card-${bedId}`)

    if (bedElement) {
      bedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, 100)
}
  return (
    <section className="console-panel">
      <div className="panel-command-row">
        <div>
          <p className="section-kicker">Fleet • {selectedShip.name}</p>
          <h2>Beds & Respawns</h2>
        </div>

        <div className="panel-actions">
          {isAdminMode && (
            <button
              className="console-button danger"
              onClick={() => clearAllRespawnsForShip(selectedShip.id)}
            >
              Clear Imprints
            </button>
          )}
        </div>
      </div>

      <div className="ship-status-toolbar">
        <div className="status-button-group">
          <span className="toolbar-label">Status</span>

          {['Active', 'Standby', 'Offline', 'OP Role'].map((status) => (
            <button
              key={status}
              type="button"
              className={
                selectedShip.status === status
                  ? 'status-action active'
                  : 'status-action'
              }
              onClick={() => {
                if (!isAdminMode) {
                  window.alert('Admin Mode required to change ship status.')
                  return
                }

                updateShipStatus(selectedShip.id, status)
              }}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="toolbar-actions">
          <button
            type="button"
            className="toolbar-danger"
            onClick={() => {
              if (!isAdminMode) {
                window.alert('Admin Mode required to clear imprints.')
                return
              }

              clearAllRespawnsForShip(selectedShip.id)
            }}
          >
            Clear Imprints
          </button>

          <button
            type="button"
            className="toolbar-danger outline"
            onClick={() => {
              window.alert('Ship removal can be added later. For now, ships are locked to Phoenix Medical assets.')
            }}
          >
            × Remove
          </button>
        </div>
      </div>
            {selectedShip.id.includes('apollo') && (
        <div className="apollo-module-selector">
          <div className="apollo-module-info">
            <span>Apollo Module Configuration</span>
            <small>
              Current: {getApolloModuleTier(selectedShip)} Module •{' '}
              {selectedShip.configuration}
            </small>
          </div>

          <div className="apollo-module-actions">
            {['T3', 'T2', 'T1'].map((moduleTier) => (
              <button
                key={moduleTier}
                type="button"
                className={
                  getApolloModuleTier(selectedShip) === moduleTier
                    ? 'apollo-module-button active'
                    : 'apollo-module-button'
                }
                onClick={() => {
                  if (!isAdminMode) {
                    window.alert('Admin Mode required to change Apollo modules.')
                    return
                  }

                  updateApolloModuleConfig(selectedShip.id, moduleTier)
                }}
              >
                <strong>{moduleTier} Module</strong>
                <small>
                  {moduleTier === 'T3'
                    ? '6 beds • 3 per side'
                    : moduleTier === 'T2'
                      ? '4 beds • 2 per side'
                      : '2 beds • 1 per side'}
                </small>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="console-tabs">
        <button
          className={viewMode === 'List View' ? 'active' : ''}
          onClick={() => setViewMode('List View')}
        >
          List View
        </button>

        <button
          className={viewMode === 'Floor Plan' ? 'active' : ''}
          onClick={() => setViewMode('Floor Plan')}
        >
          Floor Plan
        </button>
      </div>

      {viewMode === 'Floor Plan' ? (
<FloorPlan
  selectedShip={selectedShip}
  beds={beds}
  onSelectBed={selectBedFromFloorPlan}
/>      ) : (
        <>
          <div className="bed-console-grid">
            {beds.map((bed) => (
<BedConsoleCard
  key={bed.id}
  bed={bed}
  isSelected={selectedBedId === bed.id}
                draft={draftBeds[bed.id]}
                isAdminMode={isAdminMode}
                updateDraft={updateDraft}
                saveBedSupply={saveBedSupply}
                updateBedStatus={updateBedStatus}
                addRespawn={addRespawn}
                removeRespawn={removeRespawn}
                useMedGel={useMedGel}
                loadIntoTank={loadIntoTank}
                returnToBox={returnToBox}
              />
            ))}
          </div>

          <RespawnRoster selectedShip={selectedShip} beds={beds} />
        </>
      )}
    </section>
  )
}

function BedConsoleCard({
  bed,
  isSelected,
  draft,
  isAdminMode,
  updateDraft,
  saveBedSupply,
  updateBedStatus,
  addRespawn,
  removeRespawn,
  useMedGel,
  loadIntoTank,
  returnToBox,
}) {
  const medGelCurrent = Number(draft?.medGelCurrent ?? bed.medGelCurrent)
  const medGelMax = Number(draft?.medGelMax ?? bed.medGelMax)
  const canisters = Number(draft?.canisters ?? bed.canisters)
  const medGelPercent = Math.min(
    100,
    Math.max(0, (medGelCurrent / medGelMax) * 100),
  )

  const injuryUse = bed.tier.startsWith('T2') ? 10 : 5
  const totalStored = canisters * medGelMax

  return (
    <article
  id={`bed-card-${bed.id}`}
  className={isSelected ? 'bed-console-card selected-bed-card' : 'bed-console-card'}
>
      <div className="bed-card-header">
        <span>{bed.bedName}</span>

        <div className="bed-card-badges">
          <strong>{bed.tier}</strong>
          <em>{bed.status}</em>
        </div>
      </div>

      <div className="bed-location">{bed.location}</div>

      <div className="medgel-row">
        <span>MedGel — Tank</span>
        <strong>
          {medGelCurrent} / {medGelMax} cSCU
        </strong>
      </div>

      <div className="medgel-track">
        <div className="medgel-fill" style={{ width: `${medGelPercent}%` }} />
      </div>

      <div className="bed-action-grid">
        <button
          type="button"
          className="bed-tile"
          onClick={() =>
            useMedGel(
              bed,
              injuryUse,
              `${bed.tier.startsWith('T2') ? 'T2' : 'T3'} injury`,
            )
          }
        >
          <span>{bed.tier.startsWith('T2') ? 'T2' : 'T3'} injury</span>
          <small>-{injuryUse} cSCU</small>
        </button>

        <button
          type="button"
          className="bed-tile"
          onClick={() => useMedGel(bed, 100, 'Respawn')}
        >
          <span>Respawn</span>
          <small>-100 cSCU</small>
        </button>
      </div>

      <div className="bed-storage">
        <span>Bed Storage</span>
        <strong>{canisters} canisters stored</strong>
      </div>

      <div className="bed-storage-grid">
        <div className="bed-tile storage-display">
          <span>📦 → Bed Storage</span>
          <small>{canisters} in box</small>
        </div>

        <button
          type="button"
          className="bed-tile"
          onClick={() => loadIntoTank(bed)}
          disabled={bed.canisters <= 0 || bed.medGelCurrent >= bed.medGelMax}
        >
          <span>Load into tank</span>
          <small>fills to {bed.medGelMax} cSCU</small>
        </button>

        <button
          type="button"
          className="bed-tile"
          onClick={() => returnToBox(bed)}
        >
          <span>Return to box</span>
          <small>+1 to box stock</small>
        </button>
      </div>

      <div className="bed-storage-note">
        • {canisters} × canister ({totalStored} cSCU total stored)
      </div>

      {isAdminMode && (
        <div className="bed-admin-controls">
          <label>
            Current
            <input
              type="number"
              value={draft?.medGelCurrent ?? bed.medGelCurrent}
              onChange={(event) =>
                updateDraft(bed.id, 'medGelCurrent', event.target.value)
              }
            />
          </label>

          <label>
            Max
            <input
              type="number"
              value={draft?.medGelMax ?? bed.medGelMax}
              onChange={(event) =>
                updateDraft(bed.id, 'medGelMax', event.target.value)
              }
            />
          </label>

          <label>
            Canisters
            <input
              type="number"
              value={draft?.canisters ?? bed.canisters}
              onChange={(event) =>
                updateDraft(bed.id, 'canisters', event.target.value)
              }
            />
          </label>

          <button type="button" onClick={() => saveBedSupply(bed)}>
            Save
          </button>

          <select
            value={bed.status}
            onChange={(event) => updateBedStatus(bed, event.target.value)}
          >
            <option>Vacant</option>
            <option>Occupied</option>
            <option>Reserved</option>
            <option>Offline</option>
          </select>
        </div>
      )}

      <div className="respawn-section">
        <div className="respawn-header">
          <span>Respawns ({bed.respawns.length})</span>
        </div>

        {bed.respawns.map((respawnName) => (
          <div className="respawn-row" key={respawnName}>
            <span>{respawnName}</span>

            {isAdminMode && (
              <button type="button" onClick={() => removeRespawn(bed, respawnName)}>
                ×
              </button>
            )}
          </div>
        ))}

        {isAdminMode && (
          <div className="respawn-row input-row">
            <input
              placeholder="Player name..."
              value={draft?.newRespawnName || ''}
              onChange={(event) =>
                updateDraft(bed.id, 'newRespawnName', event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addRespawn(bed)
                }
              }}
            />

            <button type="button" onClick={() => addRespawn(bed)}>
              + Add
            </button>
          </div>
        )}

        {!isAdminMode && bed.respawns.length === 0 && (
          <p className="empty-text">No respawns set</p>
        )}
      </div>
    </article>
  )
}

function FloorPlan({ selectedShip, beds, onSelectBed }) {
  if (selectedShip?.id === 'idris') {
    const t3Beds = beds.filter((bed) => bed.tier.startsWith('T3')).slice(0, 4)
    const t2Bed = beds.find((bed) => bed.tier.startsWith('T2'))

    return (
      <div className="floor-plan idris-floor-plan">
        <div className="idris-floor-left">
          <div className="floor-zone-title">Ward</div>

          <div className="idris-floor-grid">
            {t3Beds.map((bed) => (
              <button
                type="button"
                className="floor-bed floor-bed-t3 clickable-floor-bed"
                key={bed.id}
                onClick={() => onSelectBed(bed.id)}
              >
                <strong>{bed.bedName}</strong>
                <span>{bed.tier}</span>
                <small>
                  {bed.medGelCurrent}/{bed.medGelMax}
                </small>
              </button>
            ))}
          </div>
        </div>

        <div className="idris-floor-center">
          <span>Medical Office</span>
        </div>

        <div className="idris-floor-right">
          <div className="floor-zone-title">Operating Theatre</div>

          {t2Bed && (
            <button
              type="button"
              className="floor-bed floor-bed-t2 clickable-floor-bed"
              onClick={() => onSelectBed(t2Bed.id)}
            >
              <strong>{t2Bed.bedName}</strong>
              <span>{t2Bed.tier}</span>
              <small>
                {t2Bed.medGelCurrent}/{t2Bed.medGelMax}
              </small>
            </button>
          )}
        </div>
      </div>
    )
  }

  const halfway = Math.ceil(beds.length / 2)

  return (
    <div className="floor-plan">
      <div className="floor-zone floor-left">
        {beds.slice(0, halfway).map((bed) => (
          <button
            type="button"
            className="floor-bed clickable-floor-bed"
            key={bed.id}
            onClick={() => onSelectBed(bed.id)}
          >
            <strong>{bed.bedName}</strong>
            <span>{bed.tier}</span>
            <small>
              {bed.medGelCurrent}/{bed.medGelMax}
            </small>
          </button>
        ))}
      </div>

      <div className="floor-center">
        <span>{selectedShip.name}</span>
        <em>Medical Office / Access Corridor</em>
      </div>

      <div className="floor-zone floor-right">
        {beds.slice(halfway).map((bed) => (
          <button
            type="button"
            className="floor-bed clickable-floor-bed"
            key={bed.id}
            onClick={() => onSelectBed(bed.id)}
          >
            <strong>{bed.bedName}</strong>
            <span>{bed.tier}</span>
            <small>
              {bed.medGelCurrent}/{bed.medGelMax}
            </small>
          </button>
        ))}
      </div>
    </div>
  )
}

function RespawnRoster({ selectedShip, beds }) {
  const rosterEntries = beds.flatMap((bed) =>
    bed.respawns.map((name) => ({
      id: `${bed.id}-${name}`,
      name,
      bedName: bed.bedName,
      tier: bed.tier,
      shipName: selectedShip.name,
    })),
  )

  return (
    <section className="respawn-roster-panel">
      <div className="respawn-roster-header">
        <span>Respawn Roster — {selectedShip.name}</span>
        <small>{rosterEntries.length} active</small>
      </div>

      {rosterEntries.length === 0 ? (
        <p className="respawn-roster-empty">
          No active respawn imprints for this ship.
        </p>
      ) : (
        <div className="respawn-roster-grid">
          {rosterEntries.map((entry) => (
            <div className="respawn-roster-card" key={entry.id}>
              <span className="roster-dot"></span>

              <div>
                <strong>{entry.name}</strong>
                <small>
                  {entry.bedName} — {entry.tier}
                </small>
              </div>

              <em>{entry.shipName}</em>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
function ShipSupplies({ supplies }) {
  return (
    <section className="console-panel">
      <div className="panel-command-row">
        <div>
          <p className="section-kicker">Inventory</p>
          <h2>Ship Supplies</h2>
        </div>
      </div>

      <div className="supply-list">
        {supplies.map((item) => (
          <div className="supply-row" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </div>

            <em>{item.quantity} in stock</em>
          </div>
        ))}
      </div>
    </section>
  )
}

function SupplyIssue({ ships, supplies, setSupplies, addActivity, isAdminMode }) {
  const [selectedShipId, setSelectedShipId] = useState(ships[0]?.id || 'idris')
  const [issuingMedic, setIssuingMedic] = useState('')
  const [recipient, setRecipient] = useState('')
  const [operationName, setOperationName] = useState('')
  const [issueQuantities, setIssueQuantities] = useState({})

  function changeIssueQuantity(itemId, amount) {
    setIssueQuantities((current) => ({
      ...current,
      [itemId]: Math.max(0, (current[itemId] || 0) + amount),
    }))
  }

  function clearForm() {
    setIssuingMedic('')
    setRecipient('')
    setOperationName('')
    setIssueQuantities({})
  }

  function submitIssueLog(event) {
    event.preventDefault()

    if (!isAdminMode) {
      window.alert('Admin Mode required to issue supplies.')
      return
    }

    const issuedItems = supplies.filter((item) => issueQuantities[item.id] > 0)

    if (!issuingMedic.trim() || !recipient.trim() || issuedItems.length === 0) {
      window.alert('Medic, recipient, and at least one supply item are required.')
      return
    }

    setSupplies((currentSupplies) =>
      currentSupplies.map((item) => ({
        ...item,
        quantity: Math.max(0, item.quantity - (issueQuantities[item.id] || 0)),
      })),
    )

    const issuedSummary = issuedItems
      .map((item) => `${issueQuantities[item.id]} ${item.name}`)
      .join(', ')

    addActivity(
      `${issuingMedic} issued ${issuedSummary} to ${recipient}${
        operationName ? ` for ${operationName}` : ''
      }`,
      selectedShipId,
      '📦',
    )

    clearForm()
  }

  return (
    <section className="console-panel supply-issue-panel">
      <div className="panel-command-row">
        <div>
          <p className="section-kicker">Supply Issue</p>
          <h2>Ship Supplies</h2>
        </div>
      </div>

      <form onSubmit={submitIssueLog}>
        <label className="wide-label">
          Ship
          <select
            value={selectedShipId}
            onChange={(event) => setSelectedShipId(event.target.value)}
          >
            {ships.map((ship) => (
              <option key={ship.id} value={ship.id}>
                {ship.name}
              </option>
            ))}
          </select>
        </label>

        <div className="issue-details">
          <label>
            Issuing Medic
            <input
              placeholder="Medic callsign..."
              value={issuingMedic}
              onChange={(event) => setIssuingMedic(event.target.value)}
            />
          </label>

          <label>
            Recipient
            <input
              placeholder="Name or callsign..."
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
            />
          </label>

          <label className="full-width">
            Operation Name
            <input
              placeholder="Operation name..."
              value={operationName}
              onChange={(event) => setOperationName(event.target.value)}
            />
          </label>
        </div>

        <p className="section-kicker">Select Supplies To Issue</p>

        <div className="supply-list">
          {supplies.map((item) => (
            <div className="supply-row" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.description} • {item.quantity} in stock
                </span>
              </div>

              <div className="quantity-controls">
                <button
                  type="button"
                  onClick={() => changeIssueQuantity(item.id, -1)}
                >
                  −
                </button>

                <strong>{issueQuantities[item.id] || 0}</strong>

                <button
                  type="button"
                  onClick={() => changeIssueQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit">Submit Issue Log</button>
          <button type="button" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </section>
  )
}

function MedicRoster({ roster, setRoster, isAdminMode, addActivity }) {
  const roles = [
    'Medical Command',
    'Corpsman',
    'Combat Medic',
    'CASEVAC Pilot',
    'Dropship Pilot',
    'SAR Crew',
    'Scout / Recon',
    'Trainee',
  ]

  const statuses = ['Active', 'Standby', 'Training', 'On Leave', 'Inactive']

  const units = [
    'Phoenix Squadron',
    'Idris Medical Bay',
    'Apollo Detachment',
    'C8R Rescue Team',
    'Terrapin Medic',
    'Marine Attachment',
    'Recon Attachment',
  ]

  const [newMedic, setNewMedic] = useState({
    name: '',
    callsign: '',
    role: 'Corpsman',
    status: 'Active',
    unit: 'Phoenix Squadron',
  })

  const activeCount = roster.filter((member) => member.status === 'Active').length
  const standbyCount = roster.filter((member) => member.status === 'Standby').length
  const trainingCount = roster.filter(
    (member) => member.status === 'Training',
  ).length
  const commandCount = roster.filter(
    (member) => member.role === 'Medical Command',
  ).length

  function updateNewMedic(field, value) {
    setNewMedic((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function addMedic(event) {
    event.preventDefault()

    if (!isAdminMode) {
      window.alert('Admin Mode required to add roster members.')
      return
    }

    if (!newMedic.name.trim() || !newMedic.callsign.trim()) {
      window.alert('Name and callsign are required.')
      return
    }

    const medicEntry = {
      id: crypto.randomUUID(),
      name: newMedic.name.trim(),
      callsign: newMedic.callsign.trim(),
      role: newMedic.role,
      status: newMedic.status,
      unit: newMedic.unit,
    }

    setRoster((currentRoster) => [...currentRoster, medicEntry])

    addActivity(
      `${medicEntry.callsign} added to Medic Roster as ${medicEntry.role}`,
      undefined,
      '☤',
    )

    setNewMedic({
      name: '',
      callsign: '',
      role: 'Corpsman',
      status: 'Active',
      unit: 'Phoenix Squadron',
    })
  }

  function updateMedicField(member, field, value) {
    if (!isAdminMode) {
      window.alert('Admin Mode required to edit roster members.')
      return
    }

    setRoster((currentRoster) =>
      currentRoster.map((item) =>
        (item.id || item.callsign) === (member.id || member.callsign)
          ? { ...item, [field]: value }
          : item,
      ),
    )

    addActivity(
      `${member.callsign} roster ${field} changed to ${value}`,
      undefined,
      '☤',
    )
  }

  function removeMedic(member) {
    if (!isAdminMode) {
      window.alert('Admin Mode required to remove roster members.')
      return
    }

    const confirmed = window.confirm(
      `Remove ${member.callsign} from the Medic Roster?`,
    )

    if (!confirmed) return

    setRoster((currentRoster) =>
      currentRoster.filter(
        (item) => (item.id || item.callsign) !== (member.id || member.callsign),
      ),
    )

    addActivity(`${member.callsign} removed from Medic Roster`, undefined, '🗑️')
  }

  return (
    <section className="console-panel medic-roster-panel">
      <div className="panel-command-row">
        <div>
          <p className="section-kicker">Personnel</p>
          <h2>Medic Roster</h2>
        </div>

        <div className="panel-actions">
          <span>{roster.length} personnel</span>
        </div>
      </div>

      <div className="roster-summary-grid">
        <article className="roster-summary-card">
          <span>Active</span>
          <strong>{activeCount}</strong>
          <small>personnel active</small>
        </article>

        <article className="roster-summary-card">
          <span>Standby</span>
          <strong>{standbyCount}</strong>
          <small>personnel on standby</small>
        </article>

        <article className="roster-summary-card">
          <span>Training</span>
          <strong>{trainingCount}</strong>
          <small>training status</small>
        </article>

        <article className="roster-summary-card">
          <span>Command</span>
          <strong>{commandCount}</strong>
          <small>medical command</small>
        </article>
      </div>

      <div className="personnel-board">
        <div className="personnel-board-header">
          <span>Name</span>
          <span>Callsign</span>
          <span>Role</span>
          <span>Status</span>
          <span>Assigned Unit</span>
          <span>Actions</span>
        </div>

        {roster.map((member) => (
          <div
            className="personnel-board-row"
            key={member.id || member.callsign}
          >
            <strong>{member.name}</strong>
            <span>{member.callsign}</span>

            {isAdminMode ? (
              <select
                value={member.role}
                onChange={(event) =>
                  updateMedicField(member, 'role', event.target.value)
                }
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            ) : (
              <span>{member.role}</span>
            )}

            {isAdminMode ? (
              <select
                value={member.status}
                onChange={(event) =>
                  updateMedicField(member, 'status', event.target.value)
                }
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            ) : (
              <em className={`roster-status ${member.status.toLowerCase().replaceAll(' ', '-')}`}>
                {member.status}
              </em>
            )}

            {isAdminMode ? (
              <select
                value={member.unit || 'Phoenix Squadron'}
                onChange={(event) =>
                  updateMedicField(member, 'unit', event.target.value)
                }
              >
                {units.map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            ) : (
              <span>{member.unit || 'Phoenix Squadron'}</span>
            )}

            <button type="button" onClick={() => removeMedic(member)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {isAdminMode && (
        <form className="add-personnel-card" onSubmit={addMedic}>
          <div className="add-personnel-header">
            <div>
              <p className="section-kicker">Admin Mode</p>
              <h3>Add Personnel</h3>
            </div>
          </div>

          <div className="add-personnel-grid">
            <label>
              Name
              <input
                placeholder="Name..."
                value={newMedic.name}
                onChange={(event) => updateNewMedic('name', event.target.value)}
              />
            </label>

            <label>
              Callsign
              <input
                placeholder="Callsign..."
                value={newMedic.callsign}
                onChange={(event) =>
                  updateNewMedic('callsign', event.target.value)
                }
              />
            </label>

            <label>
              Role
              <select
                value={newMedic.role}
                onChange={(event) => updateNewMedic('role', event.target.value)}
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>

            <label>
              Status
              <select
                value={newMedic.status}
                onChange={(event) =>
                  updateNewMedic('status', event.target.value)
                }
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <label>
              Assigned Unit
              <select
                value={newMedic.unit}
                onChange={(event) => updateNewMedic('unit', event.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit">Add to Roster</button>
        </form>
      )}
    </section>
  )
}
function Tools({ addActivity, ships }) {
const [medevacForm, setMedevacForm] = useState({
  pickupLocation: '',
  patientCount: '',
  patientStatus: '',
  security: '',
  hazards: '',
  callsign: '',
  ship: ships?.[0]?.id || '',
  priority: 'Routine',
})

  function updateMedevacField(field, value) {
    setMedevacForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const selectedShip =
    ships.find((ship) => ship.id === medevacForm.ship)?.name || 'N/A'

  const medevacReport = `
PHOENIX MEDEVAC 9-LINER

1. PICKUP LOCATION:
${medevacForm.pickupLocation || 'N/A'}

2. NUMBER OF PATIENTS:
${medevacForm.patientCount || 'N/A'}

3. PATIENT STATUS:
${medevacForm.patientStatus || 'N/A'}

4. SECURITY AT PICKUP SITE:
${medevacForm.security || 'N/A'}

5. TERRAIN / HAZARDS:
${medevacForm.hazards || 'N/A'}

CALLSIGN:
${medevacForm.callsign || 'N/A'}

ASSIGNED SHIP:
${selectedShip}

PRIORITY:
${medevacForm.priority || 'N/A'}
`.trim()

  function copyMedevacReport() {
    navigator.clipboard.writeText(medevacReport)

    addActivity('MEDEVAC 9-Liner copied to clipboard', undefined, '📡')

    window.alert('MEDEVAC 9-Liner copied.')
  }

  function clearMedevacForm() {
setMedevacForm({
  pickupLocation: '',
  patientCount: '',
  patientStatus: '',
  security: '',
  hazards: '',
  callsign: '',
  ship: ships?.[0]?.id || '',
  priority: 'Routine',
})
  }

  return (
    <section className="console-panel medevac-console-panel">
      <div className="medevac-console-header">
        <div className="medevac-title-block">
          <h2>MEDEVAC 9-LINER</h2>
          <span>Standard Request Format</span>
        </div>
      </div>

      <div className="medevac-form-panel">
        <div className="medevac-line-row">
          <div className="medevac-line-number">1</div>

          <div className="medevac-line-label">
            <strong>Location</strong>
            <small>Grid / nav marker / coordinates</small>
          </div>

          <div className="medevac-line-field">
            <input
              type="text"
              placeholder="Enter location..."
              value={medevacForm.pickupLocation}
              onChange={(event) =>
                updateMedevacField('pickupLocation', event.target.value)
              }
            />
          </div>
        </div>

        <div className="medevac-line-row">
          <div className="medevac-line-number">2</div>

          <div className="medevac-line-label">
            <strong>Number of Patients</strong>
            <small>Total patients requiring extraction</small>
          </div>

          <div className="medevac-line-field">
            <input
              type="text"
              placeholder="Enter patient count..."
              value={medevacForm.patientCount}
              onChange={(event) =>
                updateMedevacField('patientCount', event.target.value)
              }
            />
          </div>
        </div>

        <div className="medevac-line-row">
          <div className="medevac-line-number">3</div>

          <div className="medevac-line-label">
            <strong>Patient Status</strong>
            <small>Urgent / stable / incapacitated / bleeding</small>
          </div>

          <div className="medevac-line-field">
            <textarea
              placeholder="Enter patient status..."
              value={medevacForm.patientStatus}
              onChange={(event) =>
                updateMedevacField('patientStatus', event.target.value)
              }
            />
          </div>
        </div>

        <div className="medevac-line-row">
          <div className="medevac-line-number">4</div>

          <div className="medevac-line-label">
            <strong>Security at Pickup Site</strong>
            <small>Secure / hostile / unknown / overwatch required</small>
          </div>

          <div className="medevac-line-field">
            <textarea
              placeholder="Enter security situation..."
              value={medevacForm.security}
              onChange={(event) =>
                updateMedevacField('security', event.target.value)
              }
            />
          </div>
        </div>

        <div className="medevac-line-row">
          <div className="medevac-line-number">5</div>

          <div className="medevac-line-label">
            <strong>Terrain / Hazards</strong>
            <small>Weather / visibility / terrain / threats</small>
          </div>

          <div className="medevac-line-field">
            <textarea
              placeholder="Enter terrain or hazards..."
              value={medevacForm.hazards}
              onChange={(event) =>
                updateMedevacField('hazards', event.target.value)
              }
            />
          </div>
        </div>

        <div className="medevac-bottom-row">
          <label>
            <span>Callsign</span>
            <input
              type="text"
              placeholder="e.g. Phoenix Actual"
              value={medevacForm.callsign}
              onChange={(event) =>
                updateMedevacField('callsign', event.target.value)
              }
            />
          </label>

          <label>
            <span>Ship</span>
            <select
              value={medevacForm.ship}
              onChange={(event) => updateMedevacField('ship', event.target.value)}
            >
              {ships.map((ship) => (
                <option key={ship.id} value={ship.id}>
                  {ship.name}
                </option>
              ))}
            </select>
          </label>

          <div className="priority-group">
            <span>Priority</span>

            <div className="priority-buttons">
              {['Routine', 'Priority', 'Urgent'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  className={
                    medevacForm.priority === priority
                      ? 'priority-button active'
                      : 'priority-button'
                  }
                  onClick={() => updateMedevacField('priority', priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="medevac-actions">
          <button
            type="button"
            className="medevac-primary-action"
            onClick={copyMedevacReport}
          >
            Copy 9-Line Report
          </button>

          <button
            type="button"
            className="medevac-secondary-action"
            onClick={clearMedevacForm}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="medevac-preview-box">
        <div className="medevac-preview-header">Generated Report</div>
        <pre>{medevacReport}</pre>
      </div>
    </section>
  )
}

function ActivityLog({ activityLog, clearLog, isAdminMode }) {
  return (
    <section className="console-panel activity-panel">
      <div className="panel-command-row">
        <div>
          <p className="section-kicker">Recent Activity</p>
          <h2>Activity Log</h2>
        </div>

        <div className="panel-actions">
          <span>{activityLog.length} entries</span>

          {isAdminMode && (
            <button className="console-button danger" onClick={clearLog}>
              Clear Log
            </button>
          )}
        </div>
      </div>

      <div className="activity-list">
        {activityLog.length === 0 && (
          <p className="empty-text">No activity has been recorded yet.</p>
        )}

        {activityLog.map((entry) => (
          <div className="activity-row" key={entry.id}>
            <span>{entry.icon}</span>
            <strong>{entry.message}</strong>
            <em>{entry.ship}</em>
            <small>{entry.time}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function Reports({ ships, beds, supplies, activityLog }) {
  const totalBeds = beds.length
  const occupiedBeds = beds.filter(
    (bed) => bed.status === 'Occupied' || bed.respawns.length > 0,
  )
  const offlineBeds = beds.filter((bed) => bed.status === 'Offline')
  const totalRespawns = beds.reduce(
    (sum, bed) => sum + bed.respawns.length,
    0,
  )

  const totalMedGelCurrent = beds.reduce(
    (sum, bed) => sum + Number(bed.medGelCurrent || 0),
    0,
  )
  const totalMedGelMax = beds.reduce(
    (sum, bed) => sum + Number(bed.medGelMax || 0),
    0,
  )

  const medGelPercent =
    totalMedGelMax > 0
      ? Math.round((totalMedGelCurrent / totalMedGelMax) * 100)
      : 0

  const lowSupplies = supplies.filter((item) => item.quantity <= 10)
  const activeShips = ships.filter((ship) => ship.status === 'Active')
  const standbyShips = ships.filter((ship) => ship.status === 'Standby')
  const offlineShips = ships.filter((ship) => ship.status === 'Offline')

  const recentActivity = activityLog.slice(0, 8)

  const reportText = useMemo(() => {
    return `
PHOENIX SQUADRON MEDICAL COMMAND REPORT
Generated: ${new Date().toLocaleString()}

FLEET STATUS
- Active Ships: ${activeShips.length}
- Standby Ships: ${standbyShips.length}
- Offline Ships: ${offlineShips.length}

SHIP LIST
${ships.map((ship) => `- ${ship.name}: ${ship.status} / ${ship.configuration}`).join('\n')}

BED STATUS
- Occupied Beds: ${occupiedBeds.length} / ${totalBeds}
- Offline Beds: ${offlineBeds.length}
- Active Respawn Imprints: ${totalRespawns}

MEDGEL STATUS
- Current MedGel: ${totalMedGelCurrent} cSCU
- Maximum Capacity: ${totalMedGelMax} cSCU
- Capacity: ${medGelPercent}%

LOW SUPPLIES
${
  lowSupplies.length > 0
    ? lowSupplies.map((item) => `- ${item.name}: ${item.quantity}`).join('\n')
    : '- No low supply warnings.'
}

RECENT ACTIVITY
${
  recentActivity.length > 0
    ? recentActivity
        .map((entry) => `- ${entry.time}: ${entry.message}`)
        .join('\n')
    : '- No recent activity recorded.'
}
`.trim()
  }, [
    activeShips.length,
    standbyShips.length,
    offlineShips.length,
    ships,
    occupiedBeds.length,
    totalBeds,
    offlineBeds.length,
    totalRespawns,
    totalMedGelCurrent,
    totalMedGelMax,
    medGelPercent,
    lowSupplies,
    recentActivity,
  ])

  function copyReport() {
    navigator.clipboard.writeText(reportText)
    window.alert('Command report copied to clipboard.')
  }

  return (
    <section className="console-panel reports-panel">
      <div className="panel-command-row">
        <div>
          <p className="section-kicker">Command</p>
          <h2>Reports</h2>
        </div>

        <button className="console-button" onClick={copyReport}>
          Copy Command Report
        </button>
      </div>

      <div className="report-card-grid">
        <article className="report-card">
          <span>Fleet Status</span>
          <strong>{activeShips.length}</strong>
          <small>active ships</small>

          <div className="report-mini-list">
            <em>{standbyShips.length} standby</em>
            <em>{offlineShips.length} offline</em>
          </div>
        </article>

        <article className="report-card">
          <span>Bed Status</span>
          <strong>
            {occupiedBeds.length}/{totalBeds}
          </strong>
          <small>occupied beds</small>

          <div className="report-mini-list">
            <em>{totalRespawns} respawn imprints</em>
            <em>{offlineBeds.length} offline beds</em>
          </div>
        </article>

        <article className="report-card">
          <span>MedGel Status</span>
          <strong>{medGelPercent}%</strong>
          <small>
            {totalMedGelCurrent}/{totalMedGelMax} cSCU
          </small>

          <div className="report-meter">
            <div style={{ width: `${medGelPercent}%` }} />
          </div>
        </article>

        <article className="report-card">
          <span>Supply Status</span>
          <strong>{lowSupplies.length}</strong>
          <small>low supply warnings</small>

          <div className="report-mini-list">
            {lowSupplies.length > 0 ? (
              lowSupplies.slice(0, 2).map((item) => (
                <em key={item.id}>
                  {item.name}: {item.quantity}
                </em>
              ))
            ) : (
              <em>Inventory stable</em>
            )}
          </div>
        </article>
      </div>

      <div className="report-section-grid">
        <article className="report-section">
          <div className="report-section-header">
            <span>Fleet Assets</span>
            <small>{ships.length} total</small>
          </div>

          <div className="report-list">
            {ships.map((ship) => (
              <div className="report-list-row" key={ship.id}>
                <div>
                  <strong>{ship.name}</strong>
                  <small>{ship.className}</small>
                </div>

                <em>{ship.status}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="report-section">
          <div className="report-section-header">
            <span>Recent Activity</span>
            <small>{recentActivity.length} shown</small>
          </div>

          <div className="report-list">
            {recentActivity.length === 0 ? (
              <p className="report-empty">No recent activity recorded.</p>
            ) : (
              recentActivity.map((entry) => (
                <div className="report-list-row activity-summary-row" key={entry.id}>
                  <div>
                    <strong>{entry.message}</strong>
                    <small>{entry.ship}</small>
                  </div>

                  <em>{entry.time}</em>
                </div>
              ))
            )}
          </div>
        </article>
      </div>

      <div className="report-output">
        <div className="report-section-header">
          <span>Copy Preview</span>
          <small>Discord ready</small>
        </div>

        <pre>{reportText}</pre>
      </div>
    </section>
  )
}

export default App