export {};
const baseUrl = "http://localhost:8080/api/customers";
// get


  

// add
export function addOrder(order) {
    console.log(order);
  return fetch(baseUrl , {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: order
    })
  })
    .then((data) => {
      return data;
    });
}

// update
export function updateOrder(order) {
  return fetch(baseUrl +"/" + order.CustomerID, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: order
    })
  })
    .then(data => {
      return data;
    });
}

// delete
export function deleteOrder(primaryKey) {
  return fetch(baseUrl + "/" + primaryKey, {
    method: "delete" ,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: primaryKey
    })
  
  })
    .then(data => {
      return data;
    });
}