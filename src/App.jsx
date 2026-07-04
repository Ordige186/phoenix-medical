import { useEffect, useState } from 'react'
import './App.css'

const pages = [
  'Dashboard',
  'Personnel',
  'Fleet',
  'Inventory',
  'Medical Beds',
  'Operations',
  'Reports',
]

function getStatusClass(status) {
  return `status-pill status-${status.toLowerCase().replaceAll(' ', '-')}`
}

function getStockLevel(quantity) {
  if (quantity <= 10) {
    return 'Critical'
  }

  if (quantity <= 30) {
    return 'Low'
  }

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

  const [inventoryItems, setInventoryItems] = useState(() => {
    const savedInventory = localStorage.getItem('phoenixInventory')

    if (savedInventory) {
      return JSON.parse(savedInventory)
    }

    return startingInventoryItems
  })

  const [medicalBeds, setMedicalBeds] = useState(() => {
    const savedBeds = localStorage.getItem('phoenixMedicalBeds')

    if (savedBeds) {
      return JSON.parse(savedBeds)
    }

    return startingMedicalBeds
  })

  const [fleetShips, setFleetShips] = useState(() => {
    const savedFleet = localStorage.getItem('phoenixFleet')

    if (savedFleet) {
      return JSON.parse(savedFleet)
    }

    return startingFleetShips
  })

  const [operations, setOperations] = useState(() => {
    const savedOperations = localStorage.getItem('phoenixOperations')

    if (savedOperations) {
      return JSON.parse(savedOperations)
    }

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

  function toggleAdminMode() {
    if (isAdminMode) {
      setIsAdminMode(false)
      return
    }

    const pin = window.prompt('Enter Phoenix Medical admin PIN')

    if (pin === '186') {
      setIsAdminMode(true)
    } else if (pin !== null) {
      window.alert('Incorrect admin PIN')
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">𓅃</div>
          <div>
            <h1>PHOENIX</h1>
            <p>Squadron Medical</p>
          </div>
        </div>

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

        <div className="admin-toggle">
          <p>Access Mode</p>
          <button
            className={isAdminMode ? 'mode-button active' : 'mode-button'}
            onClick={toggleAdminMode}
          >
            {isAdminMode ? 'Admin Mode' : 'View Mode'}
          </button>
        </div>
      </aside>

      <main className="main">
        {activePage === 'Dashboard' && (
         <Dashboard
  activePersonnel={activePersonnel}
  shipsReady={shipsReady}
  pendingRequests={pendingRequests}
  medicalBeds={medicalBeds}
  inventoryItems={inventoryItems}
  fleetShips={fleetShips}
  operations={operations}
/>
        )}

        {activePage === 'Personnel' && <Personnel />}

        {activePage === 'Fleet' && (
          <Fleet
            fleetShips={fleetShips}
            setFleetShips={setFleetShips}
            isAdminMode={isAdminMode}
          />
        )}

        {activePage === 'Inventory' && (
          <Inventory
            inventoryItems={inventoryItems}
            setInventoryItems={setInventoryItems}
            resetInventory={() => setInventoryItems(startingInventoryItems)}
            isAdminMode={isAdminMode}
          />
        )}

        {activePage === 'Medical Beds' && (
          <MedicalBeds
            medicalBeds={medicalBeds}
            setMedicalBeds={setMedicalBeds}
            isAdminMode={isAdminMode}
          />
        )}

        {activePage === 'Operations' && (
          <Operations
            operations={operations}
            setOperations={setOperations}
            isAdminMode={isAdminMode}
          />
        )}
        {activePage === 'Reports' && (
  <Reports
    inventoryItems={inventoryItems}
    fleetShips={fleetShips}
    medicalBeds={medicalBeds}
    operations={operations}
  />
)}
      </main>
    </div>
  )
}

function Dashboard({
  activePersonnel,
  shipsReady,
  pendingRequests,
  medicalBeds,
  inventoryItems,
  fleetShips,
  operations,
}) {
  const lowStockItems = inventoryItems.filter((item) => item.quantity <= 30)
const offlineShips = fleetShips.filter((ship) => ship.status === 'Offline')
const criticalOperations = operations.filter(
  (mission) => mission.priority === 'Critical',
)
const reservedBeds = medicalBeds.filter(
  (bed) => bed.status === 'Reserved' || bed.status === 'Occupied',
)

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Rapid Medical Response Command</p>
        <h2>Phoenix Squadron Medical Portal</h2>
        <p>
          Operational dashboard for medical readiness, assigned beds, fleet
          status, and field response coordination.
        </p>
      </section>

      <section className="status-grid">
        <div className="card green">
          <p>Medical Readiness</p>
          <h3>GREEN</h3>
        </div>

        <div className="card">
          <p>Active Personnel</p>
          <h3>{activePersonnel}</h3>
        </div>

        <div className="card">
          <p>Ships Ready</p>
          <h3>{shipsReady}</h3>
        </div>

        <div className="card amber">
          <p>Pending Operations</p>
          <h3>{pendingRequests}</h3>
        </div>
      </section>
<section className="panel">
  <div className="panel-header">
    <div>
      <p className="eyebrow">System Check</p>
      <h3>Readiness Summary</h3>
    </div>
    <span className="tag">Auto Scan</span>
  </div>

  <div className="summary-grid">
    <div className="summary-item">
      <span>Low Stock</span>
      <strong>{lowStockItems.length}</strong>
      <p>
        {lowStockItems.length > 0
          ? lowStockItems.map((item) => item.item).join(', ')
          : 'No low-stock items detected.'}
      </p>
    </div>

    <div className="summary-item">
      <span>Offline Ships</span>
      <strong>{offlineShips.length}</strong>
      <p>
        {offlineShips.length > 0
          ? offlineShips.map((ship) => ship.name).join(', ')
          : 'All fleet assets reporting available.'}
      </p>
    </div>

    <div className="summary-item">
      <span>Critical Operations</span>
      <strong>{criticalOperations.length}</strong>
      <p>
        {criticalOperations.length > 0
          ? criticalOperations.map((mission) => mission.operation).join(', ')
          : 'No critical operations active.'}
      </p>
    </div>

    <div className="summary-item">
      <span>Reserved / Occupied Beds</span>
      <strong>{reservedBeds.length}</strong>
      <p>
        {reservedBeds.length > 0
          ? reservedBeds.map((bed) => bed.bed).join(', ')
          : 'No restricted beds detected.'}
      </p>
    </div>
  </div>
</section>

      <MedicalBedsPreview medicalBeds={medicalBeds} />
    </>
  )
}

function Personnel() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersonnel = personnelRoster.filter((member) => {
    const searchableText =
      `${member.name} ${member.callsign} ${member.role} ${member.certifications} ${member.status}`.toLowerCase()

    return searchableText.includes(searchTerm.toLowerCase())
  })

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Roster</p>
          <h3>Medical Personnel</h3>
        </div>
        <span className="tag">Active</span>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search personnel..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Callsign</span>
          <span>Role</span>
          <span>Status</span>
        </div>

        {filteredPersonnel.map((member) => (
          <div className="table-row" key={member.name}>
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
  function updateShipStatus(shipName, newStatus) {
    const updatedFleet = fleetShips.map((ship) => {
      if (ship.name === shipName) {
        return {
          ...ship,
          status: newStatus,
        }
      }

      return ship
    })

    setFleetShips(updatedFleet)
  }

  function updateShipCrew(shipName, newCrew) {
    const updatedFleet = fleetShips.map((ship) => {
      if (ship.name === shipName) {
        return {
          ...ship,
          crew: newCrew,
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
          <h3>Ship Readiness</h3>
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

      <div className="bed-grid">
        {fleetShips.map((ship) => (
          <div className="bed-card" key={ship.name}>
            <span>{ship.name}</span>
            <strong>{ship.role}</strong>

            {isAdminMode ? (
              <>
                <label className="field-label">Status</label>
                <select
                  className={`status-select ${getStatusClass(ship.status)}`}
                  value={ship.status}
                  onChange={(event) =>
                    updateShipStatus(ship.name, event.target.value)
                  }
                >
                  <option>Ready</option>
                  <option>Standby</option>
                  <option>Reserved</option>
                  <option>Occupied</option>
                  <option>Offline</option>
                </select>

                <label className="field-label">Crew</label>
                <input
                  className="inline-input"
                  type="text"
                  value={ship.crew}
                  onChange={(event) =>
                    updateShipCrew(ship.name, event.target.value)
                  }
                />
              </>
            ) : (
              <>
                <p>
                  Status:{' '}
                  <span className={getStatusClass(ship.status)}>
                    {ship.status}
                  </span>
                </p>
                <p>Crew: {ship.crew}</p>
              </>
            )}

            <p>Assignment: {ship.assignment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Inventory({
  inventoryItems,
  setInventoryItems,
  resetInventory,
  isAdminMode,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newQuantity, setNewQuantity] = useState('')
  const [newStatus, setNewStatus] = useState('Ready')

  const filteredItems = inventoryItems.filter((supply) => {
    const searchableText =
      `${supply.item} ${supply.category} ${supply.status}`.toLowerCase()

    return searchableText.includes(searchTerm.toLowerCase())
  })

  function updateQuantity(itemName, amount) {
    const updatedInventory = inventoryItems.map((supply) => {
      if (supply.item === itemName) {
        const newQuantityValue = Math.max(0, supply.quantity + amount)

        return {
          ...supply,
          quantity: newQuantityValue,
        }
      }

      return supply
    })

    setInventoryItems(updatedInventory)
  }

  function addInventoryItem(event) {
    event.preventDefault()

    if (!newItem || !newCategory || !newQuantity) {
      return
    }

    const itemToAdd = {
      item: newItem,
      category: newCategory,
      quantity: Number(newQuantity),
      status: newStatus,
    }

    setInventoryItems([...inventoryItems, itemToAdd])

    setNewItem('')
    setNewCategory('')
    setNewQuantity('')
    setNewStatus('Ready')
  }

  function deleteInventoryItem(itemName) {
    const updatedInventory = inventoryItems.filter((supply) => {
      return supply.item !== itemName
    })

    setInventoryItems(updatedInventory)
  }

  function updateItemStatus(itemName, newStatus) {
    const updatedInventory = inventoryItems.map((supply) => {
      if (supply.item === itemName) {
        return {
          ...supply,
          status: newStatus,
        }
      }

      return supply
    })

    setInventoryItems(updatedInventory)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Medical Logistics</p>
          <h3>Inventory</h3>
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

      {isAdminMode && (
        <form className="admin-form" onSubmit={addInventoryItem}>
          <input
            type="text"
            placeholder="Item name"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            min="0"
            value={newQuantity}
            onChange={(event) => setNewQuantity(event.target.value)}
          />

          <select
            value={newStatus}
            onChange={(event) => setNewStatus(event.target.value)}
          >
            <option>Ready</option>
            <option>In Stock</option>
            <option>Monitor</option>
            <option>Reserved</option>
            <option>Open</option>
          </select>

          <button className="admin-button" type="submit">
            Add Item
          </button>
        </form>
      )}

      <input
        className="search-box"
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div
        className={
          isAdminMode ? 'table inventory-table' : 'table inventory-table view-only'
        }
      >
        <div className="table-row table-head">
          <span>Item</span>
          <span>Category</span>
          <span>Quantity</span>
          <span>Stock Level</span>
          <span>Status</span>
          {isAdminMode && <span>Controls</span>}
        </div>

        {filteredItems.map((supply) => (
          <div className="table-row" key={supply.item}>
            <span>{supply.item}</span>
            <span>{supply.category}</span>
            <span>{supply.quantity}</span>

            <span
              className={`stock-pill stock-${getStockLevel(
                supply.quantity,
              ).toLowerCase()}`}
            >
              {getStockLevel(supply.quantity)}
            </span>

            {isAdminMode ? (
              <select
                className={`status-select ${getStatusClass(supply.status)}`}
                value={supply.status}
                onChange={(event) =>
                  updateItemStatus(supply.item, event.target.value)
                }
              >
                <option>Ready</option>
                <option>In Stock</option>
                <option>Monitor</option>
                <option>Reserved</option>
                <option>Open</option>
              </select>
            ) : (
              <span className={getStatusClass(supply.status)}>
                {supply.status}
              </span>
            )}

            {isAdminMode && (
              <span className="control-group">
                <button
                  className="small-button"
                  onClick={() => updateQuantity(supply.item, -1)}
                >
                  -
                </button>

                <button
                  className="small-button"
                  onClick={() => updateQuantity(supply.item, 1)}
                >
                  +
                </button>

                <button
                  className="small-button danger"
                  onClick={() => deleteInventoryItem(supply.item)}
                >
                  ×
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
  function updateBedAssignment(bedName, newAssignment) {
    const updatedBeds = medicalBeds.map((bed) => {
      if (bed.bed === bedName) {
        return {
          ...bed,
          assignedTo: newAssignment,
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
                <input
                  className="inline-input"
                  type="text"
                  value={bed.assignedTo}
                  onChange={(event) =>
                    updateBedAssignment(bed.bed, event.target.value)
                  }
                />

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
  const [newType, setNewType] = useState('')
  const [newAsset, setNewAsset] = useState('')
  const [newStatus, setNewStatus] = useState('Standby')
  const [newPriority, setNewPriority] = useState('Normal')

  function addOperation(event) {
    event.preventDefault()

    if (!newOperation || !newType || !newAsset) {
      return
    }

    const operationToAdd = {
      operation: newOperation,
      type: newType,
      asset: newAsset,
      status: newStatus,
      priority: newPriority,
    }

    setOperations([...operations, operationToAdd])

    setNewOperation('')
    setNewType('')
    setNewAsset('')
    setNewStatus('Standby')
    setNewPriority('Normal')
  }

  function updateOperationStatus(operationName, newStatusValue) {
    const updatedOperations = operations.map((mission) => {
      if (mission.operation === operationName) {
        return {
          ...mission,
          status: newStatusValue,
        }
      }

      return mission
    })

    setOperations(updatedOperations)
  }

  function updateOperationPriority(operationName, newPriorityValue) {
    const updatedOperations = operations.map((mission) => {
      if (mission.operation === operationName) {
        return {
          ...mission,
          priority: newPriorityValue,
        }
      }

      return mission
    })

    setOperations(updatedOperations)
  }

  function deleteOperation(operationName) {
    const updatedOperations = operations.filter((mission) => {
      return mission.operation !== operationName
    })

    setOperations(updatedOperations)
  }

  function resetOperations() {
    setOperations(startingOperations)
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Command Operations</p>
          <h3>Mission Board</h3>
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
            type="text"
            placeholder="Operation name"
            value={newOperation}
            onChange={(event) => setNewOperation(event.target.value)}
          />

          <input
            type="text"
            placeholder="Type"
            value={newType}
            onChange={(event) => setNewType(event.target.value)}
          />

          <input
            type="text"
            placeholder="Assigned asset"
            value={newAsset}
            onChange={(event) => setNewAsset(event.target.value)}
          />

          <select
            value={newStatus}
            onChange={(event) => setNewStatus(event.target.value)}
          >
            <option>Ready</option>
            <option>Standby</option>
            <option>Reserved</option>
            <option>Occupied</option>
            <option>Offline</option>
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

      <div className="bed-grid">
        {operations.map((mission) => (
          <div className="bed-card" key={mission.operation}>
            <span>{mission.operation}</span>
            <strong>{mission.type}</strong>
            <p>Asset: {mission.asset}</p>

            {isAdminMode ? (
              <>
                <label className="field-label">Status</label>
                <select
                  className={`status-select ${getStatusClass(mission.status)}`}
                  value={mission.status}
                  onChange={(event) =>
                    updateOperationStatus(
                      mission.operation,
                      event.target.value,
                    )
                  }
                >
                  <option>Ready</option>
                  <option>Standby</option>
                  <option>Reserved</option>
                  <option>Occupied</option>
                  <option>Offline</option>
                </select>

                <label className="field-label">Priority</label>
                <select
                  className="inline-input"
                  value={mission.priority}
                  onChange={(event) =>
                    updateOperationPriority(
                      mission.operation,
                      event.target.value,
                    )
                  }
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>

                <button
                  className="admin-button danger-button"
                  onClick={() => deleteOperation(mission.operation)}
                >
                  Delete Operation
                </button>
              </>
            ) : (
              <>
                <p>
                  Status:{' '}
                  <span className={getStatusClass(mission.status)}>
                    {mission.status}
                  </span>
                </p>
                <p>Priority: {mission.priority}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function MedicalBedsPreview({ medicalBeds }) {
  const previewBeds = medicalBeds.slice(0, 4)

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Medical Bay</p>
          <h3>Normandy Assigned Beds</h3>
        </div>
        <span className="tag">Standby</span>
      </div>

      <div className="bed-grid">
        {previewBeds.map((bed) => (
          <div className="bed-card" key={bed.bed}>
            <span>{bed.bed}</span>
            <strong>{bed.designation}</strong>
            <p>Assigned: {bed.assignedTo}</p>
            <p>
              Status:{' '}
              <span className={getStatusClass(bed.status)}>
                {bed.status}
              </span>
            </p>
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