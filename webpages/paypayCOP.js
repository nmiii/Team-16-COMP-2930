paypal.Buttons({
            createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                amount: {
                    value: document.getElementById("total").innerHTML,
                }
                }]
            });
            },
            onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                // Call your server to save the transaction
                return fetch('/paypal-transaction-complete', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    orderID: data.orderID
                })
                });
            });
            }
        }).render('#paypal-button-container');