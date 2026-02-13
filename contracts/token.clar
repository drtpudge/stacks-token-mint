(define-data-var total-supply uint u0)
(define-map balances { owner: principal } { balance: uint })

(define-public (mint (recipient principal) (amount uint))
  (begin
    (var-set total-supply (+ (var-get total-supply) amount))
    (map-set balances { owner: recipient } { balance: (+ (default-to u0 (get balance (map-get? balances { owner: recipient }))) amount) })
    (ok true)
  )
)

(define-read-only (get-balance (owner principal))
  (default-to u0 (get balance (map-get? balances { owner })))
)

(define-read-only (get-total-supply)
  (var-get total-supply)
)
