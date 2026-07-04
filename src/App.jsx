import { useEffect, useState } from 'react'
import './App.css'

const pages = [
  'Dashboard',
  'Personnel',
  'Fleet',
  'Inventory',
  'Medical Beds',
  'Operations',
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

  useEffect(() => {
    localStorage.setItem('phoenixInventory', JSON.stringify(inventoryItems))
  }, [inventoryItems])

  useEffect(() => {
    localStorage.setItem('phoenixMedicalBeds', JSON.stringify(medicalBeds))
  }, [medicalBeds])

  useEffect(() => {
    localStorage.setItem('phoenixFleet', JSON.stringify(fleetShips))
  }, [fleetShips])

  const activePersonnel = personnelRoster.filter(
    (member) => member.status === 'Active',
  ).length

  const shipsReady = fleetShips.filter((ship) => ship.status === 'Ready').length

  const pendingRequests = 2

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
            onClick={() => setIsAdminMode(!isAdminMode)}
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

        {activePage === 'Operations' && <Operations />}
      </main>
    </div>
  )
}

function Dashboard({ activePersonnel, shipsReady, pendingRequests, medicalBeds }) {
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
          <p>Pending Requests</p>
          <h3>{pendingRequests}</h3>
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

      <div className={isAdminMode ? 'table inventory-table' : 'table inventory-table view-only'}>
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

function Operations() {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Command Operations</p>
          <h3>Mission Board</h3>
        </div>
        <span className="tag">QRF Standby</span>
      </div>

      <div className="bed-grid">
        <div className="bed-card">
          <span>Phoenix Medical Standby</span>
          <strong>QRF</strong>
          <p>Asset: Normandy</p>
          <p>
            Status: <span className={getStatusClass('Standby')}>Standby</span>
          </p>
          <p>Priority: Normal</p>
        </div>

        <div className="bed-card">
          <span>Beacon Response</span>
          <strong>Search and Rescue</strong>
          <p>Asset: C8R Pisces Rescue</p>
          <p>
            Status: <span className={getStatusClass('Ready')}>Ready</span>
          </p>
          <p>Priority: High</p>
        </div>

        <div className="bed-card">
          <span>MASCAS Support</span>
          <strong>Mass Casualty</strong>
          <p>Asset: RSI Apollo Triage</p>
          <p>
            Status: <span className={getStatusClass('Reserved')}>Reserved</span>
          </p>
          <p>Priority: Critical</p>
        </div>

        <div className="bed-card">
          <span>Fleet Medical Escort</span>
          <strong>Medical Overwatch</strong>
          <p>Asset: RSI Apollo Medivac</p>
          <p>
            Status: <span className={getStatusClass('Ready')}>Ready</span>
          </p>
          <p>Priority: Normal</p>
        </div>
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

export default App