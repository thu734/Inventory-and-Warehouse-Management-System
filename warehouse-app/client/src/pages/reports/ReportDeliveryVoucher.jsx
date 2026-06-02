import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { reportsApi } from '../../api/reports.api'
import { stockSalesApi } from '../../api/stockSales.api'
import { formatDate, formatNumber } from '../../utils'

export default function ReportDeliveryVoucher() {
  const [searchParams] = useSearchParams()

  const [stockList, setStockList] = useState([])
  const [f, setF] = useState({ stock_no: '' })
  const [result, setResult] = useState(null)
  const [ran, setRan] = useState(false)

  useEffect(() => {
    stockSalesApi.list().then(setStockList)

    const stockNo = searchParams.get('stock_no')

    if (stockNo) {
      setF({ stock_no: stockNo })

      reportsApi
        .deliveryVoucher({ stock_no: stockNo })
        .then(r => {
          setResult(r)
          setRan(true)

          setTimeout(() => {
            window.print()
          }, 500)
        })
    }
  }, [])

  const run = async () => {
    setResult(await reportsApi.deliveryVoucher(f))
    setRan(true)
  }

  const cancel = () => {
    setF({ stock_no: '' })
    setResult(null)
    setRan(false)
  }

  const isReturn =
    result?.header?.reason === 'Sales Return'

  const voucherTitle = isReturn
    ? 'Sales Return Voucher'
    : 'Stock Delivery Voucher'

  const total =
    result?.lines?.reduce(
      (s, r) => s + parseFloat(r.extended_price || 0),
      0
    ) || 0

  return (
    <div>
      <div className="page-header">
        <span className="page-title">
          #08 — {voucherTitle}
        </span>
      </div>

      <div className="report-filter">

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'flex-end'
          }}
        >
          <div className="form-group">
            <label>Stock No</label>
            <select
              value={f.stock_no}
              onChange={e =>
                setF({ stock_no: e.target.value })
              }
            >
              <option value="">— Select —</option>

              {stockList.map(s => (
                <option
                  key={s.stock_no}
                  value={s.stock_no}
                >
                  {s.stock_no}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-primary"
            onClick={run}
          >
            OK
          </button>

          <button
            className="btn-secondary"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
      
      {ran && result?.header && (
  <div className="print-btn-container">
    <button
      className="btn-primary"
      onClick={() => window.print()}
    >
      Print Voucher
    </button>
  </div>
)}
      {ran && result?.header && (
  <div id="delivery-voucher-print-area">

    

    <div className="print-header">x
      <h2>{voucherTitle.toUpperCase()}</h2>

      <p>
        <strong>Print Date:</strong>{' '}
        {new Date().toLocaleDateString()}
      </p>
    </div>

          <div
            style={{
              background: 'white',
              padding: 16,
              border: '1px solid #ddd',
              borderRadius: 8,
              marginBottom: 16
            }}
          >
            <h4 style={{ marginBottom: 8 }}>
              {voucherTitle}
            </h4>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                fontSize: 13
              }}
            >
              <p>
                <strong>Stock No:</strong>{' '}
                {result.header.stock_no}
              </p>

              <p>
                <strong>Date:</strong>{' '}
                {formatDate(result.header.stock_date)}
              </p>

              <p>
                <strong>Warehouse:</strong>{' '}
                {result.header.warehouse_name}
              </p>

              <p>
                <strong>Reason:</strong>{' '}
                {result.header.reason}
              </p>

              <p>
                <strong>Customer:</strong>{' '}
                {result.header.customer_name}
              </p>

              <p>
                <strong>Contact:</strong>{' '}
                {result.header.contact_info || '—'}
              </p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Code</th>
                <th>Name</th>
                <th>Ref SO</th>

                {!isReturn && <th>Qty OUT</th>}
                {isReturn && <th>Qty IN</th>}

                <th>Unit</th>
                <th>Unit Price</th>
                <th>Extended Price</th>
              </tr>
            </thead>

            <tbody>
              {result.lines.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{r.product_code}</td>
                  <td>{r.product_name}</td>
                  <td>{r.ref_so_no || '—'}</td>

                  {!isReturn && (
                    <td>
                      {formatNumber(
                        r.quantity_out,
                        3
                      )}
                    </td>
                  )}

                  {isReturn && (
                    <td>
                      {formatNumber(
                        r.quantity_in,
                        3
                      )}
                    </td>
                  )}

                  <td>{r.unit_name}</td>

                  <td>
                    {formatNumber(r.unit_price)}
                  </td>

                  <td>
                    {formatNumber(
                      r.extended_price
                    )}
                  </td>
                </tr>
              ))}

              <tr className="row-total">
                <td
                  colSpan={7}
                  className="text-right"
                >
                  TOTAL VALUE
                </td>

                <td>
                  {formatNumber(total)}
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              marginTop: 50,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p>_____________________</p>
              <p>Prepared By</p>
            </div>

            <div>
              <p>_____________________</p>
              <p>Delivered By</p>
            </div>

            <div>
              <p>_____________________</p>
              <p>Received By</p>
            </div>
          </div>

        </div>
      )}

      {ran && !result?.header && (
        <p
          className="text-muted text-center"
          style={{ padding: 16 }}
        >
          No record found.
        </p>
      )}
    </div>
  )
}
