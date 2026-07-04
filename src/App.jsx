import { useEffect, useState } from 'react'
import './App.css'
import phoenixLogo from './assets/phoenix-logo.png'

const pages = [
  'Dashboard',
  'Personnel',
  'Fleet',
  'Inventory',
  'Medical Beds',
  'Operations',
  'Reports',
]

const ACCESS_PIN = '186'
const ADMIN_PIN = '186'

function getStatusClass(status) {
  return `status-pill status-${status.toLowerCase().replaceAll(' ', '-')}`
}

function getStockLevel(quantity) {
  if (quantity <= 10) return 'Critical'
  if (quantity <= 30) return 'Low'
  return 'Good'
}

const startingInventoryItems = [
  {
    item: 'MedGun',
    category: 'Medical Tool',
    quantity: 25,
    status: 'Ready',
  },
  {
    item: 'OxyPen',
    category: 'Medication',
    quantity: 120,
    status: 'In Stock',
  },
  {
    item: 'Hemozal',
    category: 'Medication',
    quantity: 80,
    status: 'In Stock',
  },
  {
    item: 'MedGel',
    category: 'Medical Supply',
    quantity: 32,
    status: 'Monitor',
  },
  {
    item: 'Canoiodide Pen',
    category: 'Medication',
    quantity: 40,
    status: 'In Stock',
  },
  {
    item: 'DetoxPen',
    category: 'Medication',
    quantity: 35,
    status: 'In Stock',
  },
  {
    item: 'Paramed Medical Device',
    category: 'Medical Tool',
    quantity: 12,
    status: 'Ready',
  },
  {
    item: 'Cambio-Lite SRT Attachment',
    category: 'Rescue Equipment',
    quantity: 8,
    status: 'Ready',
  },
]

const startingMedicalBeds = [
  {
    bed: 'Bed 01',
    designation: 'Trauma Alpha',
    assignedTo: 'Phoenix Actual',
    status: 'Available',
    purpose: 'Command imprint / emergency trauma',
  },
  {
    bed: 'Bed 02',
    designation: 'Trauma Bravo',
    assignedTo: 'Chief Corpsman',
    status: 'Available',
    purpose: 'Senior medical staff imprint',
  },
  {
    bed: 'Bed 03',
    designation: 'Recovery Alpha',
    assignedTo: 'Phoenix Med-1',
    status: 'Standby',
    purpose: 'Post-treatment recovery',
  },
  {
    bed: 'Bed 04',
    designation: 'Recovery Bravo',
    assignedTo: 'Phoenix Med-2',
    status: 'Standby',
    purpose: 'Secondary recovery / overflow',
  },
  {
    bed: 'Bed 05',
    designation: 'Casualty Overflow',
    assignedTo: 'Unassigned',
    status: 'Open',
    purpose: 'Guest casualty / rescued personnel',
  },
  {
    bed: 'Bed 06',
    designation: 'Emergency Reserve',
    assignedTo: 'Unassigned',
    status: 'Reserved',
    purpose: 'Critical MASCAS use only',
  },
]

const startingFleetShips = [
  {
    name: 'RSI Apollo Medivac',
    role: 'Primary Medical Ship',
    status: 'Ready',
    crew: '4',
    assignment: 'Advanced casualty care / medevac response',
  },
  {
    name: 'RSI Apollo Triage',
    role: 'Advanced Treatment Platform',
    status: 'Ready',
    crew: '4',
    assignment: 'Mass casualty stabilization and treatment',
  },
  {
    name: 'C8R Pisces Rescue',
    role: 'Rapid Response Craft',
    status: 'Ready',
    crew: '1',
    assignment: 'Beacon response / short-range extraction',
  },
  {
    name: 'Normandy',
    role: 'Medical Command Ship',
    status: 'Standby',
    crew: 'Assigned',
    assignment: 'Medical bed imprint and casualty processing',
  },
]

const personnelRoster = [
  {
    name: 'Mike Ramirez',
    callsign: 'Phoenix Actual',
    role: 'Commander',
    certifications: 'CASEVAC, Flight Medic, Medical Command',
    status: 'Active',
  },
  {
    name: 'Phoenix Med-1',
    callsign: 'Med-1',
    role: 'Corpsman',
    certifications: 'Combat Medic, Shipboard Medical',
    status: 'Active',
  },
  {
    name: 'Phoenix Med-2',
    callsign: 'Med-2',
    role: 'Corpsman',
    certifications: 'Shipboard Medical, Casualty Processing',
    status: 'Standby',
  },
  {
    name: 'Phoenix Pilot-1',
    callsign: 'Dustoff-1',
    role: 'Dropship Pilot',
    certifications: 'CASEVAC Pilot, Low Altitude Approach',
    status: 'Active',
  },
]

const startingOperations = [
  {
    operation: 'Phoenix Medical Standby',
    type: 'QRF',
    asset: 'Normandy',
    status: 'Standby',
    priority: 'Normal',
  },
  {
    operation: 'Beacon Response',
    type: 'Search and Rescue',
    asset: 'C8R Pisces Rescue',
    status: 'Ready',
    priority: 'High',
  },
  {
    operation: 'MASCAS Support',
    type: 'Mass Casualty',
    asset: 'RSI Apollo Triage',
    status: 'Reserved',
    priority: 'Critical',
  },
  {
    operation: 'Fleet Medical Escort',
    type: 'Medical Overwatch',
    asset: 'RSI Apollo Medivac',
    status: 'Ready',
    priority: 'Normal',
  },
]

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('phoenixAuthenticated') === 'true'
  })
  const [accessPin, setAccessPin] = useState('')

  const [inventoryItems, setInventoryItems] = useState(() => {
    const savedInventory = localStorage.getItem('phoenixInventory')
    if (savedInventory) return JSON.parse(savedInventory)
    return startingInventoryItems
  })

  const [medicalBeds, setMedicalBeds] = useState(() => {
    const savedBeds = localStorage.getItem('phoenixMedicalBeds')
    if (savedBeds) return JSON.parse(savedBeds)
    return startingMedicalBeds
  })

  const [fleetShips, setFleetShips] = useState(() => {
    const savedFleet = localStorage.getItem('phoenixFleet')
    if (savedFleet) return JSON.parse(savedFleet)
    return startingFleetShips
  })

  const [operations, setOperations] = useState(() => {
    const savedOperations = localStorage.getItem('phoenixOperations')
    if (savedOperations) return JSON.parse(savedOperations)
    return startingOperations
  })

  useEffect(() => {
    localStorage.setItem('phoenixInventory', JSON.stringify(inventoryItems))
  }, [inventoryItems])

  useEffect(() => {
    localStorage.setItem('phoenixMedicalBeds', JSON.stringify(medicalBeds))
  }, [medicalBeds])

  useEffect(() => {
    localStorage.setItem('phoenixFleet', JSON.stringify(fleetShips))
  }, [fleetShips])

  useEffect(() => {
    localStorage.setItem('phoenixOperations', JSON.stringify(operations))
  }, [operations])

  const activePersonnel = personnelRoster.filter(
    (member) => member.status === 'Active',
  ).length

  const shipsReady = fleetShips.filter((ship) => ship.status === 'Ready').length

  const pendingRequests = operations.filter(
    (mission) => mission.status === 'Standby' || mission.status === 'Reserved',
  ).length

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

  function renderPage() {
    if (activePage === 'Dashboard') {
      return (
        <Dashboard
          activePersonnel={activePersonnel}
          shipsReady={shipsReady}
          pendingRequests={pendingRequests}
          inventoryItems={inventoryItems}
          fleetShips={fleetShips}
          medicalBeds={medicalBeds}
          operations={operations}
        />
      )
    }

    if (activePage === 'Personnel') {
      return <Personnel />
    }

    if (activePage === 'Fleet') {
      return (
        <Fleet
          fleetShips={fleetShips}
          setFleetShips={setFleetShips}
          isAdminMode={isAdminMode}
        />
      )
    }

    if (activePage === 'Inventory') {
      return (
        <Inventory
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
          isAdminMode={isAdminMode}
        />
      )
    }

    if (activePage === 'Medical Beds') {
      return (
        <MedicalBeds
          medicalBeds={medicalBeds}
          setMedicalBeds={setMedicalBeds}
          isAdminMode={isAdminMode}
        />
      )
    }

    if (activePage === 'Operations') {
      return (
        <Operations
          operations={operations}
          setOperations={setOperations}
          isAdminMode={isAdminMode}
        />
      )
    }

    if (activePage === 'Reports') {
      return (
        <Reports
          inventoryItems={inventoryItems}
          fleetShips={fleetShips}
          medicalBeds={medicalBeds}
          operations={operations}
        />
      )
    }

    return null
  }

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <img
            className="login-logo"
            src={phoenixLogo}
            alt="Phoenix Squadron Medical logo"
          />

          <p className="eyebrow">Restricted Medical System</p>
          <h1>Phoenix Squadron Medical</h1>

          <p className="login-subtitle">
            Authenticate to access fleet medical readiness, inventory,
            operations, and Normandy bed assignments.
          </p>

          <form className="login-form" onSubmit={authenticatePortal}>
            <input
              type="password"
              placeholder="Enter access PIN"
              value={accessPin}
              onChange={(event) => setAccessPin(event.target.value)}
            />

            <button className="admin-button" type="submit">
              Authenticate
            </button>
          </form>

          <div className="login-footer">
            <span>CLASSIFICATION: RESTRICTED</span>
            <span>PHOENIX MEDICAL COMMAND</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <img
            className="logo-image"
            src={phoenixLogo}
            alt="Phoenix Squadron Medical logo"
          />

          <div>
            <h1>Phoenix Medical</h1>
            <p>Rapid Response Command</p>
          </div>
        </div>

        <button className="mode-button" onClick={toggleAdminMode}>
          {isAdminMode ? 'Admin Mode' : 'View Mode'}
        </button>

        <nav>
          {pages.map((page) => (
            <button
              key={page}
              className={activePage === page ? 'nav-item active' : 'nav-item'}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">{renderPage()}</main>

      <div className="system-bar">
        <span>Phoenix Squadron Medical Portal</span>
        <span>Mode: {isAdminMode ? 'Admin' : 'View'}</span>
        <span>System: Online</span>
        <span>Last Updated: {new Date().toLocaleTimeString()}</span>
        <button className="system-link" onClick={logoutPortal}>
          Logout
        </button>
      </div>
    </div>
  )
}

function Dashboard({
  activePersonnel,
  shipsReady,
  pendingRequests,
  inventoryItems,
  fleetShips,
  medicalBeds,
  operations,
}) {
  const lowStockItems = inventoryItems.filter((item) => item.quantity <= 30)
  const offlineShips = fleetShips.filter((ship) => ship.status === 'Offline')
  const criticalOperations = operations.filter(
    (mission) => mission.priority === 'Critical',
  )
  const activeBeds = medicalBeds.filter(
    (bed) => bed.status === 'Occupied' || bed.status === 'Reserved',
  )

  return (
    <>
      <section className="hero hero-with-logo">
        <div className="hero-text">
          <p className="eyebrow">Rapid Medical Response Command</p>
          <h2>Phoenix Squadron Medical Portal</h2>
          <p>
            Operational dashboard for medical readiness, assigned beds, fleet
            status, and field response coordination.
          </p>
        </div>

        <img
          className="hero-logo"
          src={phoenixLogo}
          alt="Phoenix Squadron Medical logo"
        />
      </section>

      <section className="status-grid">
        <div className="card">
          <span>Medical Readiness</span>
          <h3>GREEN</h3>
          <p>All core medical systems are online.</p>
        </div>

        <div className="card">
          <span>Active Personnel</span>
          <h3>{activePersonnel}</h3>
          <p>Available medical personnel currently listed as active.</p>
        </div>

        <div className="card">
          <span>Ships Ready</span>
          <h3>{shipsReady}</h3>
          <p>Medical fleet assets marked ready for deployment.</p>
        </div>

        <div className="card">
          <span>Pending Operations</span>
          <h3>{pendingRequests}</h3>
          <p>Operations currently standing by or reserved.</p>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-item">
          <span>Low Stock</span>
          <strong>{lowStockItems.length}</strong>
          <p>
            {lowStockItems.length > 0
              ? lowStockItems.map((item) => item.item).join(', ')
              : 'No supply warnings detected.'}
          </p>
        </div>

        <div className="summary-item">
          <span>Offline Ships</span>
          <strong>{offlineShips.length}</strong>
          <p>
            {offlineShips.length > 0
              ? offlineShips.map((ship) => ship.name).join(', ')
              : 'No offline ships reported.'}
          </p>
        </div>

        <div className="summary-item">
          <span>Critical Operations</span>
          <strong>{criticalOperations.length}</strong>
          <p>
            {criticalOperations.length > 0
              ? criticalOperations
                  .map((mission) => mission.operation)
                  .join(', ')
              : 'No critical operations active.'}
          </p>
        </div>

        <div className="summary-item">
          <span>Reserved / Occupied Beds</span>
          <strong>{activeBeds.length}</strong>
          <p>
            {activeBeds.length > 0
              ? activeBeds.map((bed) => bed.bed).join(', ')
              : 'Medical beds are clear.'}
          </p>
        </div>
      </section>
    </>
  )
}

function Personnel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Medical Roster</p>
          <h3>Personnel</h3>
        </div>

        <span className="tag">Read Only</span>
      </div>

      <div className="table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Callsign</span>
          <span>Role</span>
          <span>Status</span>
        </div>

        {personnelRoster.map((member) => (
          <div className="table-row" key={member.callsign}>
            <span>{member.name}</span>
            <span>{member.callsign}</span>
            <span>{member.role}</span>
            <span className={getStatusClass(member.status)}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Fleet({ fleetShips, setFleetShips, isAdminMode }) {
  function updateFleetShip(index, field, value) {
    const updatedFleet = fleetShips.map((ship, shipIndex) => {
      if (shipIndex === index) {
        return {
          ...ship,
          [field]: value,
        }
      }

      return ship
    })

    setFleetShips(updatedFleet)
  }

  function resetFleet() {
    setFleetShips(startingFleetShips)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Medical Fleet</p>
          <h3>Fleet Status</h3>
        </div>

        <div className="panel-actions">
          {isAdminMode && (
            <button className="admin-button" onClick={resetFleet}>
              Reset Fleet
            </button>
          )}

          <span className="tag">{isAdminMode ? 'Admin Mode' : 'View Mode'}</span>
        </div>
      </div>

      <div className="table">
        <div className="table-row table-head">
          <span>Ship</span>
          <span>Role</span>
          <span>Assignment</span>
          <span>Status</span>
        </div>

        {fleetShips.map((ship, index) => (
          <div className="table-row" key={ship.name}>
            <span>{ship.name}</span>
            <span>{ship.role}</span>
            <span>
              {isAdminMode ? (
                <input
                  className="inline-input"
                  value={ship.assignment}
                  onChange={(event) =>
                    updateFleetShip(index, 'assignment', event.target.value)
                  }
                />
              ) : (
                ship.assignment
              )}
            </span>
            <span>
              {isAdminMode ? (
                <select
                  className={`status-select ${getStatusClass(ship.status)}`}
                  value={ship.status}
                  onChange={(event) =>
                    updateFleetShip(index, 'status', event.target.value)
                  }
                >
                  <option>Ready</option>
                  <option>Standby</option>
                  <option>Reserved</option>
                  <option>Offline</option>
                </select>
              ) : (
                <span className={getStatusClass(ship.status)}>
                  {ship.status}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Inventory({ inventoryItems, setInventoryItems, isAdminMode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Medical Supply')
  const [newQuantity, setNewQuantity] = useState('')

  const filteredItems = inventoryItems.filter((item) => {
    const searchText = `${item.item} ${item.category} ${item.status}`
      .toLowerCase()
      .trim()

    return searchText.includes(searchTerm.toLowerCase())
  })

  function updateQuantity(itemName, amount) {
    const updatedItems = inventoryItems.map((item) => {
      if (item.item === itemName) {
        return {
          ...item,
          quantity: Math.max(0, item.quantity + amount),
        }
      }

      return item
    })

    setInventoryItems(updatedItems)
  }

  function updateStatus(itemName, newStatus) {
    const updatedItems = inventoryItems.map((item) => {
      if (item.item === itemName) {
        return {
          ...item,
          status: newStatus,
        }
      }

      return item
    })

    setInventoryItems(updatedItems)
  }

  function addInventoryItem(event) {
    event.preventDefault()

    if (!newItem.trim() || !newQuantity) return

    const addedItem = {
      item: newItem.trim(),
      category: newCategory,
      quantity: Number(newQuantity),
      status: 'In Stock',
    }

    setInventoryItems([...inventoryItems, addedItem])
    setNewItem('')
    setNewCategory('Medical Supply')
    setNewQuantity('')
  }

  function deleteInventoryItem(itemName) {
    const updatedItems = inventoryItems.filter((item) => item.item !== itemName)
    setInventoryItems(updatedItems)
  }

  function resetInventory() {
    setInventoryItems(startingInventoryItems)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Medical Supply</p>
          <h3>Inventory Control</h3>
        </div>

        <div className="panel-actions">
          {isAdminMode && (
            <button className="admin-button" onClick={resetInventory}>
              Reset Inventory
            </button>
          )}

          <span className="tag">{isAdminMode ? 'Admin Mode' : 'View Mode'}</span>
        </div>
      </div>

      <input
        className="search-box"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {isAdminMode && (
        <form className="admin-form" onSubmit={addInventoryItem}>
          <input
            placeholder="Item name"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />

          <select
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          >
            <option>Medical Supply</option>
            <option>Medication</option>
            <option>Medical Tool</option>
            <option>Rescue Equipment</option>
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={newQuantity}
            onChange={(event) => setNewQuantity(event.target.value)}
          />

          <button className="admin-button" type="submit">
            Add Item
          </button>
        </form>
      )}

      <div
        className={
          isAdminMode
            ? 'table inventory-table'
            : 'table inventory-table view-only'
        }
      >
        <div className="table-row table-head">
          <span>Item</span>
          <span>Category</span>
          <span>Qty</span>
          <span>Status</span>
          <span>Stock</span>
          {isAdminMode && <span>Actions</span>}
        </div>

        {filteredItems.map((item) => (
          <div className="table-row" key={item.item}>
            <span>{item.item}</span>
            <span>{item.category}</span>
            <span>{item.quantity}</span>
            <span>
              {isAdminMode ? (
                <select
                  className={`status-select ${getStatusClass(item.status)}`}
                  value={item.status}
                  onChange={(event) =>
                    updateStatus(item.item, event.target.value)
                  }
                >
                  <option>Ready</option>
                  <option>In Stock</option>
                  <option>Monitor</option>
                  <option>Reserved</option>
                  <option>Offline</option>
                </select>
              ) : (
                <span className={getStatusClass(item.status)}>
                  {item.status}
                </span>
              )}
            </span>
            <span
              className={`stock-pill stock-${getStockLevel(
                item.quantity,
              ).toLowerCase()}`}
            >
              {getStockLevel(item.quantity)}
            </span>

            {isAdminMode && (
              <span className="control-group">
                <button
                  className="small-button"
                  onClick={() => updateQuantity(item.item, -1)}
                >
                  -
                </button>

                <button
                  className="small-button"
                  onClick={() => updateQuantity(item.item, 1)}
                >
                  +
                </button>

                <button
                  className="small-button danger"
                  onClick={() => deleteInventoryItem(item.item)}
                >
                  Delete
                </button>
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function MedicalBeds({ medicalBeds, setMedicalBeds, isAdminMode }) {
  const [draftAssignments, setDraftAssignments] = useState(() => {
    const startingDrafts = {}

    medicalBeds.forEach((bed) => {
      startingDrafts[bed.bed] = bed.assignedTo
    })

    return startingDrafts
  })

  function updateDraftAssignment(bedName, newAssignment) {
    setDraftAssignments({
      ...draftAssignments,
      [bedName]: newAssignment,
    })
  }

  function saveBedAssignment(bedName) {
    const updatedBeds = medicalBeds.map((bed) => {
      if (bed.bed === bedName) {
        return {
          ...bed,
          assignedTo: draftAssignments[bedName] || 'Unassigned',
        }
      }

      return bed
    })

    setMedicalBeds(updatedBeds)
  }

  function updateBedStatus(bedName, newStatus) {
    const updatedBeds = medicalBeds.map((bed) => {
      if (bed.bed === bedName) {
        return {
          ...bed,
          status: newStatus,
        }
      }

      return bed
    })

    setMedicalBeds(updatedBeds)
  }

  function resetBeds() {
    setMedicalBeds(startingMedicalBeds)

    const resetDrafts = {}

    startingMedicalBeds.forEach((bed) => {
      resetDrafts[bed.bed] = bed.assignedTo
    })

    setDraftAssignments(resetDrafts)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Normandy Medical Bay</p>
          <h3>Assigned Medical Beds</h3>
        </div>

        <div className="panel-actions">
          {isAdminMode && (
            <button className="admin-button" onClick={resetBeds}>
              Reset Beds
            </button>
          )}

          <span className="tag">{isAdminMode ? 'Admin Mode' : 'View Mode'}</span>
        </div>
      </div>

      <div className="bed-grid">
        {medicalBeds.map((bed) => (
          <div className="bed-card" key={bed.bed}>
            <span>{bed.bed}</span>
            <strong>{bed.designation}</strong>

            {isAdminMode ? (
              <>
                <label className="field-label">Assigned To</label>

                <div className="assign-row">
                  <input
                    className="inline-input"
                    type="text"
                    value={draftAssignments[bed.bed] || ''}
                    placeholder="Type name / callsign"
                    onChange={(event) =>
                      updateDraftAssignment(bed.bed, event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        saveBedAssignment(bed.bed)
                      }
                    }}
                  />

                  <button
                    className="small-button save-button"
                    onClick={() => saveBedAssignment(bed.bed)}
                  >
                    ✓
                  </button>
                </div>

                <label className="field-label">Status</label>

                <select
                  className={`status-select ${getStatusClass(bed.status)}`}
                  value={bed.status}
                  onChange={(event) =>
                    updateBedStatus(bed.bed, event.target.value)
                  }
                >
                  <option>Available</option>
                  <option>Standby</option>
                  <option>Open</option>
                  <option>Reserved</option>
                  <option>Occupied</option>
                </select>
              </>
            ) : (
              <>
                <p>Assigned: {bed.assignedTo}</p>
                <p>
                  Status:{' '}
                  <span className={getStatusClass(bed.status)}>
                    {bed.status}
                  </span>
                </p>
              </>
            )}

            <p>Purpose: {bed.purpose}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Operations({ operations, setOperations, isAdminMode }) {
  const [newOperation, setNewOperation] = useState('')
  const [newType, setNewType] = useState('Medical Overwatch')
  const [newAsset, setNewAsset] = useState('Normandy')
  const [newPriority, setNewPriority] = useState('Normal')

  function updateOperation(index, field, value) {
    const updatedOperations = operations.map((mission, missionIndex) => {
      if (missionIndex === index) {
        return {
          ...mission,
          [field]: value,
        }
      }

      return mission
    })

    setOperations(updatedOperations)
  }

  function addOperation(event) {
    event.preventDefault()

    if (!newOperation.trim()) return

    const addedOperation = {
      operation: newOperation.trim(),
      type: newType,
      asset: newAsset,
      status: 'Standby',
      priority: newPriority,
    }

    setOperations([...operations, addedOperation])
    setNewOperation('')
    setNewType('Medical Overwatch')
    setNewAsset('Normandy')
    setNewPriority('Normal')
  }

  function deleteOperation(operationName) {
    const updatedOperations = operations.filter(
      (mission) => mission.operation !== operationName,
    )

    setOperations(updatedOperations)
  }

  function resetOperations() {
    setOperations(startingOperations)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Mission Board</p>
          <h3>Operations</h3>
        </div>

        <div className="panel-actions">
          {isAdminMode && (
            <button className="admin-button" onClick={resetOperations}>
              Reset Operations
            </button>
          )}

          <span className="tag">{isAdminMode ? 'Admin Mode' : 'View Mode'}</span>
        </div>
      </div>

      {isAdminMode && (
        <form className="admin-form operations-form" onSubmit={addOperation}>
          <input
            placeholder="Operation name"
            value={newOperation}
            onChange={(event) => setNewOperation(event.target.value)}
          />

          <select
            value={newType}
            onChange={(event) => setNewType(event.target.value)}
          >
            <option>Medical Overwatch</option>
            <option>Search and Rescue</option>
            <option>QRF</option>
            <option>Mass Casualty</option>
            <option>Training</option>
          </select>

          <select
            value={newAsset}
            onChange={(event) => setNewAsset(event.target.value)}
          >
            <option>Normandy</option>
            <option>RSI Apollo Medivac</option>
            <option>RSI Apollo Triage</option>
            <option>C8R Pisces Rescue</option>
            <option>Ground Team</option>
          </select>

          <select
            value={newPriority}
            onChange={(event) => setNewPriority(event.target.value)}
          >
            <option>Normal</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <button className="admin-button" type="submit">
            Add Operation
          </button>
        </form>
      )}

      <div className="table">
        <div className="table-row table-head">
          <span>Operation</span>
          <span>Type</span>
          <span>Asset</span>
          <span>Status</span>
        </div>

        {operations.map((mission, index) => (
          <div className="table-row" key={mission.operation}>
            <span>{mission.operation}</span>
            <span>{mission.type}</span>
            <span>{mission.asset}</span>
            <span>
              {isAdminMode ? (
                <div className="control-group">
                  <select
                    className={`status-select ${getStatusClass(
                      mission.status,
                    )}`}
                    value={mission.status}
                    onChange={(event) =>
                      updateOperation(index, 'status', event.target.value)
                    }
                  >
                    <option>Ready</option>
                    <option>Standby</option>
                    <option>Reserved</option>
                    <option>Offline</option>
                  </select>

                  <select
                    className="status-select"
                    value={mission.priority}
                    onChange={(event) =>
                      updateOperation(index, 'priority', event.target.value)
                    }
                  >
                    <option>Normal</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>

                  <button
                    className="small-button danger"
                    onClick={() => deleteOperation(mission.operation)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <span className={getStatusClass(mission.status)}>
                  {mission.status}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Reports({ inventoryItems, fleetShips, medicalBeds, operations }) {
  const generatedAt = new Date().toLocaleString()
  const lowStockItems = inventoryItems.filter((item) => item.quantity <= 30)
  const criticalStockItems = inventoryItems.filter((item) => item.quantity <= 10)
  const readyShips = fleetShips.filter((ship) => ship.status === 'Ready')
  const offlineShips = fleetShips.filter((ship) => ship.status === 'Offline')
  const pendingOperations = operations.filter(
    (mission) => mission.status === 'Standby' || mission.status === 'Reserved',
  )
  const criticalOperations = operations.filter(
    (mission) => mission.priority === 'Critical',
  )

  const reportText = `
PHOENIX SQUADRON MEDICAL REPORT
Generated: ${generatedAt}
Report Type: Operational Readiness Summary
Prepared By: Phoenix Medical Portal

==================================================
COMMAND SUMMARY
==================================================
Medical Readiness: GREEN
Active Fleet Assets Ready: ${readyShips.length}
Pending Operations: ${pendingOperations.length}
Critical Operations: ${criticalOperations.length}
Offline Ships: ${offlineShips.length}
Low Stock Items: ${lowStockItems.length}
Critical Stock Items: ${criticalStockItems.length}

==================================================
LOW STOCK ITEMS
==================================================
${
  lowStockItems.length > 0
    ? lowStockItems
        .map(
          (item) =>
            `- ${item.item}: ${item.quantity} remaining (${getStockLevel(
              item.quantity,
            )})`,
        )
        .join('\n')
    : '- No low stock items detected.'
}

==================================================
FLEET STATUS
==================================================
${fleetShips
  .map(
    (ship) =>
      `- ${ship.name}
  Role: ${ship.role}
  Status: ${ship.status}
  Crew: ${ship.crew}
  Assignment: ${ship.assignment}`,
  )
  .join('\n\n')}

==================================================
NORMANDY MEDICAL BED ASSIGNMENTS
==================================================
${medicalBeds
  .map(
    (bed) =>
      `- ${bed.bed} — ${bed.designation}
  Assigned To: ${bed.assignedTo}
  Status: ${bed.status}
  Purpose: ${bed.purpose}`,
  )
  .join('\n\n')}

==================================================
OPERATIONS BOARD
==================================================
${operations
  .map(
    (mission) =>
      `- ${mission.operation}
  Type: ${mission.type}
  Asset: ${mission.asset}
  Status: ${mission.status}
  Priority: ${mission.priority}`,
  )
  .join('\n\n')}

==================================================
END OF REPORT
==================================================
`.trim()

  function copyReport() {
    navigator.clipboard.writeText(reportText)
    window.alert('Phoenix Medical report copied to clipboard')
  }

  function printReport() {
    window.print()
  }

  return (
    <section className="panel report-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Command Summary</p>
          <h3>Export Report</h3>
        </div>

        <div className="panel-actions">
          <button className="admin-button" onClick={copyReport}>
            Copy Report
          </button>

          <button className="admin-button" onClick={printReport}>
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="report-summary">
        <div className="summary-item">
          <span>Generated</span>
          <strong>{generatedAt}</strong>
          <p>Current browser time at report creation.</p>
        </div>

        <div className="summary-item">
          <span>Fleet Ready</span>
          <strong>{readyShips.length}</strong>
          <p>
            {readyShips.length > 0
              ? readyShips.map((ship) => ship.name).join(', ')
              : 'No ready fleet assets.'}
          </p>
        </div>

        <div className="summary-item">
          <span>Low Stock</span>
          <strong>{lowStockItems.length}</strong>
          <p>
            {lowStockItems.length > 0
              ? lowStockItems.map((item) => item.item).join(', ')
              : 'No low-stock items.'}
          </p>
        </div>

        <div className="summary-item">
          <span>Critical Ops</span>
          <strong>{criticalOperations.length}</strong>
          <p>
            {criticalOperations.length > 0
              ? criticalOperations
                  .map((mission) => mission.operation)
                  .join(', ')
              : 'No critical operations.'}
          </p>
        </div>
      </div>

      <pre className="report-box">{reportText}</pre>
    </section>
  )
}

export default App