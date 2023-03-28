export function ContactCard ({ contact }) {
    return ( <div 
    className="card">
  <div className="card-body">
    <h5 className="card-title">{contact.full_name}</h5>
  </div>
  <ul class="list-group">
  <li class="list-group-item">Phone: {contact.phone}</li>
  <li class="list-group-item">Email: {contact.email}</li>
  <li class="list-group-item">Address: {contact.address}</li>
</ul>
</div>
    )
}